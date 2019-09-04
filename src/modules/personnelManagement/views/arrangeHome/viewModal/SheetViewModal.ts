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

  getAllCell() {
    let cellList = []
    for (let i = 0; i < this.sheetTableData.length; i++) {
      for (let j = 0; j < this.sheetTableData[i]!.settingDtos.length; j++) {
        cellList.push(this.sheetTableData[i].settingDtos[j])
      }
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
      isTwoDaysAgo: dateDiff(cellObj && cellObj.workDate, monnet().format('YYYY-MM-DD')) > 2,
      isExpectedScheduling: cellObj.statusType == '1',
      isAddWordTime:
        cellObj.effectiveTimeOld && cellObj.effectiveTime && cellObj.effectiveTimeOld < cellObj.effectiveTime,
      isReduceWordTime:
        cellObj.effectiveTimeOld && cellObj.effectiveTime && cellObj.effectiveTimeOld > cellObj.effectiveTime,
      isSelected: this.selectedCell == cellObj
    }
    return cellConfig
  }

  /** 重置排班 */
  cleanAllCell() {
    let allCell = this.getAllCell()
    for (let cell of allCell) {
      cleanCell(cell)
    }
  }

  getSheetTableData() {
    // if (localStorage.sheetTableData_dev) {
    //   this.sheetTableData = JSON.parse(localStorage.sheetTableData_dev)
    //   this.allCell = this.getAllCell()
    //   return
    // }
    this.tableLoading = true
    arrangeService.findCreateOrUpdate().then((res) => {
      this.tableLoading = false
      this.dateList = this.getDateList()
      this.tableLoading = false
      this.sheetTableData = res.data.setting
      this.remark = res.data.remark
      this.allCell = this.getAllCell()
      localStorage.sheetTableData_dev = JSON.stringify(this.sheetTableData)
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

  saveSheetTableData() {
    this.tableLoading = true
    arrangeService.saveOrUpdate().then((res) => {
      message.success('保存成功')
      this.getSheetTableData()
    })
  }

  init() {
    this.getSheetTableData()
    this.getArrangeMenu()
    this.getArrangeMeal()
    this.getSchSymbol()
  }
}

export const sheetViewModal = new SheetViewModal()
