import { observable, computed, action } from 'mobx'
import { selectViewModal } from './SelectViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import moment from 'moment'
import { arrangeService } from '../services/ArrangeService'
/** 用于存放排班表等基础数据 */
class SheetViewModal {
  @observable public sheetTableData = []

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

  getSheetTableData() {
    arrangeService.findCreateOrUpdate().then((res) => {
      selectViewModal.startTime = res.data.startTime
      selectViewModal.endTime = res.data.endTime
      this.sheetTableData = res.data.schShiftUser
    })
  }

  init() {
    this.getSheetTableData()
  }
}

export const sheetViewModal = new SheetViewModal()
