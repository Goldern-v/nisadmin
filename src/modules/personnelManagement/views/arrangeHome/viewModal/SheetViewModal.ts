import { cloneJson } from './../../../../../utils/json/clone'
import { appStore } from './../../../../../stores/index'
import { SymbolItem, ArrangeItem } from './../types/Sheet'
import { observable, computed, action } from 'mobx'
import { selectViewModal } from './SelectViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import moment from 'moment'
import { arrangeService } from '../services/ArrangeService'
import monnet from 'src/vendors/moment'
import { message } from 'src/vendors/antd'
import { cleanCell } from '../components/arrangeSheet/cellClickEvent'
/** 用于存放排班表等基础数据 */
class SheetViewModal {
  @observable public sheetTableData: any = []
  /** 期望排班 */
  @observable public expectList: any = []
  @observable public dateList: string[] = []
  @observable public remark: string = ''
  @observable public arrangeMenu = []
  @observable public arrangeMeal = []
  @observable public schSymbolList: SymbolItem[] = []
  /** 选中的格子 */
  @observable public selectedCell: ArrangeItem = {}
  @observable public allCell: any[] = []
  /** 加载状态 */
  @observable public tableLoading: boolean = false

  /** 复制行 */
  @observable public copyRow: any[] = []
  @observable public copyCell: any = null

