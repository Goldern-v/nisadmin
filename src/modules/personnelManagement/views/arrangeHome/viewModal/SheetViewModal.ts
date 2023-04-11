import _ from "lodash";
import moment from "moment";
import service from "src/services/api/index";
import api from "src/services/api/index";
import { action, computed, observable } from "mobx";
import { dateDiff } from "src/utils/date/dateDiff";
import { message } from "src/vendors/antd";

import * as Sheet from "./../types/Sheet";
import { cloneJson } from "./../../../../../utils/json/clone";
import { appStore, authStore } from "./../../../../../stores/index";
import { selectViewModal } from "./SelectViewModal";
import { notSelectViewModal } from "../page/notRelease/components/SelectViewModal";
import { arrangeService } from "../services/ArrangeService";
import { notArrangeService } from "../services/notReleaseService";
import {
  cleanCell,
  copyRowClick,
} from "../components/arrangeSheet/cellClickEvent";

/** 用于存放排班表等基础数据 */
class SheetViewModal {
  /** 是否已经初始化字典数据 */
  @observable public isInitEd: boolean = false;
  @observable public sheetTableData: any = [];

  // 聊城二院-未发布排班记录数据
  @observable public notSheetTableData: any = [];
  /** 期望排班 */
  @observable public expectList: any = [];
  /** 申请加减班 */
  @observable public expectAsClassList: any = [];
  @observable public dateList: string[] = [];
  @observable public remark: string = "";
  @observable public arrangeMenu: any[] = [];
  @observable public notArrangeMenu: any[] = [];
  @observable public arrangeMeal = [];
  @observable public hdArrangeMeal = [];
  @observable public schSymbolList: Sheet.SymbolItem[] = [];
  /** 选中的格子 */
  @observable public selectedCell: Sheet.ArrangeItem = {};
  // 选中的格子列表（只用来批量赋值） 东莞横沥需要多个格子一起赋值
  @observable public selectedCellList: Sheet.ArrangeItem[] = [];
  @observable public allCell: any[] = [];
  /** 加载状态 */
  @observable public tableLoading: boolean = false;
  /** 复制行 */
  @observable public copyRow: any[] = [];
  /** 复杂单个格子 */
  @observable public copyCell: any = null;
  /** 复杂多个格子 */
  @observable public copyCellList: any = [];
  /** 缓存 */
  @observable public _copyCellList: any = [];
  /** 复制周 */
  @observable public copyWeekRow: any[] = [];
  /** 复制周班次数据 */
  @observable public copyWeekData: any[] = [];
  /** 复制周数 */
  @observable public copyWeekNum: number = 0;
  /** 特殊班次，计数等 */
  @observable public countArrangeNameList: any[] = [];
  /** 一周全是这些班次 按5天计算工时 */
  @observable public weekArrangeNameList: any[] = [];
  /** 标准工时列表 */
  @observable public standardTimeList: any[] = [];
  /**科室列表 */
  @observable public deptList: any[] = [];
  @observable public deptCodeList: any[] = [];
  // 期望排班数量
  @observable public experNumber: number = 0;
  // 加减班
  @observable public ExpectAsNumber: number = 0;

  // 标准工时
  @observable public standardTime: number = 0;
  @observable public groupName: any;
  @observable public countObj: any = {}

  getAllDeptList() {
    arrangeService.getAllDeptList().then((res: any) => {
      this.deptList = res.data.deptList || [];
    });
  }

