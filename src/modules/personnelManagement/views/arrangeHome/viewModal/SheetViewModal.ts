import { observable, computed, action } from 'mobx'
import { selectViewModal } from './SelectViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import moment from 'moment'
/** 用于存放排班表等基础数据 */
class SheetViewModal {
  @observable public sheetTableData = [
    {
      工号: '0020',
      姓名: '王大锤',
      层级: '层级',
      职称: '职称',
      list: [
        [
          {
            name: 'A班'
          },
          {
            name: 'B班'
          }
        ],
        [
          {
            name: 'A班'
          }
        ],
        []
      ]
    }
  ]

  /** 时间段 */
  @computed
  public get dateList() {
    let days = []
    let dayDiff = dateDiff(selectViewModal.startDate, selectViewModal.endDate)
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(
          moment(selectViewModal.startDate)
            .add(i, 'd')
            .format('YYYY-MM-DD')
        )
      }
    }
    return days
  }
}

export const sheetViewModal = new SheetViewModal()
