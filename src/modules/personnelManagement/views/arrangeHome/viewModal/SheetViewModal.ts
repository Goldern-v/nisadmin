import { observable, computed, action } from 'mobx'
import { selectViewModal } from './SelectViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import moment from 'moment'
import { arrangeService } from '../services/ArrangeService'
/** 用于存放排班表等基础数据 */
class SheetViewModal {
  @observable public sheetTableData: any = []
  @observable public remark: string = ''
  @observable public arrangeMenu = []
  @observable public arrangeMeal = []
  /** 选中的格子 */
  @observable public selectedCell: any = {}
  @observable public allCell: any[] = []
  /** 时间段 */
  @computed
  public get dateList() {
    let days = []
    let dayDiff = dateDiff(selectViewModal.startTime, selectViewModal.endTime)
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(
          moment(selectViewModal.startTime)
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

  getSheetTableData() {
    arrangeService.findCreateOrUpdate().then((res) => {
      this.sheetTableData = res.data.setting
      this.remark = res.data.remark
      this.allCell = this.getAllCell()
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

  saveSheetTableData() {
    arrangeService.saveOrUpdate()
  }

  init() {
    this.getSheetTableData()
    this.getArrangeMenu()
    this.getArrangeMeal()
  }
}

export const sheetViewModal = new SheetViewModal()
