import moment from "moment";
import { numToChinese } from "src/utils/number/numToChinese";
import { selectViewModal } from "./SelectViewModal";
import { sheetViewModal } from "./SheetViewModal";
import { scheduleStore, appStore } from "src/stores";
import { totalCellContent } from './../components/arrangeSheet/TotalCell'
import { nightHourCellContent } from './../components/arrangeSheet/NightHourCell'
import { weekBalanceHour } from './../components/arrangeSheet/WeekBalanceHour'
import { balanceHour } from "./../components/arrangeSheet/BalanceHour";
import { publicHour } from "./../components/arrangeSheet/PublicHour";

import printing from "printing";
import { connect } from "http2";

class PrintModal {
  public printArrange(
    params?: any,
    nurseGroup?: any,
    remark?: string,
    deptName?: string
  ) {
    params = params || selectViewModal.params;
    nurseGroup = nurseGroup || sheetViewModal.sheetTableData;
    deptName = deptName || scheduleStore.getDeptName();
    remark = sheetViewModal.remark || "";
    if (!params) return;
    if (!nurseGroup || nurseGroup.length <= 0) return;
    if (!deptName) return;

    //创建打印容器
    let div = document.createElement("div");
    let printId = `print${moment().format("X")}`;
    div.id = printId;
    div.innerHTML = `<div class="arrange-page-print"></div>`;
    document.body.appendChild(div);

    //组织渲染数据
    //总时间跨度
    let dateLength =
      (Number(moment(params.endTime).format("x")) -
        Number(moment(params.startTime).format("x")) +
        86400000) /
      86400000;

    //表头组 最多31天一组表头
    let dateRowGroup = [] as any;
    let appendIdx = -1;
    for (var i = 0; i < dateLength; i++) {
      let timeset = Number(moment(params.startTime).format("x")) + i * 86400000;
      let newMoment = moment(timeset);
      let date = newMoment.format("D");
      let weekDay = newMoment.format("E");

      if (i % 31 == 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }

      dateRowGroup[appendIdx].push({
        moment: newMoment,
        date,
        weekDay: numToChinese(weekDay)
      });
    }

    //排班的护士列表及其排班内容
    let NurseGroup = [...nurseGroup];
    //排班备注固定模块
    let remarkEl = `<pre>排班备注：${remark}</pre>`;
    // 列宽
    //页面总宽度
    let pageWidth = 720;
    //页面高度 超过换页
    let pageHeight = 1090;
    //td计算用高度 和打印样式保持一致
    let tdHeight = 24;

    //如果总排班超过1周 横向显示
    if (dateLength > 7) {
      pageWidth = 1100;
      pageHeight = 760;
      tdHeight = 20;
    }
    //td指定样式
    let tdStyle = (other?: string) => {
      return `height:${tdHeight}px!important;padding:0!important;${other ||
        ""}`;
    };
    let tdEl = (option?: any) => {
      option = option || {};
      return `<td 
        class="${option.class || ""}"
        style="${tdStyle(option.style || "")}"
        colSpan="${option.colSpan || ""}"
        rowSpan="${option.rowSpan || ""}">
        ${option.content || ""}
      </td>`;
    };
    //部分列固定宽度
    //姓名
    let col1Width = 60;
    //岗位级别
    let col2Width = 60;
    //工作年
    let col3Width = 25;
    //休假统计
    let col4Width = 35;
    //排版列总宽度
    let othersWidth = pageWidth - col1Width - col2Width - col3Width - col4Width;

    //根据护士列表和表头组动态插入表格和计算分页
    for (let i = 0; i < dateRowGroup.length; i++) {
      let dateRow = dateRowGroup[i];
      let pageNo = 0;
      let tableId = "";
      //计算每列宽度
      let cols = [
        col1Width, col2Width, col3Width,
        ...dateRow.map(() => othersWidth / dateLength),
        col4Width
      ]

      let colgroup = `
        <colgroup>
          ${cols
          .map((item: any) => `<col width="${Math.floor(item)}"/>`)
          .join("")}
        </colgroup>
        <colgroup></colgroup>
      `;
      //表格头部模板
      let thead = `
        <tr>
          ${tdEl({
        colSpan: dateRow.length + 4,
        class: "main-title",
        content: `${dateRow[0].moment.format(
          "YYYY年M月"
        )}${deptName}护士排班表`
      })}
        </tr>
        <tr class="header-row">
          ${tdEl({ content: "姓名", rowSpan: 2 })}
          ${tdEl({ content: "岗位", rowSpan: 2 })}
          ${tdEl({ content: "工作年", rowSpan: 2 })}
          ${dateRow.map((item: any) => tdEl({ content: item.date })).join("")}
          ${tdEl({ content: "休假统计", rowSpan: 2 })}
        </tr>
        <tr class="header-row">
          ${dateRow
          .map((item: any) =>
            tdEl({
              class:
                item.weekDay == "六" || item.weekDay == "七" ? "bg-gray" : "",
              content: item.weekDay == "七" ? "日" : item.weekDay
            })
          )
          .join("")}
        </tr>
      `;
      //表格底部模板
      let tfoot = `
          <tr class="insert-start">
            ${tdEl({ content: "加班登记栏：", colSpan: 2, class: "text-left" })}
            ${tdEl({ colSpan: 0 })}
            ${tdEl({ colSpan: dateRow.length + 1 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4, class: "text-left", content: "休假要求：" })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 4 })}
          </tr>
        `;
      for (let j = 0; j < NurseGroup.length; j++) {
        let insertClass = "insert-start";
        let nurse = NurseGroup[j];
        let nowPageEl = document.getElementById(tableId);
        if (nowPageEl) console.log(nowPageEl.offsetHeight, pageHeight);
        let nextPage = !!(nowPageEl && nowPageEl.offsetHeight > pageHeight);

        if (j == 0 || nextPage) {
          tableId = `table-${i}-${pageNo}`;
          let newTable = `
            <table>
              ${colgroup}
              <tbody>
                ${thead}
                ${tfoot}
              </tbody>
            </table>
          `;

          let printContent = document.querySelector(
            `#${printId} .arrange-page-print`
          );
          let pageSplit = `
            <div class="page-no">第 ${pageNo + 1} 页</div>
            <div class="page-split"></div>
          `;
          if (printContent) {
            let onePage = document.createElement("div");
            onePage.id = tableId;
            onePage.className = "one-page";
            onePage.innerHTML = `
              ${newTable}
              ${remarkEl}
              ${pageSplit}
            `;
            printContent.appendChild(onePage);
          }

          pageNo++;
        }
        //拼装行
        let tr = "";
        //姓名
        tr += tdEl({ content: nurse.empName });
        //岗位级别
        tr += tdEl({ content: `${nurse.newTitle}/${nurse.nurseHierarchy}` });
        //工作年
        tr += tdEl({ content: nurse.year || "" });
        //排班列
        let groups = [] as any;
        for (let k = 0; k < dateRow.length; k++) {
          let dateItem = dateRow[k];
          let last = groups[groups.length - 1];
          let target = nurse.settingDtos.find((item: any) => {
            return item.workDate == dateItem.moment.format("YYYY-MM-DD");
          });
          if (!target) {
            groups.push({
              rangeName: "",
              col: 1
            });
            continue;
          }

          let rangeName = target.rangeName;

          if (target.addSymbols && target.addSymbols[0]) {
            if (target.addSymbols[0].symbol) {
              rangeName = `${target.addSymbols[0].symbol}${rangeName}`;
            }
          }

          if (target.settings && target.settings[0]) {
            if (target.settings[0].rangeName) {
              rangeName += `/${target.settings[0].rangeName}`;
            } else {
              rangeName += `/${target.settings[0].shiftType.replace("班", "")}`;
            }
          }

          if (last && last.rangeName == rangeName) {
            //合并部分相同的行
            switch (target.rangeName) {
              case "年假":
              case "进修":
              case "产假":
              case "调休":
                last.col = last.col + 1;
                break;
              default:
                groups.push({
                  rangeName: rangeName,
                  col: 1
                });
            }
          } else {
            groups.push({
              rangeName: rangeName,
              col: 1
            });
          }
        }

        //组合排班信息
        groups = groups.map((item1: any) => {
          return tdEl({ colSpan: item1.col, content: item1.rangeName || "/" });
        });
        tr += groups.join("");
        //休假统计
        tr += tdEl();
        //动态插入行
        let newTr = document.createElement("tr");
        newTr.innerHTML = tr;

        let targetTable = document.querySelector(`#${tableId} tbody`);

        if (targetTable) {
          let prevEls = targetTable.querySelectorAll(`.${insertClass}`);
          if (prevEls) {
            let prevEl = prevEls[prevEls.length - 1];
            try {
              targetTable.insertBefore(newTr, prevEl);
            } catch (error) {
            }
          }
        }
      }
    }

    //单周打印样式
    let defaultPrintCss = `
    .arrange-page-print{
      width: ${pageWidth}px;
      margin: 0 auto;
      padding: 0 30px;
    }
    .page-split{
      page-break-before: always;
    }
    .page-no{
      text-align: center;
    }
    pre{
      word-break: break-all;
      white-space: pre-wrap;
      line-height: 12px;
      font-size: 12px;
      margin-top: 5px;
      color:#000;
    }
    .one-page{
      padding-top: 30px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
    }
    td,th{
      text-align: center;
      font-size: 12px;
      color: #000;
      padding: 0;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 20px!important;
    }
    table tr.header-row td{
      font-size: 12px!important;
    }
    table td.text-left{
      text-align: left;
      padding-left: 10px;
    }
    table td.bg-gray{
      background: #aaa;
    }
    @page{
      size: A4 portrait;
      margin:0.0cm;
    }
    .header,.footer{
      display:none;
    }
  `;
    //横向排版额外打印样式
    if (dateLength > 7)
      defaultPrintCss += `
      @page { 
        size: A4 landscape; 
      }
      td{
        line-height: 12px;
        font-size: 12px;
      }
    `;
    //调用打印函数
    let prtintFn = printing as any
    if (appStore.isDev) prtintFn = printing.preview
    prtintFn(document.getElementById(printId) as HTMLElement, {
      injectGlobalCss: true,
      scanStyles: false,
      css: defaultPrintCss
    });
    //删除打印容器
    document.body.removeChild(div);
  }