  /** 是否全部已推送 */
  @observable public isPush: boolean = false
  /** 时间段 */
  getDateList() {
    let days = []
    let dayDiff =
      selectViewModal.params.startTime && selectViewModal.params.endTime
        ? dateDiff(selectViewModal.params.startTime, selectViewModal.params.endTime)
        : 0
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(
          moment(selectViewModal.params.startTime)
            .add(i, 'd')
            .format('YYYY-MM-DD')
        )
      }
    }

    return days
  }

  getAllCell(canEdit: boolean) {
    let cellList = []
    for (let i = 0; i < this.sheetTableData.length; i++) {
      for (let j = 0; j < this.sheetTableData[i]!.settingDtos.length; j++) {
        cellList.push(this.sheetTableData[i].settingDtos[j])
      }
    }
    if (canEdit) {
      cellList = cellList.filter((item) => {
        return !this.analyseCell(item).isTwoDaysAgo
      })
    }
    return cellList
  }
  getNextCell() {
    if (this.selectedCell) {
      let allCell = this.allCell
      let index = allCell.indexOf(this.selectedCell)
      if (index > -1 && index < allCell.length - 1) {
        return allCell[index + 1]
      } else {
        return null
      }
    }
  }

  getSelectCellList(canEdit: boolean) {
    let list: any[] = []
    if (this.selectedCell) {
      let userId = this.selectedCell.userId
      list = this.allCell.filter((item) => {
        return item.userId == userId && (canEdit ? this.analyseCell(item).isTwoDaysAgo == false : true)
      })
    }
    return list
  }

  /** 解析cellobj 获取额外信息 */
  analyseCell(cellObj: ArrangeItem): any {
    if (!cellObj) return {}

    const cellConfig = {
      isTwoDaysAgo: false && cellObj ? moment().isoWeeks() - moment(cellObj && cellObj.workDate).isoWeeks() > 1 : false,
      isExpectedScheduling: cellObj.statusType == '1',
      isAddWordTime: appStore.hisAdapter({
        hj: () => cellObj.effectiveTimeOld && cellObj.effectiveTime && cellObj.effectiveTimeOld < cellObj.effectiveTime,
        wh: () => (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length && cellObj.schAddOrSubs[0].statusType) == '1'
      }),
      isReduceWordTime: appStore.hisAdapter({
        hj: () => cellObj.effectiveTimeOld && cellObj.effectiveTime && cellObj.effectiveTimeOld > cellObj.effectiveTime,
        wh: () => (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length && cellObj.schAddOrSubs[0].statusType) == '2'
      }),
      isSelected: this.selectedCell == cellObj
    }
    return cellConfig
  }

  /** 重置排班 */
  cleanAllCell() {
    let allCell = this.getAllCell(true)
    for (let cell of allCell) {
      cleanCell(cell)
    }
  }

  /** 根据工号和时间获取排班格子 */
  getCellObj(userId: number, date: string) {
    let allCell = this.getAllCell(true)
    return allCell.find((item) => {
      return item.userId == userId && item.workDate == date
    })
  }

  getSheetTableData() {
    this.tableLoading = true
    return arrangeService.findCreateOrUpdate().then((res) => {
      this.tableLoading = false
      this.dateList = this.getDateList()
      this.sheetTableData = this.handleSheetTableData(res.data.setting)
      this.remark = res.data.remark
      this.allCell = this.getAllCell(true)
      this.getIsPush()
    })
  }

  getIsPush() {
    return !this.allCell.some((item: any) => item.status != '1')
  }

  /** 同步排班人员数据 */
  findSysnNurse() {
    this.tableLoading = true
    return arrangeService.findSysnNurse().then((res) => {
      this.tableLoading = false
      this.dateList = this.getDateList()
      this.tableLoading = false
      this.sheetTableData = this.handleSheetTableData(res.data.setting)
      this.remark = res.data.remark
      this.allCell = this.getAllCell(true)
    })
  }
  /** 同步排班人员数据 */
  handleCopy() {
    this.tableLoading = true
    return arrangeService.copyPrevSettingRange().then((res) => {
      // this.tableLoading = false
      // this.dateList = this.getDateList()
      this.tableLoading = false
      let copySheetTableData = this.handleSheetTableData(res.data.setting)

      let _sheetTableData = cloneJson(this.sheetTableData)

      for (let i = 0; i < _sheetTableData.length; i++) {
        if (copySheetTableData[i]) {
          _sheetTableData[i].settingDtos = copySheetTableData[i].settingDtos
        }
      }
      this.sheetTableData = _sheetTableData
      this.allCell = this.getAllCell(true)
    })
  }

  getArrangeMenu() {
    arrangeService.getArrangeMenu().then((res) => {
      this.arrangeMenu = res.data
    })
  }
  getArrangeMeal() {
    arrangeService.getArrangeMeal().then((res) => {
      this.arrangeMeal = res.data
    })
  }
  getSchSymbol() {
    arrangeService.getSchSymbol().then((res) => {
      this.schSymbolList = res.data
    })
  }
  getExpectList() {
    return arrangeService.getByDeptCodeAndDate().then((res) => {
      this.expectList = res.data
    })
  }

  saveSheetTableData(status: '0' | '1') {
    this.tableLoading = true
    return arrangeService.saveOrUpdate(status).then((res) => {
      if (status == '0') message.success('保存成功')
      if (status == '1') message.success('推送成功')
      this.getSheetTableData()
    })
  }
  /** 处理后台过来的表格数据，增加一些计算结果 */
  handleSheetTableData(sheetTableData: any) {
    for (let i = 0; i < sheetTableData.length; i++) {
      /** 当前结余，公休，节修时间, 用于推导实际时间 */
      let current_balanceHour = 0
      let current_holidayHour = 0
      let current_publicHour = 0
      for (let j = 0; j < sheetTableData[i].settingDtos.length; j++) {
        current_balanceHour += Number(sheetTableData[i].settingDtos[j].effectiveTime) || 0
        current_holidayHour += sheetTableData[i].settingDtos[j].rangeName == '节休' ? 1 : 0
        current_publicHour += sheetTableData[i].settingDtos[j].rangeName == '公休' ? 1 : 0
      }
      sheetTableData[i].current_balanceHour = current_balanceHour
      sheetTableData[i].current_holidayHour = current_holidayHour
      sheetTableData[i].current_publicHour = current_publicHour
    }
    return sheetTableData
  }

  init() {
    this.getExpectList()
    this.getSheetTableData()
    this.getArrangeMenu()
    this.getArrangeMeal()
    this.getSchSymbol()
  }
}

export const sheetViewModal = new SheetViewModal()
