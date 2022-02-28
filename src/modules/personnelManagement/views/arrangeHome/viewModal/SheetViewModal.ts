import service from "src/services/api/index";
import { cloneJson } from "./../../../../../utils/json/clone";
import { appStore, authStore } from "./../../../../../stores/index";
import { SymbolItem, ArrangeItem } from "./../types/Sheet";
import { observable, computed, action } from "mobx";
import { selectViewModal } from "./SelectViewModal";
import { notSelectViewModal } from "../page/notRelease/components/SelectViewModal";
import { dateDiff } from "src/utils/date/dateDiff";
import moment from "moment";
import { arrangeService } from "../services/ArrangeService";
import { notArrangeService } from "../services/notReleaseService";
import monnet from "src/vendors/moment";
import { message } from "src/vendors/antd";
import {
  cleanCell,
  copyRowClick
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
  @observable public schSymbolList: SymbolItem[] = [];
  /** 选中的格子 */
  @observable public selectedCell: ArrangeItem = {};
  // 选中的格子列表（只用来批量赋值） 东莞横沥需要多个格子一起赋值
  @observable public selectedCellList: ArrangeItem[] = [];
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
  
  getAllDeptList() {
    arrangeService.getAllDeptList().then((res: any) => {
      this.deptList = res.data.deptList || []
    })
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
      cellList = cellList.filter(item => {
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
      list = this.allCell.filter(item => {
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
      list = this.allCell.filter(item => {
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
        item =>
          moment(item.workDate).weeks() == weekIndex &&
          moment(item.workDate).isoWeekday() == i + 1
      );
    }
    return weekRow;
  }

  /** 解析cellobj 获取额外信息 */
  analyseCell(cellObj: ArrangeItem): any {
    if (!cellObj) return {};

    const cellConfig = {
      /** 不可编辑 */
      isTwoDaysAgo: cellObj.status == "1",
      isExpectedScheduling: cellObj.statusType == "1",
      isAddWordTime: appStore.hisAdapter({
        hj: () =>
          cellObj.effectiveTimeOld &&
          cellObj.effectiveTime &&
          cellObj.effectiveTimeOld < cellObj.effectiveTime,
        dghl: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1",
        fqfybjy: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1",
        wh: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1",
        gxjb: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1",
        fssdy: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1",
        fsxt: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "1"
      }),
      isReduceWordTime: appStore.hisAdapter({
        hj: () =>
          cellObj.effectiveTimeOld &&
          cellObj.effectiveTime &&
          cellObj.effectiveTimeOld > cellObj.effectiveTime,
        wh: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "2",
        gxjb: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "2",
        fssdy: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "2",
        fsxt: () =>
          (cellObj.schAddOrSubs &&
            cellObj.schAddOrSubs.length &&
            cellObj.schAddOrSubs[0].statusType) == "2"
      }),
      isJiJiaTime: appStore.hisMatch({
        map: {
          jmfy: cellObj.schJiJias && cellObj.schJiJias.length > 0,
          default: false
        }
      }),
      isSelected:
        this.selectedCell == cellObj || this.copyCellList.includes(cellObj) || this.selectedCellList.includes(cellObj),
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
    return allCell.find(item => {
      return item.userId == userId && item.workDate == date;
    });
  }

  /** 根据姓名和时间获取排班格子 */
  getCellObjByName(empName: string, date: string) {
    let allCell = this.getAllCell(true);
    return allCell.find(item => {
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

  getSheetTableData() {
    if (!this.isInitEd) return this.init();
    this.tableLoading = true;
    return arrangeService.findCreateOrUpdate().then(async res => {
      this.tableLoading = false;
      this.dateList = this.getDateList();
      this.getExpectList();
      this.getExpectAsList()
      if (['fssdy'].includes(appStore.HOSPITAL_ID)) {
        this.getHourStart()
      }
      if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == "fqfybjy" || appStore.HOSPITAL_ID == "gxjb") {
        let { data: countObj } = await arrangeService.listRangeNameCode(
          res.data.setting
        );

        const {
          data: standardTimeList
        } = await arrangeService.schInitialHourGetListByDate({
          wardCode: authStore.selectedDeptCode,
          startDate: selectViewModal.params.startTime,
          endDate: selectViewModal.params.endTime
        });
        this.standardTimeList = standardTimeList;

        this.sheetTableData = this.handleSheetTableData(
          res.data.setting,
          countObj
        );
      } else {
        this.sheetTableData = this.handleSheetTableData(res.data.setting, {});
      }
      this.remark = res.data.remark;
      this.allCell = this.getAllCell(true);
    });
  }
  // 未发布排班记录查询 
  getData() {
    if (!this.isInitEd) return this.init();
    this.tableLoading = true;
    if (!notSelectViewModal.params.startTime) return Promise.resolve(() => { })
    return notArrangeService.countSettingByStatus().then((res: { code: string; data: any; }) => {
      this.dateList = this.notGetDateList();
      this.tableLoading = false;
      if (res.code === '200') {
        this.notSheetTableData = this.handleSheetTableData(res.data, {})
      }
    })
  }

  @computed
  get isPush() {
    let allCell = this.getAllCell(false);
    return allCell.some((item: any) => item.status == "1");
  }

  /** 同步排班人员数据 */
  findSysnNurse() {
    this.tableLoading = true;
    return arrangeService.findSysnNurse().then(res => {
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
    return arrangeService.copyPrevSettingRange(copyStatus).then(async res => {
      this.tableLoading = false;
      this.dateList = this.getDateList();

      let { data: countObj } = await arrangeService.listRangeNameCode(
        res.data.setting
      );
      let newList = res.data.setting.map((item: any,index:any) => {
        return {
          ...this.sheetTableData[index],
          settingDtos:item.settingDtos
        }
      })
      this.sheetTableData = this.handleSheetTableData(
        // res.data.setting,
        newList,
        countObj
      );
      this.remark = res.data.remark;
      this.allCell = this.getAllCell(true);
    });
  }

  getArrangeMenu() {
    arrangeService.getArrangeMenu().then(res => {
      this.arrangeMenu = res.data;
    });
  }
  // 未发布班排模块
  notGetArrangeMenu() {
    notArrangeService.getArrangeMenu().then(res => {
      this.notArrangeMenu = res.data;
    });
  }

  getArrangeMeal() {
    arrangeService.getArrangeMeal().then(res => {
      this.arrangeMeal = res.data;
    });
  }

  getHDArrangeMeal() {
    arrangeService.getHDArrangeMeal().then(res => {
      this.hdArrangeMeal = res.data;
    });
  }

  getSchSymbol() {
    arrangeService.getSchSymbol().then(res => {
      this.schSymbolList = res.data;
    });
  }

  getExpectList() {
    return arrangeService.getByDeptCodeAndDate().then(res => {
      this.expectList = res.data;
      this.experNumber = res.data.length
    });
  }

  /** 申请加减班 */
  getExpectAsList() {
    return arrangeService.schExpectAddOrSubGetByDeptCodeAndDate().then(res => {
      this.expectAsClassList = res.data.reduce((total: any, current: any) => {
        total.push(
          ...current.schExpects.map((item: any) => ({
            week: current.week,
            ...item
          }))
        );
        return total;
      }, []);
      this.ExpectAsNumber = this.expectAsClassList.length
    });
  }

  saveSheetTableData(status: "0" | "1" | undefined) {
    if (document.querySelector(".public-hour-warning")) {
      return message.warning("存在公休天数小于0的护士，请修正");
    }
    let urlName = appStore.HOSPITAL_ID == 'nys' ? 'schedulingNys' : 'scheduling'
    this.tableLoading = true;
    return arrangeService.saveOrUpdate(status, urlName).then(res => {
      if (status == "0") message.success("保存成功");
      if (status == "1") message.success("推送成功");
      this.getSheetTableData();
    });
  }

  /** 处理后台过来的表格数据，增加一些计算结果 公休节休计数等 */
  handleSheetTableData(sheetTableData: any, countObj: any = {}) {

    /** for 优化速度 */
    let _sheetTableData = cloneJson(sheetTableData);
    for (let i = 0; i < _sheetTableData.length; i++) {
      /** 当前结余，公休，南医三当前积假，节修时间, 用于推导实际时间 */
      let current_balanceHour = 0;
      let current_holidayHourNys = 0;
      let current_holidayHour = 0;
      let current_publicHour = 0;
      current_holidayHourNys +=
        Number(_sheetTableData[i].thisWeekHoliday) || 0;

      for (let j = 0; j < _sheetTableData[i].settingDtos.length; j++) {
        /** 添加姓名 */
        _sheetTableData[i].settingDtos[j].empName = _sheetTableData[i].empName;

        current_balanceHour +=
          Number(_sheetTableData[i].settingDtos[j].effectiveTime) || 0;

        current_holidayHour +=
          _sheetTableData[i].settingDtos[j].rangeName == "节休" ? 1 : 0;
        current_publicHour +=
          _sheetTableData[i].settingDtos[j].rangeName == "公休" ? 1 : 0;

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
          .filter((item: ArrangeItem) => {
            return item.rangeName == this.countArrangeNameList[j];
          })
          .forEach((item: ArrangeItem, index: number) => {
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

    // console.log(sheetTableData, "sheetTableData");
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
          item =>
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
    // console.log(this.standardTimeList, "this.standardTimeList");
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
    arrangeService.getHourStart().then(res => {
      this.standardTime = Number(res.data)
    })
  }

  async init() {
    Promise.all([
      service.commonApiService.dictInfo("sch_vacation_number").then(res => {
        this.countArrangeNameList = res.data.map((item: any) => item.name);
      }),
      service.commonApiService.dictInfo("sch_week_subtract").then(res => {
        this.weekArrangeNameList = res.data.map((item: any) => item.name);
      })
    ]).then(res => {
      this.isInitEd = true;
      this.getExpectList();
      this.getSheetTableData();
      this.getData()
      this.getArrangeMenu();
      this.notGetArrangeMenu()
      this.getArrangeMeal();
      this.getSchSymbol();
      appStore.HOSPITAL_ID == 'gzhd' && this.getHDArrangeMeal();
      this.getAllDeptList()
    });
  }
}

export const sheetViewModal = new SheetViewModal();