  public printArrangeDgxg(
    params?: any,
    nurseGroup?: any,
    remark?: string,
    deptName?: string
  ) {
    params = params || selectViewModal.params;
    nurseGroup = nurseGroup || sheetViewModal.sheetTableData;
    deptName = deptName || scheduleStore.getDeptName();
    remark = sheetViewModal.remark || "";
    if (!params) return;
    if (!nurseGroup || nurseGroup.length <= 0) return;
    if (!deptName) return;
    //创建打印容器
    let div = document.createElement("div");
    let printId = `print${moment().format("X")}`;
    div.id = printId;
    div.innerHTML = `<div class="arrange-page-print"></div>`;
    document.body.appendChild(div);

    //组织渲染数据
    //总时间跨度
    let dateLength =
      (Number(moment(params.endTime).format("x")) -
        Number(moment(params.startTime).format("x")) +
        86400000) /
      86400000;

    //表头组 最多31天一组表头
    let dateRowGroup = [] as any;
    let appendIdx = -1;
    for (var i = 0; i < dateLength; i++) {
      let timeset = Number(moment(params.startTime).format("x")) + i * 86400000;
      let newMoment = moment(timeset);
      let date = newMoment.format("D");
      let weekDay = newMoment.format("E");

      if (i % 31 == 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }

      dateRowGroup[appendIdx].push({
        moment: newMoment,
        date,
        weekDay: numToChinese(weekDay)
      });
    }

    //排班的护士列表及其排班内容
    let NurseGroup = [...nurseGroup];
    //排班备注固定模块
    let remarkEl = `<pre>排班备注：${remark}</pre>`;
    // 列宽
    //页面总宽度
    let pageWidth = 860;
    //页面高度 超过换页
    let pageHeight = 1090;
    //td计算用高度 和打印样式保持一致
    let tdHeight = 24;

    //如果总排班超过1周 横向显示
    if (dateLength > 7) {
      pageWidth = 1100;
      pageHeight = 760;
      tdHeight = 20;
    }
    //td指定样式
    let tdStyle = (other?: string) => {
      return `height:${tdHeight}px!important;padding:0!important;${other ||
        ""}`;
    };
    let tdEl = (option?: any) => {
      option = option || {};
      return `<td 
        class="${option.class || ""}"
        style="${tdStyle(option.style || "")}"
        colSpan="${option.colSpan || ""}"
        rowSpan="${option.rowSpan || ""}">
        ${option.content || ""}
      </td>`;
    };
    //部分列固定宽度
    //姓名
    let col1Width = 60;
    //岗位级别
    let col2Width = 60;
    //工作年
    let col3Width = 25;
    //分组
    let col31Width = 60;
    //分管床位
    let col32Width = 60;
    //休假统计
    let col4Width = 35;
    //排版列总宽度
    let othersWidth = pageWidth - col1Width - col2Width - col3Width - col4Width;

    //根据护士列表和表头组动态插入表格和计算分页
    for (let i = 0; i < dateRowGroup.length; i++) {
      let dateRow = dateRowGroup[i];
      let pageNo = 0;
      let tableId = "";
      //计算每列宽度
      let cols = [
        col1Width, col2Width, col3Width, col31Width, col32Width,
        ...dateRow.map(() => othersWidth / dateLength),
        col4Width
      ]

      let colgroup = `
        <colgroup>
          ${cols
          .map((item: any) => `<col width="${Math.floor(item)}"/>`)
          .join("")}
        </colgroup>
        <colgroup></colgroup>
      `;
      //表格头部模板
      let thead = `
        <tr>
          ${tdEl({
        colSpan: dateRow.length + 6,
        class: "main-title",
        content: `${dateRow[0].moment.format(
          "YYYY年M月"
        )}${deptName}护士排班表`
      })}
        </tr>
        <tr class="header-row">
          ${tdEl({ content: "姓名", rowSpan: 2 })}
          ${tdEl({ content: "岗位", rowSpan: 2 })}
          ${tdEl({ content: "工作年", rowSpan: 2 })}
          ${tdEl({ content: "分组", rowSpan: 2 })}
          ${tdEl({ content: "分管床位", rowSpan: 2 })}
          ${dateRow.map((item: any) => tdEl({ content: item.date })).join("")}
          ${tdEl({ content: "休假统计", rowSpan: 2 })}
        </tr>
        <tr class="header-row">
          ${dateRow
          .map((item: any) =>
            tdEl({
              class:
                item.weekDay == "六" || item.weekDay == "七" ? "bg-gray" : "",
              content: item.weekDay == "七" ? "日" : item.weekDay
            })
          )
          .join("")}
        </tr>
      `;
      //表格底部模板
      let tfoot = `
          <tr class="insert-start">
            ${tdEl({ content: "加班登记栏：", colSpan: 2, class: "text-left" })}
            ${tdEl({ colSpan: 0 })}
            ${tdEl({ colSpan: dateRow.length + 3 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6, class: "text-left", content: "休假要求：" })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6 })}
          </tr>
          <tr>
            ${tdEl({ colSpan: dateRow.length + 6 })}
          </tr>
        `;
      for (let j = 0; j < NurseGroup.length; j++) {
        let insertClass = "insert-start";
        let nurse = NurseGroup[j];
        let nowPageEl = document.getElementById(tableId);
        if (nowPageEl) console.log(nowPageEl.offsetHeight, pageHeight);
        let nextPage = !!(nowPageEl && nowPageEl.offsetHeight > pageHeight);

        if (j == 0 || nextPage) {
          tableId = `table-${i}-${pageNo}`;
          let newTable = `
            <table>
              ${colgroup}
              <tbody>
                ${thead}
                ${tfoot}
              </tbody>
            </table>
          `;

          let printContent = document.querySelector(
            `#${printId} .arrange-page-print`
          );
          let pageSplit = `
            <div class="page-no">第 ${pageNo + 1} 页</div>
            <div class="page-split"></div>
          `;
          if (printContent) {
            let onePage = document.createElement("div");
            onePage.id = tableId;
            onePage.className = "one-page";
            onePage.innerHTML = `
              ${newTable}
              ${remarkEl}
              ${pageSplit}
            `;
            printContent.appendChild(onePage);
          }

          pageNo++;
        }
        //拼装行
        let tr = "";
        //姓名
        tr += tdEl({ content: nurse.empName });
        //岗位级别
        tr += tdEl({ content: `${nurse.newTitle}/${nurse.nurseHierarchy}` });
        //工作年
        tr += tdEl({ content: nurse.year || "" });
        //分组
        tr += tdEl({ content: nurse.groupName || "" });
        //分管床位
        tr += tdEl({ content: nurse.chargeBed || "" });
        //排班列
        let groups = [] as any;
        for (let k = 0; k < dateRow.length; k++) {
          let dateItem = dateRow[k];
          let last = groups[groups.length - 1];
          let target = nurse.settingDtos.find((item: any) => {
            return item.workDate == dateItem.moment.format("YYYY-MM-DD");
          });
          if (!target) {
            groups.push({
              rangeName: "",
              col: 1
            });
            continue;
          }

          let rangeName = target.rangeName;

          if (target.addSymbols && target.addSymbols[0]) {
            if (target.addSymbols[0].symbol) {
              rangeName = `${target.addSymbols[0].symbol}${rangeName}`;
            }
          }

          if (target.settings && target.settings[0]) {
            if (target.settings[0].rangeName) {
              rangeName += `/${target.settings[0].rangeName}`;
            } else {
              rangeName += `/${target.settings[0].shiftType.replace("班", "")}`;
            }
          }

          if (last && last.rangeName == rangeName) {
            //合并部分相同的行
            switch (target.rangeName) {
              case "年假":
              case "进修":
              case "产假":
              case "调休":
                last.col = last.col + 1;
                break;
              default:
                groups.push({
                  rangeName: rangeName,
                  col: 1
                });
            }
          } else {
            groups.push({
              rangeName: rangeName,
              col: 1
            });
          }
        }

        //组合排班信息
        groups = groups.map((item1: any) => {
          return tdEl({ colSpan: item1.col, content: item1.rangeName || "/" });
        });
        tr += groups.join("");
        //休假统计
        tr += tdEl();
        //动态插入行
        let newTr = document.createElement("tr");
        newTr.innerHTML = tr;

        let targetTable = document.querySelector(`#${tableId} tbody`);

        if (targetTable) {
          let prevEls = targetTable.querySelectorAll(`.${insertClass}`);
          if (prevEls) {
            let prevEl = prevEls[prevEls.length - 1];
            try {
              targetTable.insertBefore(newTr, prevEl);
            } catch (error) {
            }
          }
        }
      }
    }

    //单周打印样式
    let defaultPrintCss = `
    .arrange-page-print{
      width: ${pageWidth}px;
      margin: 0 auto;
      padding: 0 30px;
    }
    .page-split{
      page-break-before: always;
    }
    .page-no{
      text-align: center;
    }
    pre{
      word-break: break-all;
      white-space: pre-wrap;
      line-height: 12px;
      font-size: 12px;
      margin-top: 5px;
      color:#000;
    }
    .one-page{
      padding-top: 30px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
    }
    td,th{
      text-align: center;
      font-size: 12px;
      color: #000;
      padding: 0;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 20px!important;
    }
    table tr.header-row td{
      font-size: 12px!important;
    }
    table td.text-left{
      text-align: left;
      padding-left: 10px;
    }
    table td.bg-gray{
      background: #aaa;
    }
    @page{
      size: A4 portrait;
      margin:0.0cm;
    }
    .header,.footer{
      display:none;
    }
  `;
    //横向排版额外打印样式
    if (dateLength > 7)
      defaultPrintCss += `
      @page { 
        size: A4 landscape; 
      }
      td{
        line-height: 12px;
        font-size: 12px;
      }
    `;
    //调用打印函数
    let prtintFn = printing as any
    if (appStore.isDev) prtintFn = printing.preview
    prtintFn(document.getElementById(printId) as HTMLElement, {
      injectGlobalCss: true,
      scanStyles: false,
      css: defaultPrintCss
    });
    //删除打印容器
    document.body.removeChild(div);
  }