  /** 时间段 */
  getDateList() {
    let days = [];
    let dayDiff =
      selectViewModal.params.startTime && selectViewModal.params.endTime
        ? dateDiff(
            selectViewModal.params.startTime,
            selectViewModal.params.endTime
          )
        : 0;
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(
          moment(selectViewModal.params.startTime)
            .add(i, "d")
            .format("YYYY-MM-DD")
        );
      }
    }
    return days;
  }

  /** 时间段  未发布排班模块 */
  notGetDateList() {
    let days = [];
    let dayDiff =
      notSelectViewModal.params.startTime && notSelectViewModal.params.endTime
        ? dateDiff(
            notSelectViewModal.params.startTime,
            notSelectViewModal.params.endTime
          )
        : 0;
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(
          moment(notSelectViewModal.params.startTime)
            .add(i, "d")
            .format("YYYY-MM-DD")
        );
      }
    }
    return days;
  }

  getAllCell(canEdit: boolean) {
    let cellList = [];
    for (let i = 0; i < this.sheetTableData.length; i++) {
      for (let j = 0; j < this.sheetTableData[i]!.settingDtos.length; j++) {
        // this.sheetTableData[i]!.settingDtos[j].empName = this.sheetTableData[
        //   i
        // ].empName;
        cellList.push(this.sheetTableData[i].settingDtos[j]);
      }
    }
    if (canEdit) {
      cellList = cellList.filter((item) => {
        return !this.analyseCell(item).isTwoDaysAgo;
      });
    }
    return cellList;
  }

  getNextCell() {
    if (this.selectedCell) {
      let allCell = this.allCell;
      let index = allCell.indexOf(this.selectedCell);
      if (index > -1 && index < allCell.length - 1) {
        return allCell[index + 1];
      } else {
        return null;
      }
    }
  }

  getSelectCellList(canEdit: boolean) {
    let list: any[] = [];
    if (this.selectedCell) {
      let userId = this.selectedCell.userId;
      list = this.allCell.filter((item) => {
        item.userId == userId && this.getGroupName(item.empName);
        return (
          item.userId == userId &&
          (canEdit ? this.analyseCell(item).isTwoDaysAgo == false : true)
        );
      });
    }
    return list;
  }

  /** 获取选中格子的周 */
  getSelectWeekList(canEdit: boolean) {
    let list: any[] = [];
    if (this.selectedCell) {
      let userId = this.selectedCell.userId;
      list = this.allCell.filter((item) => {
        return (
          item.userId == userId &&
          (canEdit ? this.analyseCell(item).isTwoDaysAgo == false : true)
        );
      });
    }

    let weekIndex = moment(this.selectedCell.workDate).weeks();
    let weekRow = [];
    for (let i = 0; i < 7; i++) {
      weekRow[i] = list.find(
        (item) =>
          moment(item.workDate).weeks() == weekIndex &&
          moment(item.workDate).isoWeekday() == i + 1
      );
    }
    return weekRow;
  }

  /** 解析cellobj 获取额外信息 */
  analyseCell(cellObj: Sheet.ArrangeItem): any {
    if (!cellObj) return {};

    const cellConfig = {
      /** 不可编辑 */
      isTwoDaysAgo: cellObj.status == "1",
      isExpectedScheduling: cellObj.statusType == "1",
      isAddWordTime: appStore.hisMatch({
        map: {
          "dghl,fqfybjy,wh,gxjb,fssdy,fsxt,925,whyx,lyyz,qhwy,whsl,ytll,whhk,dglb,zzwy,dghm":
            (cellObj.schAddOrSubs &&
              cellObj.schAddOrSubs.length &&
              cellObj.schAddOrSubs[0].statusType) == "1",
          default:
            cellObj.effectiveTimeOld &&
            cellObj.effectiveTime &&
            cellObj.effectiveTimeOld < cellObj.effectiveTime,
        },
        vague: true,
      }),
      isReduceWordTime: appStore.hisMatch({
        map: {
          "wh,gxjb,fssdy,fsxt,925,whyx,lyyz,whsl,qhwy,ytll,whhk,dglb,zzwy,dghm":
            (cellObj.schAddOrSubs &&
              cellObj.schAddOrSubs.length &&
              cellObj.schAddOrSubs[0].statusType) == "2",
          default:
            cellObj.effectiveTimeOld &&
            cellObj.effectiveTime &&
            cellObj.effectiveTimeOld > cellObj.effectiveTime,
        },
        vague: true,
      }),
      isJiJiaTime: appStore.hisMatch({
        map: {
          jmfy: cellObj.schJiJias && cellObj.schJiJias.length > 0,
          default: false,
        },
      }),
      isSelected:
        this.selectedCell == cellObj ||
        this.copyCellList.includes(cellObj) ||
        this.selectedCellList.includes(cellObj),
      // 是否存在排班
      isWorkTime: appStore.hisMatch({
        map: {
          "qhwy,dglb,dghm": !!cellObj.workTime,
          default: false,
        },
        vague: true,
      }),
    };
    return cellConfig;
  }

  /** 重置排班 */
  cleanAllCell() {
    let allCell = this.getAllCell(true);
    for (let cell of allCell) {
      cleanCell(cell);
    }
  }

  /** 根据工号和时间获取排班格子 */
  getCellObj(userId: number, date: string) {
    let allCell = this.getAllCell(true);
    return allCell.find((item) => {
      return item.userId == userId && item.workDate == date;
    });
  }

  /** 根据姓名和时间获取排班格子 */
  getCellObjByName(empName: string, date: string) {
    let allCell = this.getAllCell(true);
    return allCell.find((item) => {
      return item.empName == empName && item.workDate == date;
    });
  }

  /** 根据工号 获取完整用户排班信息 */
  getUser(userId: number) {
    let user = this.sheetTableData.find((item: any) => {
      return item.id == userId;
    });
    if (user) {
      return [user, user.settingDtos];
    } else {
      return [null, null];
    }
  }

  /** 获取排班人员信息*/
  getSheetTableData() {
    if (!this.isInitEd) return this.init();
    this.tableLoading = true;
    return arrangeService.findCreateOrUpdate().then(async (res) => {
      this.tableLoading = false;
      this.dateList = this.getDateList();
      this.getExpectList();
      this.getExpectAsList();
      if (["fssdy"].includes(appStore.HOSPITAL_ID)) {
        this.getHourStart();
      }
      // 休假天数是否按已休天数来显示
      // 医院初始化时可能会报错 建议不开启
      if (
        [
          "wh",
          "fqfybjy",
          "gxjb",
          "nys",
          "lyyz",
          "qhwy",
          "whsl",
          "zhzxy", 'dglb', 'dghm'
        ].includes(appStore.HOSPITAL_ID)
      ) {
        let { data: countObj } = await arrangeService.listRangeNameCode(
          res.data.setting
        );

        const {
          data: standardTimeList,
        } = await arrangeService.schInitialHourGetListByDate({
          wardCode: authStore.selectedDeptCode,
          startDate: selectViewModal.params.startTime,
          endDate: selectViewModal.params.endTime,
        });
        this.standardTimeList = standardTimeList;

        this.sheetTableData = this.handleSheetTableData(
         this.getGroupNameSort(res.data.setting),
          countObj
        );
      } else {
        try {
          if (this.sheetTableData.length > 0 && !res.data.setting.length) {
            throw new Error('排班人员不能为空')
          }
          this.sheetTableData = this.handleSheetTableData(res.data.setting, {});
        } catch(e) {
          message.error((e as any).message)
          // setTimeout(() => {
          //   this.sheetTableData = []
          // }, 200)
        }
      }
      if (["whyx","whhk"].includes(appStore.HOSPITAL_ID)) {
        this.sheetTableDataCopy = _.cloneDeep(this.sheetTableData);
        this.searchNurseId();
      }
      this.remark = res.data.remark;
      this.allCell = this.getAllCell(true);
    });
  }

  // 未发布排班记录查询
  getData() {
    if (!this.isInitEd) return this.init();
    this.tableLoading = true;
    if (!notSelectViewModal.params.startTime) return Promise.resolve(() => {});
    return notArrangeService
      .countSettingByStatus()
      .then((res: { code: string; data: any }) => {
        this.dateList = this.notGetDateList();
        this.tableLoading = false;
        if (res.code === "200") {
          this.notSheetTableData = this.handleSheetTableData(res.data, {});
        }
      });
  }

  @computed
  get isPush() {
    let allCell = this.getAllCell(false);
    return allCell.some((item: any) => item.status == "1");
  }

  /** 同步排班人员数据 */
  findSysnNurse(sync: boolean = false) {
    this.tableLoading = true;
    return arrangeService.findSysnNurse(sync).then((res) => {
      this.tableLoading = false;
      this.dateList = this.getDateList();
      this.tableLoading = false;
      this.sheetTableData = this.handleSheetTableData(res.data.setting);
      this.remark = res.data.remark;
      this.allCell = this.getAllCell(true);
    });
  }

  /** 复制排班人员数据 */
  handleCopy(copyStatus?: boolean) {
    this.tableLoading = true;
    return arrangeService.copyPrevSettingRange(copyStatus).then(async (res) => {
      this.tableLoading = false;
      this.dateList = this.getDateList();

      let { data: countObj } = await arrangeService.listRangeNameCode(
        res.data.setting
      );
      let newList = res.data.setting.map((item: any, index: any) => {
        return {
          // ...this.sheetTableData[index],
          ...item,
          settingDtos: item.settingDtos,
        };
      });
      this.sheetTableData = this.handleSheetTableData(
        // res.data.setting,
        newList,
        countObj
      );
      this.remark = res.data.remark;
      this.allCell = this.getAllCell(true);
    });
  }

  // 同步同组人员排班信息
  holdTeam() {
    let list = this.getSelectCellList(true);
    this.sheetTableData.reduce((pre: any, item: any, index: any) => {
      if (item.groupName === this.groupName) {
        copyRowClick(item.settingDtos, list, false);
      } else {
        return item.groupName;
      }
    }, null);
  }

  // 获取当前组别
  getGroupName(name: string) {
    let groupName = "";
    this.sheetTableData.forEach((item: any) => {
      if (item.empName == name) {
        groupName = item.groupName;
      }
    });
    this.groupName = groupName;
    return groupName;
  }

  getArrangeMenu() {
    arrangeService.getArrangeMenu().then((res) => {
      this.arrangeMenu = res.data;
    });
  }

  // 未发布班排模块
  notGetArrangeMenu() {
    notArrangeService.getArrangeMenu().then((res) => {
      this.notArrangeMenu = res.data;
    });
  }

  getArrangeMeal() {
    arrangeService.getArrangeMeal().then((res) => {
      this.arrangeMeal = res.data;
    });
  }

  getHDArrangeMeal() {
    arrangeService.getHDArrangeMeal().then((res) => {
      this.hdArrangeMeal = res.data;
    });
  }

  getSchSymbol() {
    arrangeService.getSchSymbol().then((res) => {
      this.schSymbolList = res.data;
    });
  }

  getExpectList() {
    return arrangeService.getByDeptCodeAndDate().then((res) => {
      this.expectList = res.data;
      this.experNumber = res.data.length;
    });
  }

  /** 申请加减班 */
  getExpectAsList() {
    return arrangeService
      .schExpectAddOrSubGetByDeptCodeAndDate()
      .then((res) => {
        this.expectAsClassList = res.data.reduce((total: any, current: any) => {
          total.push(
            ...current.schExpects.map((item: any) => ({
              week: current.week,
              ...item,
            }))
          );
          return total;
        }, []);
        this.ExpectAsNumber = this.expectAsClassList.length;
      });
  }

  saveSheetTableData(status: "0" | "1" | undefined) {
    if (!['sdlj', 'qzde'].includes(appStore.HOSPITAL_ID)) {
      if (document.querySelector(".public-hour-warning")) {
        return message.warning("存在公休天数小于0的护士，请修正");
      }
      if (document.querySelector(".period-hour-warning")) {
        return message.warning("存在例假天数小于0的护士，请修正");
      }
    }
    let urlName =
      appStore.HOSPITAL_ID == "nys" ? "schedulingNys" : "scheduling";
    this.tableLoading = true;
    return arrangeService.saveOrUpdate(status, urlName).then((res) => {
      if (status == "0") message.success("保存成功");
      if (status == "1") message.success("推送成功");
      this.getSheetTableData();
    });
  }

  /** 处理后台过来的表格数据，增加一些计算结果 公休节休计数等
   * @param sheetTableData 排班列表
   * @param countObj  护士排班需要编号的班次及开始编号
   */
  handleSheetTableData(sheetTableData: any, countObj: any = {}) {
    /** for 优化速度 */
    let _sheetTableData = cloneJson(sheetTableData);
    for (let i = 0; i < _sheetTableData.length; i++) {
      /** 当前结余，公休，南医三当前积假，节修时间, 用于推导实际时间 */
      let current_balanceHour = 0;
      let current_holidayHourNys = 0;
      let current_holidayHour = 0;
      let current_publicHour = 0;
      let current_periodHour = 0;
      current_holidayHourNys += Number(_sheetTableData[i].thisWeekHoliday) || 0;

      for (let j = 0; j < _sheetTableData[i].settingDtos.length; j++) {
        /** 添加姓名 */
        _sheetTableData[i].settingDtos[j].empName = _sheetTableData[i].empName;

        current_balanceHour +=
          Number(_sheetTableData[i].settingDtos[j].effectiveTime) || 0;

        current_holidayHour +=
          _sheetTableData[i].settingDtos[j].rangeName == "节休" ? 1 : 0;
        current_publicHour +=
          _sheetTableData[i].settingDtos[j].rangeName == "公休" ? 1 : 0;
        current_periodHour +=
          _sheetTableData[i].settingDtos[j].shiftType == "例假"
            ? _sheetTableData[i].settingDtos[j].schSpecial
            : 0;
        /** 假如是跨年，公休基数设置为1 */

        if (
          (_sheetTableData[i].settingDtos[j].rangeName == "公休" ||
            _sheetTableData[i].settingDtos[j].rangeName == "病假") &&
          _sheetTableData[i].settingDtos[j].workDate.includes("-01-01")
        ) {
          if (!_sheetTableData[i].settingDtos[j].rangeNameCodeList) {
            _sheetTableData[i].settingDtos[j].rangeNameCodeList = 1;
          }
        }
      }

      /** 如果存在一周7天都是 */
      let weekObj: any = {};
      for (let item of _sheetTableData[i].settingDtos) {
        if (this.weekArrangeNameList.includes(item.rangeName)) {
          let num = moment(item.workDate).week();
          if (weekObj[num]) {
            weekObj[num].push(num);
          } else {
            weekObj[num] = [];
            weekObj[num].push(num);
          }
        }
      }
      /** 标准周工时 */
      for (let key in weekObj) {
        if (weekObj[key].length == 7) {
          let real_week = sheetViewModal.getStandTime(
            moment()
              .week(Number(key))
              .format("YYYY-MM-DD")
          );
          current_balanceHour -= (real_week / 5) * 2;
        }
      }

      _sheetTableData[i].current_balanceHour = current_balanceHour;
      _sheetTableData[i].current_holidayHourNys = current_holidayHourNys;
      _sheetTableData[i].current_holidayHour = current_holidayHour;
      _sheetTableData[i].current_publicHour = current_publicHour;
      _sheetTableData[i].current_periodHour = current_periodHour;
      // 额外字段 by谢岗
      !_sheetTableData[i].userExpend && appStore.HOSPITAL_ID === 'dgxg' && (_sheetTableData[i].userExpend = {
        expend1: '',
        expend2: '',
        expend3: '',
        expend4: '',
        expend5: '',
        expend6: '',
        expend7: '',
        expend8: '',
      });
      // 额外字段 by珠海中西医
      !_sheetTableData[i].userExpend && appStore.HOSPITAL_ID === 'zhzxy' && (_sheetTableData[i].userExpend = {
        expend2: '',  //管床
      });
      /** 计数班次的基础次数 */
      let countArrangeBaseIndexObj: any = {};
      for (let key of this.countArrangeNameList) {
        countArrangeBaseIndexObj[key] = 0;
      }

      for (let key of this.countArrangeNameList) {
        if (countObj[_sheetTableData[i].empName]) {
          let countItem: any = countObj[_sheetTableData[i].empName].find(
            (o: any) => o.rangeName == key
          );
          if (countItem) {
            countArrangeBaseIndexObj[key] =
              Number(countItem.rangeNameCode) || 0;
          }
        }
      }

      _sheetTableData[i].countArrangeBaseIndexObj = countArrangeBaseIndexObj;
    }

    /** 假期计数初始化 */

    for (let i = 0; i < _sheetTableData.length; i++) {
      let list = _sheetTableData[i].settingDtos;
      for (let j = 0; j < this.countArrangeNameList.length; j++) {
        let baseCount =
          _sheetTableData[i].countArrangeBaseIndexObj[
            this.countArrangeNameList[j]
          ];
        /** 计数顺序 */
        let _index = 0;
        /** 基本序号 */
        let _baseCount = baseCount;
        list
          .filter((item: Sheet.ArrangeItem) => {
            return item.rangeName == this.countArrangeNameList[j];
          })
          .forEach((item: Sheet.ArrangeItem, index: number) => {
            if (item.rangeNameCodeList) {
              _index = 0;
              _baseCount = Number(item.rangeNameCodeList);
              item.rangeNameCode = Number(item.rangeNameCodeList);
            } else {
              _index += 1;
              item.rangeNameCode = _baseCount + _index;
            }
          });
      }
    }

    return _sheetTableData;
  }

  /** 复制黏贴所有人周 */
  copyWeek(currentWeekNum: number) {
    if (this.copyWeekData.length == 0) message.warn("请先复制周");
    for (let i = 0; i < this.sheetTableData.length; i++) {
      let currentWeekList = this.sheetTableData[i].settingDtos.filter(
        (item: any) => moment(item.workDate).weeks() == currentWeekNum
      );

      for (let j = 0; j < currentWeekList.length; j++) {
        let weekDays = moment(currentWeekList[j].workDate).weekday();
        let copyObj = this.copyWeekData.find(
          (item) =>
            moment(item.workDate).weekday() == weekDays &&
            currentWeekList[j].userId == item.userId
        );
        if (copyObj) {
          copyRowClick([currentWeekList[j]], [copyObj], false);
        }
      }
    }
  }

  /** 根据日期获取当前的时间的标准工时 */
  getStandTime(date: string) {
    let initialHour = 37.5;
    for (let i = 0; i < this.standardTimeList.length; i++) {
      let dateNum = new Date(date).getTime();
      let standardTime = new Date(this.standardTimeList[i].startDate).getTime();
      if (dateNum >= standardTime) {
        initialHour = this.standardTimeList[i].initialHour;
      }
    }
    return initialHour;
  }

  // 标准工时
  getHourStart() {
    arrangeService.getHourStart().then((res) => {
      this.standardTime = Number(res.data);
    });
  }

  async init() {
    Promise.all([
      service.commonApiService.dictInfo("sch_vacation_number").then((res) => {
        this.countArrangeNameList = res.data.map((item: any) => item.name);
      }),
      service.commonApiService.dictInfo("sch_week_subtract").then((res) => {
        this.weekArrangeNameList = res.data.map((item: any) => item.name);
      }),
    ]).then((res) => {
      this.isInitEd = true;
      this.getExpectList();
      this.getSheetTableData();
      this.getData();
      this.getArrangeMenu();
      this.notGetArrangeMenu();
      this.getArrangeMeal();
      this.getSchSymbol();
      appStore.HOSPITAL_ID == "gzhd" && this.getHDArrangeMeal();
      this.getAllDeptList();
    });
  }

  /**排班人员信息复制 */
  @observable public sheetTableDataCopy: any = [];
  // 分组护士列表
  @observable public nurseList: any = [];

  @action
  async setNurseList() {
    try {
      this.nurseId = "";
      if (selectViewModal.params.group == "") {
        let res1 = await api.personnelSettingApiService.getScheduler(
          selectViewModal.params.deptCode || ""
        );
        if (res1.data) {
          this.nurseList = res1.data;
        }
        return;
      }
      const res2 = await api.personnelSettingApiService.getById(
        selectViewModal.params.group
      );
      if (res2.data) {
        this.nurseList = res2.data;
      }
    } catch (e) {
      this.nurseList = [];
    }
  }

  /**护士id */
  @observable public nurseId: string = "";

  changeNurseId(e: any) {
    this.nurseId = e;
    this.searchNurseId();
  }

  searchNurseId() {
    if (this.nurseId) {
      const curItem = this.nurseList.find((v: any) => v.id === this.nurseId);
      this.sheetTableData = this.sheetTableDataCopy.filter(
        (v: any) => v.empName === curItem.empName && v.empNo === curItem.empNo
      );
    }
  }
  /*修改table数据*/
   uniteTableData (data: any, field: any){
    let count:number = 0;//重复项的第一项
    let indexCount:number = 1;//下一项
    let data1 = JSON.parse(JSON.stringify(data))
    while (indexCount < data1.length) {
      var item = data1.slice(count, count + 1)[0];//获取没有比较的第一个对象
      if (!item[`${field}rowSpan`]) {
        item[`${field}rowSpan`] = 1;//初始化为1
      }
      if (item[field] === data1[indexCount][field]) {//第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
        item[`${field}rowSpan`]++;
        data1[indexCount][`${field}rowSpan`] = 0;
      } else {
        count = indexCount;
      }
      indexCount++;
    }
    return data1
  }
  getGroupNameSort(data:any){
    let propsList = ["groupName"];
    let tableData: any[] = [];
    const list:any = data.sort((a:any, b:any) => {
      if (a.groupName < b.groupName) {
        return 1;
      } else if (a.groupName > b.groupName) {
        return -1;
      } else {
        return 0;
      }
    });
    propsList.map(item => {
      tableData = this.uniteTableData(list, item);
    });
    let _tableData =cloneJson(tableData)
   return _tableData
  }
}

export const sheetViewModal = new SheetViewModal();
