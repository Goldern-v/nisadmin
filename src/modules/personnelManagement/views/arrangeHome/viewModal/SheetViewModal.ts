import service from "src/services/api/index";
import { cloneJson } from "./../../../../../utils/json/clone";
import { appStore } from "./../../../../../stores/index";
import { SymbolItem, ArrangeItem } from "./../types/Sheet";
import { observable, computed, action } from "mobx";
import { selectViewModal } from "./SelectViewModal";
import { dateDiff } from "src/utils/date/dateDiff";
import moment from "moment";
import { arrangeService } from "../services/ArrangeService";
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
  /** 期望排班 */
  @observable public expectList: any = [];
  /** 申请加减班 */
  @observable public expectAsClassList: any = [];
  @observable public dateList: string[] = [];
  @observable public remark: string = "";
  @observable public arrangeMenu: any[] = [];
  @observable public arrangeMeal = [];
  @observable public schSymbolList: SymbolItem[] = [];
  /** 选中的格子 */
  @observable public selectedCell: ArrangeItem = {};
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
        wh: () =>
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
            cellObj.schAddOrSubs[0].statusType) == "2"
      }),
      isSelected:
        this.selectedCell == cellObj || this.copyCellList.includes(cellObj)
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
      if (appStore.HOSPITAL_ID == "wh") {
        let { data: countObj } = await arrangeService.listRangeNameCode(
          res.data.setting
        );
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
  handleCopy() {
    this.tableLoading = true;
    return arrangeService.copyPrevSettingRange().then(async res => {
      this.tableLoading = false;
      this.dateList = this.getDateList();

      let { data: countObj } = await arrangeService.listRangeNameCode(
        res.data.setting
      );
      this.sheetTableData = this.handleSheetTableData(
        res.data.setting,
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
  getArrangeMeal() {
    arrangeService.getArrangeMeal().then(res => {
      this.arrangeMeal = res.data;
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
    });
  }

  saveSheetTableData(status: "0" | "1" | undefined) {
    if (document.querySelector(".public-hour-warning")) {
      return message.warning("存在公休天数小于0的护士，请修正");
    }
    this.tableLoading = true;
    return arrangeService.saveOrUpdate(status).then(res => {
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
      /** 当前结余，公休，节修时间, 用于推导实际时间 */
      let current_balanceHour = 0;
      let current_holidayHour = 0;
      let current_publicHour = 0;
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
          _sheetTableData[i].settingDtos[j].rangeName == "公休" &&
          _sheetTableData[i].settingDtos[j].workDate.includes("-01-01")
        ) {
          if (!_sheetTableData[i].settingDtos[j].rangeNameCodeList) {
            _sheetTableData[i].settingDtos[j].rangeNameCodeList = 1;
          }
        }
      }
      _sheetTableData[i].current_balanceHour = current_balanceHour;
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
      this.getArrangeMenu();
      this.getArrangeMeal();
      this.getSchSymbol();
    });
  }
}

export const sheetViewModal = new SheetViewModal();
