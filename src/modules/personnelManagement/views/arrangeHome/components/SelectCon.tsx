import moment from 'moment'
import DeptSelect from 'src/components/DeptSelect'
import createModal from 'src/libs/createModal'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, DatePicker, Dropdown, Menu, message, Modal, Select, Upload } from 'src/vendors/antd'
import { getCurrentMonthNow,getCurrentMonth } from 'src/utils/date/currentMonth'
import { fileDownload } from 'src/utils/file/file'
import { appStore, authStore } from 'src/stores'
import { DictItem } from 'src/services/api/CommonApiService'
import { Obj } from 'src/libs/types'
import { currentMonth } from 'src/utils/date/rangeMethod'

import ShowStandardTimeModal from '../modal/ShowStandardTimeModal'
import ImportModal from './importModal'
import { selectViewModal } from '../viewModal/SelectViewModal'
import { arrangeService } from '../services/ArrangeService'
import { sheetViewModal } from '../viewModal/SheetViewModal'
import { printModal } from '../viewModal/PrintModal'

export interface Props {
}
const isWhArr = ['wh', 'gxjb', 'fsxt', '925', 'whyx', 'lyyz', 'qhwy', 'whsl', 'ytll', 'whhk', 'dglb', 'zzwy', 'dghm', 'zjhj','gdsfy']
export default observer(function SelectCon() {
  const [isInit, setIsInit] = useState(true);
  const [bigDeptList, setBigDeptList] = useState([]);
  const [date, setDate]: any = useState(() => {
    if (selectViewModal.params.startTime && selectViewModal.params.endTime) {
      return [
        moment(selectViewModal.params.startTime),
        moment(selectViewModal.params.endTime)
      ];
    } else {
      return [];
    }
  });
  const [deptCode, setDeptCode] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData]: any[] = useState([])

  const showStandardTimeModal = createModal(ShowStandardTimeModal);

  /** 日期*/
  // 获取星期一
  let getMonday = () => {
    let today: any = new Date();
    let weekday = today.getDay();
    let dd = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + today.getTime());
    let y = dd.getFullYear();
    let m: any = dd.getMonth() + 1; //获取当前月份的日期
    m = parseInt(m, 10);
    if (m < 10) {
      m = "0" + m;
    }
    let d: any = dd.getDate();
    d = parseInt(d, 10);
    if (d < 10) {
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  };
  // 获取星期日
  let getSunday = () => {
    var today = new Date();
    var weekday = today.getDay();
    var dd = new Date(1000 * 60 * 60 * 24 * (7 - weekday) + today.getTime());
    var y = dd.getFullYear();
    var m: any = dd.getMonth() + 1; //获取当前月份的日期
    m = parseInt(m, 10);
    if (m < 10) {
      m = "0" + m;
    }
    var d: any = dd.getDate();
    d = parseInt(d, 10);
    if (d < 10) {
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  };
  // 日期变化函数
  const dateChange = (dates: any, dateString: any) => {
    if (dates && dates[0] && dates[1]) {
      let isOk =
        dates[1]._d.getTime() - dates[0]._d.getTime() > 2678400000 * 12;
      if (isOk) {
        dates[1]._d = new Date(dates[0]._d.getTime() + 2678400000 * 12);
        message.warning("日期范围不能超过一年！");
      }
      setDate(dates);
      selectViewModal.setParams(
        "startTime",
        moment(dates[0]._d).format("YYYY-MM-DD")
      );
      selectViewModal.setParams(
        "endTime",
        moment(dates[1]._d).format("YYYY-MM-DD")
      );
    }
  };

  // 科室
  const handleChange = (value: any) => {
    setDeptCode(value);
    selectViewModal.setParams("deptCode", value);
    let obj = {
      deptCode: value
    };
    arrangeService.getByDeptCode(obj).then(res => {
      selectViewModal.params.groupList = res.data;
    });
  };

  // 分组数据
  const handleGroupChange = (value: any) => {
    selectViewModal.setParams("group", value);
  };

  // 导出科室Excel
  const exportExcel = (key = '') => {
    let data: any = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      nurseGroup: selectViewModal.params.group,
    };
    if ('zhzxy' === appStore.HOSPITAL_ID) {
      data.schedulingExportVersion = 'zhuhai'
      key === '全院' && (data.bigDeptCode = key)
    }
    arrangeService.export(data, key).then(res => {
      fileDownload(res);
    });
  };

  /**东莞谢岗，导出排班模板 */
  const exportExcel_DGXG = (key = '') => {
    let data: any = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      nurseGroup: selectViewModal.params.group,
    };
    arrangeService.export_gdxg(data, key).then(res => {
      fileDownload(res);
    });
  };
  /**东莞谢岗，导入排班 */
  const handleUpload_dgxg = async (info: any) => {
      const list = authStore.deptList;
      const current = list.find(
        (item: any) => item.code === selectViewModal.params.deptCode
      ) || { name: "" };
      let params: Obj = {
        upfile: info.file,
        deptCode: selectViewModal.params.deptCode,
        deptName: current.name,
        startTime: moment(selectViewModal.params.startTime).format("YYYY-MM-DD"),
        endTime: moment(selectViewModal.params.endTime).format("YYYY-MM-DD"),
      }
      let fn = () => arrangeService.importExcel_dgxg(params)
    const { data } = await fn()
    data.errorMag && message.error(data.errorMag, 4)
    setModalData(data)
    
    setModalVisible(true)
  }

  //导出管床信息
  const excelTubeBed = () => {
    let data = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime
    };
    arrangeService.excelTubeBed(data).then(res => {
      fileDownload(res);
    });
  }
  // 打印排班Excel
  const printRosterExcel = () => {
    let visibleArr = ['empNo', 'nurseHierarchy', 'newTitle', 'year', 'total1']
    if (['nfzxy'].includes(appStore.HOSPITAL_ID)) {
      visibleArr.push('empRemark')
    }
    if (['wjgdszd'].includes(appStore.HOSPITAL_ID)) {
      visibleArr = ['empNo', 'nurseHierarchy', 'newTitle', 'year', 'total1', 'total2', 'balanceHour', 'publicHour', 'holidayHour']
    }
    let newArr: any[] = []
    let noEmpNoArr: any[] = []
    let noEmpNoArr1: any[] = []
    let noEmpNoArr2: any[] = []
    let noEmpNoArr3: any[] = []
    let noEmpNoArr4: any[] = []
    let noGroupArr: any[] = []
    let settingLength = sheetViewModal.sheetTableData[0].settingDtos.length
    Modal.confirm({
      title: '选择要打印的列',
      centered: true,
      width: 660,
      content: <div style={{ marginTop: 30 }}>
        <Checkbox.Group
          defaultValue={visibleArr}
          onChange={(newArr: any[]) => visibleArr = newArr}>
          <Checkbox value="empNo">工号</Checkbox>
          <Checkbox value="nurseHierarchy">层级</Checkbox>
          <Checkbox value="newTitle">职称</Checkbox>
          <Checkbox value="year">年限</Checkbox>
          <Checkbox value="total1">工时小计</Checkbox>
          {
            appStore.hisMatch({
              map: {
                'nfzxy': <React.Fragment>
                  <Checkbox value="empRemark">备注</Checkbox>
                </React.Fragment>,
                'wjgdszd': <React.Fragment>
                  <Checkbox value="total2">夜小时数</Checkbox>
                  <Checkbox value="balanceHour">累计结余</Checkbox>
                  <Checkbox value="publicHour">公休结余</Checkbox>
                  <Checkbox value="holidayHour">节休结余</Checkbox>
                </React.Fragment>
              },
              vague: true
            })
          }
        </Checkbox.Group>
      </div>,
      onOk: () => {
        settingLength += visibleArr.length + 1
        if (['wjgdszd'].includes(appStore.HOSPITAL_ID)) {
          selectViewModal.params.groupList.map((group: any) => {
            let arr = sheetViewModal.sheetTableData.filter((item: any) => {
              return group.groupName === item.groupName
            })
            newArr = newArr.concat([{ id: group.groupName, groupNameTitle: group.groupName, colSpan: settingLength }], arr)
          })
          sheetViewModal.sheetTableData.forEach((item: any) => {
            if (!item.empNo || ['试工工人', '规培护士', '助理护士', '实习护士'].includes(item.empNo)) noEmpNoArr.push(item)
            if (item.empNo && !item.groupName && !['试工工人', '规培护士', '助理护士', '实习护士'].includes(item.empNo)) noGroupArr.push(item)
          })
          newArr = newArr.concat([{ id: "未分组人员", groupNameTitle: "未分组人员", colSpan: settingLength }], noGroupArr, [{ id: "实习生", groupNameTitle: "实习生", colSpan: settingLength }], noEmpNoArr)
          printModal.printArrangeNew(visibleArr, newArr)
        } else if (['nfzxy'].includes(appStore.HOSPITAL_ID)) {
          selectViewModal.params.groupList.map((group: any) => {
            let arr = sheetViewModal.sheetTableData.filter((item: any) => {
              return group.groupName === item.groupName
            })
            if (arr.length > 0) {
              newArr = newArr.concat([{ id: group.groupName, groupNameTitle: group.groupName, colSpan: settingLength }], arr)
            }
          })
          sheetViewModal.sheetTableData.forEach((item: any) => {
            if (item.empNo.includes('试工工人')) noEmpNoArr1.push(item)
            if (item.empNo.includes('规培护士')) noEmpNoArr2.push(item)
            if (item.empNo.includes('助理护士')) noEmpNoArr3.push(item)
            if (!item.empNo || item.empNo.includes('实习护士')) noEmpNoArr4.push(item)
            if (item.empNo && !item.groupName && !['试工工人', '规培护士', '助理护士', '实习护士'].includes(item.empNo)) { noGroupArr.push(item) }
          })
          /*需要判断是否有数据*/
          if (noGroupArr.length > 0) {
            newArr = newArr.concat([{ id: "未分组人员", groupNameTitle: "未分组人员", colSpan: settingLength }], noGroupArr)
          }
          if (noEmpNoArr1.length > 0) {
            newArr = newArr.concat([{ id: "试工工人", groupNameTitle: "试工工人", colSpan: settingLength }], noEmpNoArr1)
          }
          if (noEmpNoArr2.length > 0) {
            newArr = newArr.concat([{ id: "规培护士", groupNameTitle: "规培护士", colSpan: settingLength }], noEmpNoArr2,)
          }
          if (noEmpNoArr3.length > 0) {
            newArr = newArr.concat([{ id: "助理护士", groupNameTitle: "助理护士", colSpan: settingLength }], noEmpNoArr3,)
          }
          if (noEmpNoArr4.length > 0) {
            newArr = newArr.concat([{ id: "实习护士", groupNameTitle: "实习护士", colSpan: settingLength }], noEmpNoArr4,)
          }
          // newArr = newArr.concat(
          //   [{id:"未分组人员",groupNameTitle:"未分组人员",colSpan:settingLength}],noGroupArr,
          //   [{id:"试工工人",groupNameTitle:"试工工人",colSpan:settingLength}],noEmpNoArr1,
          //   [{id:"规培护士",groupNameTitle:"规培护士",colSpan:settingLength}],noEmpNoArr2,
          //   [{id:"助理护士",groupNameTitle:"助理护士",colSpan:settingLength}],noEmpNoArr3,
          //   [{id:"实习护士",groupNameTitle:"实习护士",colSpan:settingLength}],noEmpNoArr4,
          //   )
          printModal.printArrangeNew(visibleArr, newArr)
        } else {
          printModal.printArrangeDghl(visibleArr)
        }
      }
    })
  };

  // 导出排班Excel
  const exportRosterExcel = () => {
    let status = appStore.HOSPITAL_ID === "lcey"
    arrangeService.exportRoster(2, status).then(res => {
      fileDownload(res);
    });
  };

  // 下载模板
  const downloadExcel = async () => {
    const res = await arrangeService.downloadExcel()
    fileDownload(res)
  }

  // 下载模板
  const handleUpload = async (info: any) => {
    let fn = () => arrangeService.importExcel(info.file)
    if (['zhzxy', 'hj'].includes(appStore.HOSPITAL_ID)) {
      const list = authStore.deptList;
      const current = list.find(
        (item: any) => item.code === selectViewModal.params.deptCode
      ) || { name: "" };
      let params: Obj = {
        upfile: info.file,
        deptCode: selectViewModal.params.deptCode,
        deptName: current.name,
        startTime: moment(selectViewModal.params.startTime).format("YYYY-MM-DD"),
        endTime: moment(selectViewModal.params.endTime).format("YYYY-MM-DD"),
      }
      fn = () => arrangeService.importExcel1(params)
    }
    const { data } = await fn()
    data.errorMag && message.error(data.errorMag, 4)
    setModalData(data.schedulingDtos)
    if(['lcey'].includes(appStore.HOSPITAL_ID)){
      setModalData(data)//20230728聊城二院，接口返回的数据是在data里面的，至于data.schedulingDtos，不知道是什么时候的数据结构
    }
    setModalVisible(true)
  }

  // 导出片区Excel
  const exportBigDeptExcel = (param: any) => {
    let data = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      bigDeptCode: param.key,
      bigDeptName: param.item.props.children
    };
    arrangeService.export(data).then(res => {
      fileDownload(res);
    });
  };

  let handleStatusChange = () => {
    if ('lyrm' === appStore.HOSPITAL_ID) {
      const [m1, m2] = currentMonth()
      setDate([
        m1,
        m2
      ]);
      selectViewModal.setParams(
        "startTime",
        m1.format("YYYY-MM-DD")
      );
      selectViewModal.setParams(
        "endTime",
        m2.format("YYYY-MM-DD")
      );
    }else if('jmfy' === appStore.HOSPITAL_ID){
      let currentMonth = getCurrentMonth()
      setDate(currentMonth);
      selectViewModal.setParams(
        "startTime",
        currentMonth[0].format("YYYY-MM-DD")
      );
      selectViewModal.setParams(
        "endTime",
        currentMonth[1].format("YYYY-MM-DD")
      );
    }else {
      setDate([
        moment(getMonday(), "YYYY-MM-DD"),
        moment(getSunday(), "YYYY-MM-DD")
      ]);
      selectViewModal.setParams(
        "startTime",
        moment(getMonday(), "YYYY-MM-DD").format("YYYY-MM-DD")
      );
      selectViewModal.setParams(
        "endTime",
        moment(getSunday(), "YYYY-MM-DD").format("YYYY-MM-DD")
      );
    }
    selectViewModal.setParams("group", "");
    setIsInit(false);
  };

  const getBigDept = () => {
    service.commonApiService.getBigDeptListSelfList().then(res => {
      setBigDeptList(res.data || []);
    });
  };

  useEffect(() => {
    if (appStore.queryObj.noRefresh == "1") {
      appStore.history.replace("/personnelManagement/arrangeHome");
    } else {
      if (isInit) {
        handleStatusChange();
      }
    }
    getBigDept();
  }, []);

  const toPrint = () => {
    if (appStore.HOSPITAL_ID == "nys") {
      let visibleArr = ['groupName', 'nurseHierarchy', 'newTitle', 'year', 'total1', 'thisWeekHoliday', 'totalHoliday']
      Modal.confirm({
        title: '选择要打印的列',
        centered: true,
        width: 660,
        content: <div style={{ marginTop: 30 }}>
          <Checkbox.Group
            defaultValue={visibleArr}
            onChange={(newArr: any[]) => visibleArr = newArr}>
            <Checkbox value="groupName">组别</Checkbox>
            <Checkbox value="nurseHierarchy">层级</Checkbox>
            <Checkbox value="newTitle">职称</Checkbox>
            <Checkbox value="year">年限</Checkbox>
            <Checkbox value="total1">工时小计</Checkbox>
            <Checkbox value="thisWeekHoliday">本周积假</Checkbox>
            <Checkbox value="totalHoliday">累积积假</Checkbox>
            {/* <Checkbox value="total2">夜小时数</Checkbox> */}
          </Checkbox.Group>
        </div>,
        onOk: () => {
          printModal.printArrangeNys(visibleArr)
        }
      })
    } else if (appStore.HOSPITAL_ID == "dghl") {
      let visibleArr = ['empNo', 'groupName', 'nurseHierarchy', 'newTitle', 'year', 'thisWeekHour', 'thisWeekHoliday', 'balanceHour', 'totalHoliday']
      Modal.confirm({
        title: '选择要打印的列',
        centered: true,
        width: 660,
        content: <div style={{ marginTop: 30 }}>
          <Checkbox.Group
            defaultValue={visibleArr}
            onChange={(newArr: any[]) => visibleArr = newArr}>
            <Checkbox value="empNo">工号</Checkbox>
            <Checkbox value="groupName">分组名称</Checkbox>
            <Checkbox value="nurseHierarchy">层级</Checkbox>
            <Checkbox value="newTitle">职称</Checkbox>
            <Checkbox value="year">年限</Checkbox><br />
            <Checkbox value="thisWeekHour">本周上班时数</Checkbox>
            <Checkbox value="thisWeekHoliday">本周结余时数</Checkbox>
            <Checkbox value="balanceHour">累计结余</Checkbox>
            <Checkbox value="totalHoliday">年假天数</Checkbox>
          </Checkbox.Group>
        </div>,
        onOk: () => {
          printModal.printArrangeDghl(visibleArr)
        }
      })
    } else if (appStore.HOSPITAL_ID == "dgxg") {
      printModal.printArrangeDgxg();
    } else {
      printModal.printArrange();
    }
  };
  const handlePrint = () => {
    // let visibleArr = ['empNo','empName','flag','nurseHierarchy', 'newTitle', 'year', 'WeekBalanceHour','BalanceHour','WorkNightCount','PostScoreCell','TotalHoliday']
    let visibleArr = ['empName', 'groupName', 'flag', 'nurseHierarchy', 'newTitle', 'year', 'chargeBed']
    Modal.confirm({
      title: '选择要打印的列',
      centered: true,
      width: 660,
      content: <div style={{ marginTop: 30 }}>
        <Checkbox.Group
          defaultValue={visibleArr}
          onChange={(newArr: any[]) => visibleArr = newArr}>
          <Checkbox value="groupName">分组名称</Checkbox>
          {/* <Checkbox value="empNo">工号</Checkbox> */}
          <Checkbox value="empName">姓名</Checkbox>
          {/* <Checkbox value="flag">标志</Checkbox> */}
          <Checkbox value="nurseHierarchy">层级</Checkbox>
          <Checkbox value="newTitle">职称</Checkbox>
          <Checkbox value="year">年限</Checkbox>
          <Checkbox value="chargeBed">分管床位</Checkbox>

          {/* <Checkbox value="WeekBalanceHour">本轮积时</Checkbox> */}
          {/* <Checkbox value="BalanceHour">累计时数</Checkbox> */}
          {/* <Checkbox value="WorkNightCount">累计夜班数</Checkbox> */}
          {/* <Checkbox value="PostScoreCell">累计系数</Checkbox> */}
          {/* <Checkbox value="TotalHoliday">本年余假</Checkbox> */}
        </Checkbox.Group>
      </div>,
      onOk: () => {
        printModal.printArrangeDghl(visibleArr)
      }
    })
  };
  const findSyncNurse = () => {
    Modal.confirm({
      title: "同步人员",
      content: "确定要同步此排班人员吗？",
      okText: "确认",
      cancelText: "取消",
      centered: true,
      maskClosable: true,
      onOk: () => {
        let data = {
          startTime: moment(selectViewModal.params.startTime).format("YYYY-MM-DD"),
          endTime: moment(selectViewModal.params.endTime).format("YYYY-MM-DD"),
          deptCode: selectViewModal.params.deptCode,
          nurseGroup: selectViewModal.params.group,
          startTimeWeek: moment(selectViewModal.params.startTime)
            .weekday(0)
            .format("YYYY-MM-DD"),
          endTimeWeek: moment(selectViewModal.params.endTime)
            .weekday(6)
            .format("YYYY-MM-DD"),
          sync: true
        }
        sheetViewModal.tableLoading = true
        try {
          service.scheduleUserApiService.findSyncNurse(data).then((res) => {
            message.success("同步成功");
            sheetViewModal.sheetTableData = sheetViewModal.handleSheetTableData(res.data.setting, sheetViewModal.countObj)
            sheetViewModal.tableLoading = false
          });
        } catch (error) {
          sheetViewModal.tableLoading = false
        }

      },
    });
  }
  const bigDeptmenu = (
    <Menu onClick={exportBigDeptExcel}>
      <Menu.Item key='全院'>全院</Menu.Item>
      {bigDeptList.map((item: DictItem) => (
        <Menu.Item key={item.code}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );

  // 南医三批量导出
  const handleExport = () => {
    let obj = {
      deptCodes: sheetViewModal.deptCodeList,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
    }
    if (sheetViewModal.deptCodeList && sheetViewModal.deptCodeList.length > 0) {
      arrangeService.exportNys(obj).then(res => {
        fileDownload(res);
      })
    } else {
      message.warning('批量导出前请先选择科室！');
    }
  };
  /**刷新分组护士列表 */
  useEffect(() => {
    sheetViewModal.setNurseList()
  }, [selectViewModal.params.group, selectViewModal.params.deptCode])
  /* 判断是否具有排班权限*/
  const getPushAuth = () => {
    //     SYS0001  管理员 QCR0001  护理部
    let user: any = JSON.parse(sessionStorage.getItem("user") || "{}");
    let auth: [string, string] = ['SYS0001', 'QCR0001']
    let days: number = new Date().getDay() === 0 ? 7 : new Date().getDay() + 7  //当前日期+ 上周
    let startTime: number = new Date(selectViewModal.params.startTime).getTime()
    let newTime: number = new Date().getTime()
    /**
     * 周一到周四，本周一到之后可以编辑
     * 周五到周日，下周一到之后可以编辑
     * by 威海
     */
    if ('whsl' === appStore.HOSPITAL_ID) {
      const start = moment(selectViewModal.params.startTime)
      // 星期数
      const day = moment().day()
      if (day > 0 && day < 5) {
        // 上周日
        const lastSun = moment().subtract(day, 'days').format('YYYY-MM-DD')
        if (start.isAfter(lastSun)) return true
        message.warning('排班的可编辑范围从本周一开始')
      } else {
        // 下周一
        const curSun = moment().subtract( day ? day - 7 : 0, 'days').format('YYYY-MM-DD')
        if (start.isAfter(curSun)) return true
        message.warning('排班的可编辑范围从下周一开始')
      }
      return false
    }
    if (appStore.HOSPITAL_ID !== 'wjgdszd') return true
    if (appStore.HOSPITAL_ID === 'wjgdszd' && auth.includes(user.roleManageCode)) return true
    if (appStore.HOSPITAL_ID === 'wjgdszd' && !auth.includes(user.roleManageCode) && ((newTime - startTime) > (days * 60 * 60 * 24 * 1000))) {
      //  非管理员 护理部 超出日期限制
      Modal.warn({
        title: '不能编辑上周以前的数据!',
        mask: false,
      })
      return false
    } else {
      return true
    }
  }
  /**导出下拉框的overlay */
  const exportMenu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => exportExcel()}>
          导出科室
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => exportExcel('全院')}>
          导出全院科室
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <Wrapper>
      <LeftIcon>
        <div className="item">
          <div className="label data">日期：</div>
          <div className="content">
            <DatePicker.RangePicker
              ranges={{
                本周: [moment().startOf("week"), moment().endOf("week")],
                上周: () => {
                  /** 判断是否是一周 */
                  let weeks = date[0].week();
                  let _date = date[0].format("YYYY-MM-DD");
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].subtract(7, "d"), date[1].subtract(7, "d")];
                  }
                  return [
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .startOf("week"),
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .endOf("week")
                  ];
                },
                下周: () => {
                  /** 判断是否是一周 */
                  let weeks = date[0].week();
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].add(7, "d"), date[1].add(7, "d")];
                  }
                  return [
                    moment()
                      .week(moment().week() + 1)
                      .startOf("week"),
                    moment()
                      .week(moment().week() + 1)
                      .endOf("week")
                  ];
                },
                本月: [moment().startOf("month"), moment().endOf("month")],
                上月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() - 1)
                    .endOf("month")
                ],
                下月: [
                  moment()
                    .month(moment().month() + 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() + 1)
                    .endOf("month")
                ]
              }}
              style={{ width: 220 }}
              value={date}
              onChange={dateChange}
              allowClear={false}
            />
          </div>
        </div>
        <div className="item">
          <div className="label">科室：</div>
          <div className="content">
            {
              ['zzwy','dgxg'].includes(appStore.HOSPITAL_ID)?
                  <DeptSelect
                      hasAllDept={true}
                      deptCode={authStore.defaultDeptCode}
                      onChange={handleChange} style={{ width: 160 }} />:
                  <DeptSelect
                      onChange={handleChange} style={{ width: 160 }} />
            }
          </div>
        </div>
        <div className="item">
          <div className="label">分组：</div>
          <div className="content">
            <Select
              value={selectViewModal.params.group}
              onChange={handleGroupChange}
              showSearch
              style={{ width: 100 }}
            >
              <Select.Option key="全部" value="">
                全部
              </Select.Option>
              {selectViewModal.params.groupList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {
          ['whyx', 'whhk'].includes(appStore.HOSPITAL_ID)
          && <div className="item item-nurse">
            <Select value={sheetViewModal.nurseId} placeholder="输入护士姓名或工号"
              showSearch
              optionFilterProp="title"
              onChange={(e: any) => sheetViewModal.changeNurseId(e)}
              style={{ width: 100 }}>
              {
                sheetViewModal.nurseList.map((v: any) => (
                  <Select.Option value={v.id} title={v.empName} key={v.id}>
                    {v.empName}
                  </Select.Option>
                ))
              }
            </Select>
          </div>
        }
        <div className="item">
          <Button
            type="primary"
            onClick={() => sheetViewModal.getSheetTableData()}
            className="statistics"
          >
            查询
          </Button>
        </div>
        {authStore.isRoleManage && (
          <div className="item">
            <Button
              className="statistics"
              onClick={() => {
                if (getPushAuth()) {
                  appStore.history.push(`/personnelManagement/EditArrangePage`);
                }
              }}
            >
              编辑排班
            </Button>
          </div>
        )}

        {appStore.hisMatch({
          map: {
            lcey: <React.Fragment>
              <div className="item">
                <Button className="statistics getExcel" onClick={printRosterExcel}>
                  打印排班
                </Button>
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={exportRosterExcel}>
                  导出排班
                </Button>
              </div>
              <div className="item">
                <Upload showUploadList={false} customRequest={handleUpload}>
                  <Button className="statistics getExcel">
                    导入排班
                  </Button>
                </Upload>
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={downloadExcel}>
                  下载模板
                </Button>
              </div>
              <ImportModal
                visible={modalVisible}
                modalData={modalData}
                onOk={() => {
                  setModalVisible(false)
                  sheetViewModal.getSheetTableData()
                }}
                onCancel={() => setModalVisible(false)} />
            </React.Fragment>,
            'whyx,whhk': <React.Fragment>
              <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel()}>
                  导出排班
                </Button>
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={excelTubeBed}>
                  导出管床信息
                </Button>
              </div>
            </React.Fragment>,
            nfzxy: <React.Fragment>
              <div className="item">
                <Button className="statistics getExcel" onClick={printRosterExcel}>
                  打印排班
                </Button>
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel()}>
                  导出科室
                </Button>
              </div>
            </React.Fragment>,
            wjgdszd: <React.Fragment>
              <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel()}>
                  导出科室
                </Button>
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={printRosterExcel}>
                  打印排班
                </Button>
              </div>
            </React.Fragment>,
            'zhzxy': <>
              <div className="item">
                <Upload showUploadList={false} customRequest={handleUpload}>
                  <Button className="statistics getExcel">
                    导入排班
                  </Button>
                </Upload>
              </div>
              <div className="item">
                <Button
                  className="statistics getExcel"
                  disabled={sheetViewModal.tableLoading}
                  onClick={handlePrint}>
                  打印
                </Button>
              </div>
              <div className="item">
                <Button
                  className="statistics getExcel"
                  disabled={!authStore.isRoleManage}
                  onClick={findSyncNurse}>
                  同步排班人员
                </Button>
              </div>
              <div className="item">
                {authStore.isDepartment ?
                  <Dropdown overlay={exportMenu}>
                    <Button className="statistics getExcel">
                      导出科室
                    </Button>
                  </Dropdown>
                  :
                  <Button className="statistics getExcel" onClick={() => exportExcel()}>
                    导出科室
                  </Button>}
              </div>
              <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel('default')}>
                  导出排班
                </Button>
              </div>
              <ImportModal
                visible={modalVisible}
                modalData={modalData}
                onOk={() => {
                  setModalVisible(false)
                  sheetViewModal.getSheetTableData()
                }}
                onCancel={() => setModalVisible(false)} />
            </>,
            'dgxg': <>
            <div className="item">
              <Upload showUploadList={false} customRequest={handleUpload_dgxg}>
                <Button className="statistics getExcel">
                  导入排班
                </Button>
              </Upload>
            </div>
            <div className="item">
              {/* <Upload showUploadList={false} customRequest={handleUpload}> */}
                <Button className="statistics getExcel" onClick={()=>exportExcel_DGXG()}>
                  导出排班模板
                </Button>
              {/* </Upload> */}
            </div>
            
            <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel()}>
                  导出科室
                </Button>
            </div>
            <div className="item">
            <Button
              className="item"
              onClick={() => showStandardTimeModal.show()}
            >
              标准工时
            </Button>
            </div>
            <ImportModal
                visible={modalVisible}
                modalData={modalData}
                onOk={() => {
                  setModalVisible(false)
                  sheetViewModal.getSheetTableData()
                }}
                onCancel={() => setModalVisible(false)} />
          </>,
            hj: <>
              <div className="item">
                <Button className="statistics getExcel" onClick={() => exportExcel()}>
                  导出科室
                </Button>
              </div>
              <div className="item">
                <Upload showUploadList={false} customRequest={handleUpload}>
                  <Button className="statistics getExcel">
                    导入排班
                  </Button>
                </Upload>
              </div>
              <ImportModal
                visible={modalVisible}
                modalData={modalData}
                onOk={() => {
                  setModalVisible(false)
                  sheetViewModal.getSheetTableData()
                }}
                onCancel={() => setModalVisible(false)} />
            </>,
            other: <div className="item">
              <Button className="statistics getExcel" onClick={() => exportExcel()}>
                导出科室
              </Button>
            </div>
          },
          vague: true
        })}
        {appStore.HOSPITAL_ID == "nys" &&
          (authStore.isDepartment || authStore.isSupervisorNurse) && (
            <div className="item export">
              <Select
                style={{ width: '160px' }}
                mode="multiple"
                maxTagCount={0}
                allowClear={true}
                showSearch
                placeholder='选择批量导出科室'
                filterOption={(input: any, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val: any[]) => {
                  sheetViewModal.deptCodeList = val
                }}
                value={sheetViewModal.deptCodeList}
              >
                {sheetViewModal.deptList.map((item: any) => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
              <span onClick={() => handleExport()}>批量导出</span>
            </div>
          )}
        {([...isWhArr, "fssdy"].includes(appStore.HOSPITAL_ID)) &&
          (authStore.isDepartment || authStore.isSupervisorNurse) && (
            <div className="item">
              <Dropdown.Button
                className="statistics getExcel"
                overlay={bigDeptmenu}
              >
                导出片区
              </Dropdown.Button>
            </div>
          )}
        {([...isWhArr, 'nfzxy'].includes(appStore.HOSPITAL_ID)) && (
          <div className="item">
            <Button
              className="item"
              onClick={() => showStandardTimeModal.show()}
            >
              标准工时
            </Button>
          </div>
        )}
        {appStore.hisMatch({
          map: {
            'hj,nys,dgxg,dghl': (
              <div className="item">
                <Button
                  className="statistics getExcel"
                  disabled={sheetViewModal.tableLoading}
                  onClick={toPrint}
                >
                  打印
                </Button>
              </div>
            ),
            default: <span></span>
          },
          vague: true
        })}
      </LeftIcon>
      <showStandardTimeModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 40px;
  padding-top: 15px;
  box-sizing: border-box;
  background: #fff;
  /* border-bottom: 1px solid #ccc; */
  .item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .ant-select-selection--multiple {
      min-height: 30px !important;
    }

  .export {
    .ant-select-selection {
        border-radius: 4px 0 0 4px !important;
        padding-bottom: 0 !important;
        margin-top: -3px !important;
      }
    & > span {
      border: 1px solid #d9d9d9;
      border-left: none !important;
      border-radius: 0 4px 4px 0;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      padding: 0 5px;
      & :hover {
        cursor:pointer;
      }
    }
  }
`;
const LeftIcon = styled.div`
  float: left;
  font-size: 13px;
  .getExcel {
    margin-right: 0;
  }
  .data {
    margin-left: 10px;
  }
  button,
  select,
  .ant-calendar-picker,
  .ant-input,
  .ant-select,
  .ant-select-selection--single {
    height: 28px;
  }
  .ant-select-selection__rendered {
    line-height: 27px;
  }
  .ant-input {
    line-height: 1.3;
  }
`;

const RightIcon = styled.div`
  float: right;
  font-size: 13px;
  height: 32px;
  vertical-align: middle;
  margin-top: 5px;
  margin-right: 5px;
  span {
    cursor: pointer;
    color: #00a680;
  }
`;
