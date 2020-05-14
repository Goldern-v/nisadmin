import moment from "moment";
import { numToChinese } from "src/utils/number/numToChinese";
import { selectViewModal } from "./SelectViewModal";
import { sheetViewModal } from "./SheetViewModal";
import { scheduleStore, appStore } from "src/stores";
import { totalCellContent } from './../components/arrangeSheet/TotalCell'
import { nightHourCellContent } from './../components/arrangeSheet/NightHourCell'
import printing from "printing";

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
      let cols = [col1Width, col2Width, col3Width].concat(
        dateRow.map(() => othersWidth / dateLength),
        [col4Width]
      );

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
            ${tdEl({
        colSpan: dateRow.length + 4,
        class: "text-left",
        content: "休假要求："
      })}
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
            } catch (error) { }
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
      word-break: all;
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
          return totalCellContent(record.id)
        }
      },
      {
        title: '夜小时数（小时）',
        key: 'total2',
        width: 60,
        visible: colVisibleList.indexOf('total2') >= 0,
        render: (record: any) => {
          return nightHourCellContent(record.id)
        }
      }
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
          return tdEl({ colSpan: item1.col, content: item1.rangeName || "/" });
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
      word-break: all;
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
}

export const printModal = new PrintModal();