  //南医三打印排班
  //可通过传入的key动态的隐藏非排班列
  public printArrangeNys(colVisibleList: string[]) {
    let params = selectViewModal.params;
    let nurseGroup = sheetViewModal.sheetTableData;
    let deptName = scheduleStore.getDeptName();
    let remark = sheetViewModal.remark || "";
    if (!params) return;
    if (!nurseGroup || nurseGroup.length <= 0) return;
    if (!deptName) return;

    //要显示的固定列配置
    interface column {
      title: string,
      key: string,
      width: number,
      visible: boolean,
      render?: (record: any) => string
    }

    //排班前显示的列
    const colsBefore = [
      {
        title: '组别',
        key: 'groupName',
        width: 30,
        visible: colVisibleList.indexOf('groupName') >= 0,
      },
      {
        title: '姓名',
        key: 'empName',
        width: 60,
        visible: true,
      },
      {
        title: '层级',
        key: 'nurseHierarchy',
        width: 30,
        visible: colVisibleList.indexOf('nurseHierarchy') >= 0,
      },
      {
        title: '职称',
        key: 'newTitle',
        width: 60,
        visible: colVisibleList.indexOf('newTitle') >= 0,
      },
      {
        title: '年限',
        key: 'year',
        width: 30,
        visible: colVisibleList.indexOf('year') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return record.year || '0'
        }
      }
    ] as column[]
    const colsBeforeVisible = colsBefore.filter((item) => item.visible)
    //排班后显示的列
    let colsAfter = [
      {
        title: '工时小计（小时）',
        key: 'total1',
        width: 60,
        visible: colVisibleList.indexOf('total1') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return totalCellContent(record.id)
        }
      },
      // {
      //   title: '夜小时数（小时）',
      //   key: 'total2',
      //   width: 60,
      //   visible: colVisibleList.indexOf('total2') >= 0,
      //   render: (record: any) => {
      //     return nightHourCellContent(record.id)
      //   }
      // }
      {
        title: '本周积假',
        key: 'thisWeekHoliday',
        width: 60,
        visible: colVisibleList.indexOf('thisWeekHoliday') >= 0,
      },
      {
        title: '累积积假',
        key: 'totalHoliday',
        width: 60,
        visible: colVisibleList.indexOf('totalHoliday') >= 0,
      },
    ] as column[]
    const colsAfterVisible = colsAfter.filter((item) => item.visible)

    //创建打印容器
    let div = document.createElement("div");
    let printId = `print${moment().format("X")}`;
    div.id = printId;
    div.innerHTML = `<div class="arrange-page-print"></div>`;
    document.body.appendChild(div);

    //组织渲染数据
    //总时间跨度
    let dateLength =
      (Number(moment(params.endTime).format("x")) -
        Number(moment(params.startTime).format("x")) +
        86400000) /
      86400000;

    //表头组 最多31天一组表头
    let dateRowGroup = [] as any;
    let appendIdx = -1;
    for (var i = 0; i < dateLength; i++) {
      let timeset = Number(moment(params.startTime).format("x")) + i * 86400000;
      let newMoment = moment(timeset);
      let date = newMoment.format("D");
      let weekDay = newMoment.format("E");

      if (i % 31 == 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }

      dateRowGroup[appendIdx].push({
        moment: newMoment,
        date,
        weekDay: numToChinese(weekDay)
      });
    }

    //排班的护士列表及其排班内容
    let NurseGroup = [] as any[];
    for (let i = 0; i < nurseGroup.length; i++) {
      let item = nurseGroup[i]
      let nextItem = nurseGroup[i + 1] || null
      NurseGroup.push(item)
      if (nextItem) {
        let groupName = item.groupName
        let nextGroupName = nextItem.groupName
        if (groupName !== nextGroupName)
          NurseGroup.push({})
      }
    }

    //排班备注固定模块
    let remarkEl = `<pre>排班备注：${remark}</pre>`;
    // 列宽
    //页面总宽度
    let pageWidth = 720;
    //页面高度 超过换页
    let pageHeight = 1090;
    //td计算用高度 和打印样式保持一致
    let tdHeight = 24;

    //如果总排班超过1周 横向显示
    if (dateLength > 7) {
      pageWidth = 1100;
      pageHeight = 760;
      tdHeight = 20;
    }
    //td指定样式
    let tdStyle = (other?: string) => {
      return `height:${tdHeight}px!important;padding:0!important;${other || ""}`;
    };
    let tdEl = (option?: any) => {
      option = option || {};
      return `<td 
        class="${option.class || ""}"
        style="${tdStyle(option.style || "")}"
        colSpan="${option.colSpan || ""}"
        rowSpan="${option.rowSpan || ""}">
        ${option.content || ""}
      </td>`;
    };
    //部分列固定宽度
    let fixWidthList = [...colsBeforeVisible, ...colsAfterVisible].map((col) => col.width)
    let fixWidth = 0
    for (let i = 0; i < fixWidthList.length; i++) {
      fixWidth += fixWidthList[i]
    }
    //排版列总宽度
    let othersWidth = pageWidth - fixWidth

    //根据护士列表和表头组动态插入表格和计算分页
    for (let i = 0; i < dateRowGroup.length; i++) {
      let dateRow = dateRowGroup[i];
      let pageNo = 0;
      let tableId = "";
      //计算每列宽度
      let cols =
        [
          ...colsBeforeVisible.map((col) => col.width),
          ...dateRow.map(() => othersWidth / dateLength),
          ...colsAfterVisible.map((col) => col.width)
        ]

      let colgroup = `
        <colgroup>
          ${cols
          .map((item: any) => `<col width="${Math.floor(item)}"/>`)
          .join("")}
        </colgroup>
        <colgroup></colgroup>
      `;
      //表格头部模板
      let thead = `
        <tr>
          ${tdEl({
        colSpan: dateRow.length + colsBeforeVisible.length + colsAfterVisible.length,
        class: "main-title",
        content: `${dateRow[0].moment.format(
          "YYYY年M月"
        )}${deptName}护士排班表`
      })}
        </tr>
        <tr class="header-row">
          ${colsBeforeVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
          ${dateRow.map((item: any) => tdEl({ content: item.date })).join("")}
          ${colsAfterVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
        </tr>
        <tr class="header-row">
          ${dateRow
          .map((item: any) =>
            tdEl({
              class:
                item.weekDay == "六" || item.weekDay == "七" ? "bg-gray" : "",
              content: item.weekDay == "七" ? "日" : item.weekDay
            })
          )
          .join("")}
        </tr>
      `;

      for (let j = 0; j < NurseGroup.length; j++) {
        let nurse = NurseGroup[j];
        let nowPageEl = document.getElementById(tableId);
        if (nowPageEl) console.log(nowPageEl.offsetHeight, pageHeight);
        let nextPage = !!(nowPageEl && nowPageEl.offsetHeight > pageHeight);

        if (j == 0 || nextPage) {
          tableId = `table-${i}-${pageNo}`;
          let newTable = `
            <table>
              ${colgroup}
              <tbody>
                ${thead}
              </tbody>
            </table>
          `;

          let printContent = document.querySelector(
            `#${printId} .arrange-page-print`
          );
          let pageSplit = `
            <div class="page-no">第 ${pageNo + 1} 页</div>
            <div class="page-split"></div>
          `;
          if (printContent) {
            let onePage = document.createElement("div");
            onePage.id = tableId;
            onePage.className = "one-page";
            onePage.innerHTML = `
              ${newTable}
              ${remarkEl}
              ${pageSplit}
            `;
            printContent.appendChild(onePage);
          }

          pageNo++;
        }
        //拼装行
        let tr = "";
        //排班内容前的固定列内容
        for (let k = 0; k < colsBeforeVisible.length; k++) {
          let column = colsBeforeVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //排班列
        let groups = [] as any;
        for (let k = 0; k < dateRow.length; k++) {
          let dateItem = dateRow[k];
          let last = groups[groups.length - 1];
          let target = (nurse.settingDtos || []).find((item: any) => {
            return item.workDate == dateItem.moment.format("YYYY-MM-DD");
          });
          if (!target) {
            groups.push({
              rangeName: "",
              col: 1
            });
            continue;
          }

          let rangeName = target.rangeName;

          if (target.addSymbols && target.addSymbols[0]) {
            if (target.addSymbols[0].symbol) {
              rangeName = `${target.addSymbols[0].symbol}${rangeName}`;
            }
          }

          if (target.settings && target.settings[0]) {
            if (target.settings[0].rangeName) {
              rangeName += `/${target.settings[0].rangeName}`;
            } else {
              rangeName += `/${target.settings[0].shiftType.replace("班", "")}`;
            }
          }

          if (last && last.rangeName == rangeName) {
            //合并部分相同的行
            switch (target.rangeName) {
              case "年假":
              case "进修":
              case "产假":
              case "调休":
              case "节休":
              case "休":
                last.col = last.col + 1;
                break;
              default:
                groups.push({
                  rangeName: rangeName,
                  col: 1
                });
            }
          } else {
            groups.push({
              rangeName: rangeName,
              col: 1
            });
          }
        }

        //组合排班信息
        groups = groups.map((item1: any) => {
          let rangeName = ''
          if (nurse.empName)
            rangeName = item1.rangeName || "/"

          return tdEl({
            colSpan: item1.col,
            content: rangeName
          });
        });
        tr += groups.join("");
        //排班内容后的固定列内容
        for (let k = 0; k < colsAfterVisible.length; k++) {
          let column = colsAfterVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //动态插入行
        let newTr = document.createElement("tr");
        newTr.innerHTML = tr;

        let targetTable = document.querySelector(`#${tableId} tbody`);

        if (targetTable) {
          targetTable.appendChild(newTr)
        }
      }
    }

    //单周打印样式
    let defaultPrintCss = `
    .arrange-page-print{
      width: ${pageWidth}px;
      margin: 0 auto;
      padding: 0 30px;
    }
    .page-split{
      page-break-before: always;
    }
    .page-no{
      text-align: center;
    }
    pre{
      word-break: break-all;
      white-space: pre-wrap;
      line-height: 12px;
      font-size: 12px;
      margin-top: 5px;
      color:#000;
    }
    .one-page{
      padding-top: 30px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
    }
    td,th{
      text-align: center;
      font-size: 12px;
      color: #000;
      word-break: break-all;
      padding: 0;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 20px!important;
    }
    table tr.header-row td{
      font-size: 12px!important;
    }
    table td.text-left{
      text-align: left;
      padding-left: 10px;
    }
    table td.bg-gray{
      background: #aaa;
    }
    @page{
      size: A4 portrait;
      margin:0.0cm;
    }
    .header,.footer{
      display:none;
    }
  `;
    //横向排版额外打印样式
    if (dateLength > 7)
      defaultPrintCss += `
      @page { 
        size: A4 landscape; 
      }
      td{
        line-height: 12px;
        font-size: 12px;
      }
    `;
    //调用打印函数
    let prtintFn = printing as any
    if (appStore.isDev) prtintFn = printing.preview
    prtintFn(document.getElementById(printId) as HTMLElement, {
      injectGlobalCss: true,
      scanStyles: false,
      css: defaultPrintCss
    });
    //删除打印容器
    document.body.removeChild(div);
  }
  //东莞横沥打印排班
  //可通过传入的key动态的隐藏非排班列
  public printArrangeDghl(colVisibleList: string[]) {
    let params = selectViewModal.params;
    let nurseGroup = sheetViewModal.sheetTableData;
    let deptName = scheduleStore.getDeptName();
    let remark = sheetViewModal.remark || "";
    if (!params) return;
    if (!nurseGroup || nurseGroup.length <= 0) return;
    if (!deptName) return;

    //要显示的固定列配置
    interface column {
      title: string,
      key: string,
      width: number,
      visible: boolean,
      render?: (record: any) => string
    }

    //排班前显示的列
    const colsBefore = [
      {
        title: '工号',
        key: 'empNo',
        width: 50,
        visible: colVisibleList.indexOf('empNo') >= 0,
      },
      {
        title: '分组名称',
        key: 'groupName',
        width: 60,
        visible: colVisibleList.indexOf('groupName') >= 0,
      },
      {
        title: '姓名',
        key: 'empName',
        width: 70,
        visible: true,
      },
      {
        title: '层级',
        key: 'nurseHierarchy',
        width: 30,
        visible: colVisibleList.indexOf('nurseHierarchy') >= 0,
      },
      {
        title: '职称',
        key: 'newTitle',
        width: 70,
        visible: colVisibleList.indexOf('newTitle') >= 0,
      },
      {
        title: '年限',
        key: 'year',
        width: 30,
        visible: colVisibleList.indexOf('year') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return record.year || '0'
        }
      }
    ] as column[]
    const colsBeforeVisible = colsBefore.filter((item) => item.visible)
    //排班后显示的列
    let colsAfter = [
      {
        title: '本周上班时数<br/>（小时）',
        key: 'thisWeekHour',
        width: 60,
        visible: colVisibleList.indexOf('thisWeekHour') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return totalCellContent(record.id)
        }
      },
      {
        title: '本周结余时数 <br/>（小时）',
        key: 'thisWeekHoliday',
        width: 60,
        visible: colVisibleList.indexOf('thisWeekHoliday') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return weekBalanceHour(record.id)
        }
      },
      {
        title: '累计结余（小时）',
        key: 'balanceHour',
        width: 60,
        visible: colVisibleList.indexOf('balanceHour') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return balanceHour(record.id)
        }
      },
      {
        title: '年假天数（天）',
        key: 'totalHoliday',
        width: 60,
        visible: colVisibleList.indexOf('totalHoliday') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return publicHour(record.id) || '0'
        }
      },
      {
        title: '工时小计（小时）',
        key: 'total1',
        width: 60,
        visible: colVisibleList.indexOf('total1') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return totalCellContent(record.id)
        }
      },
    ] as column[]
    const colsAfterVisible = colsAfter.filter((item) => item.visible)

    //创建打印容器
    let div = document.createElement("div");
    let printId = `print${moment().format("X")}`;
    div.id = printId;
    div.innerHTML = `<div class="arrange-page-print"></div>`;
    document.body.appendChild(div);

    //组织渲染数据
    //总时间跨度
    let dateLength =
      (Number(moment(params.endTime).format("x")) -
        Number(moment(params.startTime).format("x")) +
        86400000) /
      86400000;

    //表头组 最多31天一组表头
    let dateRowGroup = [] as any;
    let appendIdx = -1;
    for (var i = 0; i < dateLength; i++) {
      let timeset = Number(moment(params.startTime).format("x")) + i * 86400000;
      let newMoment = moment(timeset);
      let date = newMoment.format("D");
      let weekDay = newMoment.format("E");
      
      if (i == 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }
      
      if (date == '1' && i != 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }

      dateRowGroup[appendIdx].push({
        moment: newMoment,
        date,
        weekDay: numToChinese(weekDay)
      });
    }

    //排班的护士列表及其排班内容
    let NurseGroup = [] as any[];
    for (let i = 0; i < nurseGroup.length; i++) {
      let item = nurseGroup[i]
      let nextItem = nurseGroup[i + 1] || null
      NurseGroup.push(item)
      if (nextItem) {
        let groupName = item.groupName
        let nextGroupName = nextItem.groupName
        if (groupName !== nextGroupName)
          NurseGroup.push({})
      }
    }

    //排班备注固定模块
    let remarkEl = `<pre>排班备注：${remark}</pre>`;
    // 列宽
    //页面总宽度
    let pageWidth = 700;
    //页面高度 超过换页
    let pageHeight = 1090;
    //td计算用高度 和打印样式保持一致
    let tdHeight = 24;

    //如果总排班超过1周 横向显示
    if (dateLength > 7) {
      pageWidth = 1100;
      pageHeight = 760;
      tdHeight = 20;
    }
    //td指定样式
    let tdStyle = (other?: string) => {
      return `height:${tdHeight}px!important;padding:0!important;${other || ""}`;
    };
    let tdEl = (option?: any) => {
      option = option || {};
      return `<td 
        class="${option.class || ""}"
        style="${tdStyle(option.style || "")}"
        colSpan="${option.colSpan || ""}"
        rowSpan="${option.rowSpan || ""}">
        ${option.content || ""}
      </td>`;
    };
    //部分列固定宽度
    let fixWidthList = [...colsBeforeVisible, ...colsAfterVisible].map((col) => col.width)
    let fixWidth = 0
    for (let i = 0; i < fixWidthList.length; i++) {
      fixWidth += fixWidthList[i]
    }
    //排版列总宽度
    let othersWidth = pageWidth - fixWidth

    //根据护士列表和表头组动态插入表格和计算分页
    for (let i = 0; i < dateRowGroup.length; i++) {
      let dateRow = dateRowGroup[i];
      let pageNo = 0;
      let tableId = "";
      //计算每列宽度
      let cols =
        [
          ...colsBeforeVisible.map((col) => col.width),
          ...dateRow.map(() => othersWidth / dateLength),
          ...colsAfterVisible.map((col) => col.width)
        ]

      let colgroup = `
        <colgroup>
          ${cols
          .map((item: any) => `<col width="${Math.floor(item)}"/>`)
          .join("")}
        </colgroup>
        <colgroup></colgroup>
      `;
      //表格头部模板
      let thead = `
        <tr>
          ${tdEl({
        colSpan: dateRow.length + colsBeforeVisible.length + colsAfterVisible.length,
        class: "main-title",
        content: `${dateRow[0].moment.format(
          "YYYY年M月"
        )}${deptName}护士排班表`
      })}
        </tr>
        <tr class="header-row">
          ${colsBeforeVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
          ${dateRow.map((item: any) => tdEl({ content: item.date })).join("")}
          ${colsAfterVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
        </tr>
        <tr class="header-row">
          ${dateRow
          .map((item: any) =>
            tdEl({
              class:
                item.weekDay == "六" || item.weekDay == "七" ? "bg-gray" : "",
              content: item.weekDay == "七" ? "日" : item.weekDay
            })
          )
          .join("")}
        </tr>
      `;
      let renderNurse = NurseGroup.filter((item: any) => item.id)
      for (let j = 0; j < renderNurse.length; j++) {
        let nurse = renderNurse[j];
        let nowPageEl = document.getElementById(tableId);
        // if (nowPageEl) console.log(nowPageEl.offsetHeight, pageHeight);
        let nextPage = !!(nowPageEl && nowPageEl.offsetHeight > pageHeight);

        if (j == 0 || nextPage) {
          tableId = `table-${i}-${pageNo}`;
          let newTable = `
            <table>
              ${colgroup}
              <tbody>
                ${thead}
              </tbody>
            </table>
          `;

          let printContent = document.querySelector(
            `#${printId} .arrange-page-print`
          );
          let pageSplit = `
            <div class="page-no">第 ${pageNo + 1} 页</div>
            <div class="page-split"></div>
          `;
          if (printContent) {
            let onePage = document.createElement("div");
            onePage.id = tableId;
            onePage.className = "one-page";
            onePage.innerHTML = `
              ${newTable}
              ${remarkEl}
              ${pageSplit}
            `;
            printContent.appendChild(onePage);
          }
          pageNo++;
        }
        //拼装行
        let tr = "";
        //排班内容前的固定列内容
        for (let k = 0; k < colsBeforeVisible.length; k++) {
          let column = colsBeforeVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //排班列
        let groups = [] as any;
        for (let k = 0; k < dateRow.length; k++) {
          let dateItem = dateRow[k];
          let last = groups[groups.length - 1];
          let target = (nurse.settingDtos || []).find((item: any) => {
            return item.workDate == dateItem.moment.format("YYYY-MM-DD");
          });
          if (!target) {
            groups.push({
              rangeName: "",
              col: 1
            });
            continue;
          }

          let rangeName = target.rangeName;

          if (target.addSymbols && target.addSymbols[0]) {
            if (target.addSymbols[0].symbol) {
              rangeName = `${target.addSymbols[0].symbol}${rangeName}`;
            }
          }

          if (target.settings && target.settings[0]) {
            if (target.settings[0].rangeName) {
              rangeName += `/${target.settings[0].rangeName}`;
            } else {
              rangeName += `/${target.settings[0].shiftType.replace("班", "")}`;
            }
          }

          if (last && last.rangeName == rangeName) {
            //合并部分相同的行
            switch (target.rangeName) {
              case "年假":
              case "进修":
              case "产假":
              case "调休":
              case "节休":
              case "休":
                last.col = last.col + 1;
                break;
              default:
                groups.push({
                  rangeName: rangeName,
                  col: 1
                });
            }
          } else {
            groups.push({
              rangeName: rangeName,
              col: 1
            });
          }
        }

        //组合排班信息
        groups = groups.map((item1: any) => {
          let rangeName = ''
          if (nurse.empName)
            rangeName = item1.rangeName || "/"

          return tdEl({
            colSpan: item1.col,
            content: rangeName
          });
        });
        tr += groups.join("");
        //排班内容后的固定列内容
        for (let k = 0; k < colsAfterVisible.length; k++) {
          let column = colsAfterVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //动态插入行
        let newTr = document.createElement("tr");
        newTr.innerHTML = tr;
        let targetTable = document.querySelector(`#${tableId} tbody`);
        if (targetTable) {
          targetTable.appendChild(newTr)
        }
      }
    }

    //单周打印样式
    let defaultPrintCss = `
    .arrange-page-print{
      width: ${pageWidth}px;
      margin: 0 auto;
      padding: 0 30px;
    }
    .page-split{
      page-break-before: always;
    }
    .page-no{
      text-align: center;
    }
    pre{
      word-break: break-all;
      white-space: pre-wrap;
      line-height: 12px;
      font-size: 12px;
      margin-top: 5px;
      color:#000;
    }
    .one-page{
      padding-top: 30px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
    }
    td,th{
      text-align: center;
      font-size: 12px;
      color: #000;
      word-break: break-all;
      padding: 0;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 20px!important;
    }
    table tr.header-row td{
      font-size: 12px!important;
    }
    table td.text-left{
      text-align: left;
      padding-left: 10px;
    }
    table td.bg-gray{
      background: #aaa;
    }
    @page{
      size: A4 portrait;
      margin:0.0cm;
    }
    .header,.footer{
      display:none;
    }
  `;
    //横向排版额外打印样式
    if (dateLength > 7)
      defaultPrintCss += `
      @page { 
        size: A4 landscape; 
      }
      td{
        line-height: 12px;
        font-size: 12px;
      }
    `;
    //调用打印函数
    let prtintFn = printing as any
    if (appStore.isDev) prtintFn = printing.preview
    prtintFn(document.getElementById(printId) as HTMLElement, {
      injectGlobalCss: true,
      scanStyles: false,
      css: defaultPrintCss
    });
    //删除打印容器
    document.body.removeChild(div);
  }

  public printArrangeNew(colVisibleList: string[],sheetTableData:any[]) {
    let params = selectViewModal.params;
    // let nurseGroup = sheetViewModal.sheetTableData;
    let nurseGroup = sheetTableData
    let deptName = scheduleStore.getDeptName();
    let remark = sheetViewModal.remark || "";
    if (!params) return;
    if (!nurseGroup || nurseGroup.length <= 0) return;
    if (!deptName) return;

    //要显示的固定列配置
    interface column {
      title: string,
      key: string,
      width: number,
      visible: boolean,
      render?: (record: any) => string
    }

    //排班前显示的列
    const colsBefore = [
      {
        title: '工号',
        key: 'empNo',
        width: 50,
        visible: colVisibleList.indexOf('empNo') >= 0,
      },
      {
        title: '分组名称',
        key: 'groupName',
        width: 60,
        visible: colVisibleList.indexOf('groupName') >= 0,
      },
      {
        title: '姓名',
        key: 'empName',
        width: 70,
        visible: true,
      },
      {
        title: '层级',
        key: 'nurseHierarchy',
        width: 30,
        visible: colVisibleList.indexOf('nurseHierarchy') >= 0,
      },
      {
        title: '职称',
        key: 'newTitle',
        width: 70,
        visible: colVisibleList.indexOf('newTitle') >= 0,
      },
      {
        title: '年限',
        key: 'year',
        width: 30,
        visible: colVisibleList.indexOf('year') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return record.year || '0'
        }
      }
    ] as column[]
    const colsBeforeVisible = colsBefore.filter((item) => item.visible)
    //排班后显示的列
    let colsAfter = [
      {
        title: '本周上班时数<br/>（小时）',
        key: 'thisWeekHour',
        width: 60,
        visible: colVisibleList.indexOf('thisWeekHour') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return totalCellContent(record.id)
        }
      },
      {
        title: '本周结余时数 <br/>（小时）',
        key: 'thisWeekHoliday',
        width: 60,
        visible: colVisibleList.indexOf('thisWeekHoliday') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return weekBalanceHour(record.id)
        }
      },
      {
        title: '累计结余（小时）',
        key: 'balanceHour',
        width: 60,
        visible: colVisibleList.indexOf('balanceHour') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return balanceHour(record.id)
        }
      },
      {
        title: '年假天数（天）',
        key: 'totalHoliday',
        width: 60,
        visible: colVisibleList.indexOf('totalHoliday') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''
          return publicHour(record.id) || '0'
        }
      },
      {
        title: '工时小计（小时）',
        key: 'total1',
        width: 60,
        visible: colVisibleList.indexOf('total1') >= 0,
        render: (record: any) => {
          if (!record.empName)
            return ''

          return totalCellContent(record.id)
        }
      },
    ] as column[]
    const colsAfterVisible = colsAfter.filter((item) => item.visible)

    //创建打印容器
    let div = document.createElement("div");
    let printId = `print${moment().format("X")}`;
    div.id = printId;
    div.innerHTML = `<div class="arrange-page-print"></div>`;
    document.body.appendChild(div);

    //组织渲染数据
    //总时间跨度
    let dateLength =
      (Number(moment(params.endTime).format("x")) -
        Number(moment(params.startTime).format("x")) +
        86400000) /
      86400000;

    //表头组 最多31天一组表头
    let dateRowGroup = [] as any;
    let appendIdx = -1;
    for (var i = 0; i < dateLength; i++) {
      let timeset = Number(moment(params.startTime).format("x")) + i * 86400000;
      let newMoment = moment(timeset);
      let date = newMoment.format("D");
      let weekDay = newMoment.format("E");

      if (i == 0) {
        appendIdx++;
        dateRowGroup.push([] as any);
      }

      // 按月份分开
      // if (date == '1' && i != 0) {
      //   appendIdx++;
      //   dateRowGroup.push([] as any);
      // }

      dateRowGroup[appendIdx].push({
        moment: newMoment,
        date,
        weekDay: numToChinese(weekDay)
      });
    }

    //排班的护士列表及其排班内容
    let NurseGroup = [] as any[];
    for (let i = 0; i < nurseGroup.length; i++) {
      let item = nurseGroup[i]
      let nextItem = nurseGroup[i + 1] || null
      NurseGroup.push(item)
      if (nextItem) {
        let groupName = item.groupName
        let nextGroupName = nextItem.groupName
        if (groupName !== nextGroupName)
          NurseGroup.push({})
      }
    }

    //排班备注固定模块
    let remarkEl = `<pre>排班备注：${remark}</pre>`;
    // 列宽
    //页面总宽度
    let pageWidth = 700;
    // //页面高度 超过换页
    let pageHeight = 1090;
    // //td计算用高度 和打印样式保持一致
    let tdHeight = 24;

    //如果总排班超过1周 横向显示
    if (dateLength > 7) {
      pageWidth = 1100;
      pageHeight = 720 //720;
      tdHeight = 20;
    }
    //td指定样式
    let tdStyle = (other?: string) => {
      return `height:${tdHeight}px!important;padding:0!important;${other || ""}`;
    };
    let tdEl = (option?: any) => {
      option = option || {};
      return `<td 
        class="${option.class || ""}"
        style="${tdStyle(option.style || "")}"
        colSpan="${option.colSpan || ""}"
        rowSpan="${option.rowSpan || ""}">
        ${option.content || ""}
      </td>`;
    };
    //部分列固定宽度
    let fixWidthList = [...colsBeforeVisible, ...colsAfterVisible].map((col) => col.width)
    let fixWidth = 0
    for (let i = 0; i < fixWidthList.length; i++) {
      fixWidth += fixWidthList[i]
    }
    //排版列总宽度
    let othersWidth = pageWidth - fixWidth

    let theadDom = '';
    let trDom = '';
    let colgroupDom = '';

    //根据护士列表和表头组动态插入表格和计算分页
    let tableId = "";
    for (let i = 0; i < dateRowGroup.length; i++) {
      let dateRow = dateRowGroup[i];
      let pageNo = 0;
      //计算每列宽度
      let cols =
        [
          ...colsBeforeVisible.map((col) => col.width),
          ...dateRow.map(() => othersWidth / dateLength),
          ...colsAfterVisible.map((col) => col.width)
        ]

      let colgroup = `
        <colgroup>
          ${cols
          .map((item: any) => `<col width="${Math.floor(item)}"/>`)
          .join("")}
        </colgroup>
        <colgroup></colgroup>
      `;
      //表格头部模板
      let thead = `
        <tr>
          ${tdEl({
        style: "",
        colSpan: dateRow.length + colsBeforeVisible.length + colsAfterVisible.length,
        class: "main-title",
        content: `${deptName}护士排班表
            (${moment(params.startTime).format('YYYY-MM-DD')}至${moment(params.endTime).format('YYYY-MM-DD')})
            `
      })}
        </tr>
        <tr class="header-row">
          ${colsBeforeVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
          ${dateRow.map((item: any) => tdEl({ content: item.date })).join("")}
          ${colsAfterVisible.map((item) => tdEl({ content: item.title, rowSpan: 2 })).join("")}
        </tr>
        <tr class="header-row">
          ${dateRow
          .map((item: any) =>
            tdEl({
              class:
                item.weekDay == "六" || item.weekDay == "七" ? "bg-gray" : "",
              content: item.weekDay == "七" ? "日" : item.weekDay
            })
          )
          .join("")}
        </tr>
      `;
      theadDom = thead
      colgroupDom = colgroup
      let renderNurse = NurseGroup.filter((item: any) => item.id)
      let flag = false
      for (let j = 0; j < renderNurse.length; j++) {
        let nurse = renderNurse[j];
        let nowPageEl = document.getElementById(tableId);
        // if (nowPageEl) console.log(nowPageEl.offsetHeight, pageHeight);
        let nextPage = !!(nowPageEl && nowPageEl.offsetHeight > pageHeight);
        flag = (j == 0 || nextPage)
        if (j == 0 || nextPage) {
          tableId = `table-${i}-${pageNo}`;
          let newTable = `
            <table>
              ${colgroup}
              <tbody>
                ${thead}
              </tbody>
            </table>
          `;

          let printContent = document.querySelector(
            `#${printId} .arrange-page-print`
          );
          let pageSplit = `
            <div class="page-no">第 ${pageNo + 1} 页</div>
            <div class="page-split"></div>
            `;
          if (printContent) {
            let onePage = document.createElement("div");
            onePage.id = tableId;
            onePage.className = "one-page";
            onePage.innerHTML = `
              ${newTable}
              ${remarkEl}
              ${pageSplit}
              `;
            printContent.appendChild(onePage);
          }
          pageNo++;
        }
        //最后一页才打印备注
        // if ((j + 1) == sheetTableData.length) {
        //   let printContent = document.querySelector(
        //     `#table-0-${pageNo - 1}`
        //   );
        //   // let remove = document.querySelector(`#table-0-${pageNo - 1} .page-no`)
        //   let remove2 = document.querySelector(`#table-0-${pageNo - 1} .page-split`)
        //   let onePage = document.createElement("div");
        //   if (printContent && remove2) {
        //     // printContent.removeChild(remove)
        //     printContent.removeChild(remove2)
        //     // <div class="page-no">第 ${pageNo} 页</div> 
        //     onePage.innerHTML = `
        //     ${remarkEl}
        //     `
        //     printContent.appendChild(onePage)
        //   }
        // }
        //拼装行
        let tr = "";
        if (nurse.groupNameTitle) { 
          let newTr = document.createElement("tr");
          let tdDom = tdEl({colSpan:nurse.colSpan,content:nurse.groupNameTitle})
          newTr.innerHTML = tdDom;
          let targetTable = document.querySelector(`#${tableId} tbody`);
          if (targetTable) {
            targetTable.appendChild(newTr)
          }
          trDom += `<tr class="page-split">${tdDom}<tr>`
          continue;
        }
        //排班内容前的固定列内容
        for (let k = 0; k < colsBeforeVisible.length; k++) {
          let column = colsBeforeVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //排班列
        let groups = [] as any;
        for (let k = 0; k < dateRow.length; k++) {
          let dateItem = dateRow[k];
          let last = groups[groups.length - 1];
          let target = (nurse.settingDtos || []).find((item: any) => {
            return item.workDate == dateItem.moment.format("YYYY-MM-DD");
          });
          if (!target) {
            groups.push({
              rangeName: "",
              col: 1
            });
            continue;
          }

          let rangeName = target.rangeName;

          if (target.addSymbols && target.addSymbols[0]) {
            if (target.addSymbols[0].symbol) {
              rangeName = `${target.addSymbols[0].symbol}${rangeName}`;
            }
          }
          if (target.rangeNameCode) {
            rangeName += target.rangeNameCode
          }

          if (target.settings && target.settings[0]) {
            if (target.settings[0].rangeName) {
              rangeName += `/${target.settings[0].rangeName}`;
            } else {
              rangeName += `/${target.settings[0].shiftType.replace("班", "")}`;
            }
          }

          if (target.schAddOrSubs && target.schAddOrSubs[0]) {
            if (target.schAddOrSubs[0] && target.schAddOrSubs[0].statusType == '1') {
              rangeName += `+${target.schAddOrSubs[0].hour}h`;
            } else {
              rangeName += `-${target.schAddOrSubs[0].hour}h`;
            }
          }

          if (target.teachRanges && target.teachRanges[0]) {
            rangeName = `●` + rangeName;
          }
          if (target.dutyRanges && target.dutyRanges[0]) {
            rangeName = `◇` + rangeName;
          }
          if (target.seniorDutyRanges && target.seniorDutyRanges[0]) {
            rangeName = `◆` + rangeName;
          }

          if (last && last.rangeName == rangeName) {
            //合并部分相同的行//合并相同班次名称列
            switch (target.rangeName) {
              // case "年假":
              // case "进修":
              // case "产假":
              // case "调休":
              // case "节休":
              // case "休":
              case "相同班次合并":
                last.col = last.col + 1;
                break;
              default:
                groups.push({
                  rangeName: rangeName,
                  nameColor: target.nameColor,
                  col: 1
                });
            }
          } else {
            groups.push({
              rangeName: rangeName,
              nameColor: target.nameColor,
              col: 1
            });
          }
        }

        //组合排班信息
        groups = groups.map((item1: any) => {
          let rangeName = ''
          if (nurse.empName)
            rangeName = item1.rangeName || "/"          
          return tdEl({
            colSpan: item1.col,
            content: rangeName,
            style: `color:${item1.nameColor}`
          });
        });
        tr += groups.join("");
        //排班内容后的固定列内容
        for (let k = 0; k < colsAfterVisible.length; k++) {
          let column = colsAfterVisible[k]
          let content = ''
          //如果固定列能在nurse对象里找到对应的key返回对应的value
          if (Object.keys(nurse).indexOf(column.key) >= 0)
            content = nurse[column.key]

          //如果固定列有render方法返回render返回的内容
          if (column.render)
            content = column.render(nurse)

          tr += tdEl({ content })
        }
        //动态插入行
        let newTr = document.createElement("tr");
        newTr.innerHTML = tr;
        let targetTable = document.querySelector(`#${tableId} tbody`);
        if (targetTable) {
          targetTable.appendChild(newTr)
        }
        trDom += `<tr class="page-split">${tr}<tr>`
      }
    }
    let newTable = `
      <table>
        ${colgroupDom}
        <tbody>
          ${theadDom}
          ${trDom}
        </tbody>
      </table>
      <div>${remarkEl}</div>
    `;
    let printContent = document.querySelector(
      `.arrange-page-print`
    );
    if (printContent) {
      let onePage = document.createElement("div");
      onePage.innerHTML = `${newTable}`;
      // ${sheetViewModal.sheetTableData.length <= (j + nurseGroup.length) ? remarkEl : ''}
      // printContent.appendChild(onePage);
    }
    //单周打印样式
    let defaultPrintCss = `
    .arrange-page-print{
      width: ${pageWidth}px;
      margin: 0 auto;
      padding: 0 10px;
    }
    .page-split{
      page-break-before: always;
    }
    .page-no{
      text-align: center;
    }
    pre{
      word-break: break-all;
      white-space: pre-wrap;
      line-height: 1.5;
      font-size: 12px;
      margin-top: 5px;
      color:#000;
      overflow: hidden;
    }
    .one-page{
      padding-top: 10px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
      border:none
    }
    tr {
      page-break-inside:avoid;
    }
    td {
      border: 1px solid #000;
    }
    td,th{
      text-align: center;
      font-size: 12px;
      color: #000;
      word-break: break-all;
      padding: 0;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 22px!important;
      padding:10px !important; 
    }
    table tr.header-row td{
      font-size: 12px!important;
    }
    table td.text-left{
      text-align: left;
      padding-left: 10px;
    }
    table td.bg-gray{
      //background: red;
      color:red;
    }
    @page{
      size: A4 portrait;
      //margin: 10mm;
      padding: 5mm
    }
    .header,.footer{
      display:none;
    }
  `;
    //横向排版额外打印样式
    if (dateLength > 7)
      defaultPrintCss += `
      @page { 
        size: A4 landscape;
        //margin: 10mm;
        padding: 5mm
      }
      td{
        line-height: 12px;
        font-size: 12px;
      }
    `;
    //调用打印函数
    let prtintFn = printing as any
    if (appStore.isDev) prtintFn = printing.preview
    prtintFn(document.getElementById(printId) as HTMLElement, {
      injectGlobalCss: true,
      scanStyles: false,
      css: defaultPrintCss
    });
    //删除打印容器
    document.body.removeChild(div);
  }
}

export const printModal = new PrintModal();
