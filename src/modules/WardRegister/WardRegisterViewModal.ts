import { wardRegisterService } from 'src/modules/WardRegister/services/WardRegisterService'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import { observable, computed, action } from 'mobx'
import moment from 'moment'
import service from 'src/services/api'
class WardRegisterViewModal {
  @observable public startDate: string = getCurrentMonthNow()[0].format('YYYY-MM-DD')
  @observable public endDate: string = getCurrentMonthNow()[1].format('YYYY-MM-DD')
  @observable public classesList = []
  @observable public selectedClasses = ''
  /** 时间段区间 */
  @observable public revisionList: any[] = []

  @observable public selectedRevisionIndex: any = ''

  get selectedRevision() {
    return this.selectedRevisionIndex !== '' ? this.revisionList[this.selectedRevisionIndex] : null
  }

  /** 时间控件处理 */
  getDateOptions(): any {
    return {
      value: [this.startDate ? moment(this.startDate) : null, this.endDate ? moment(this.endDate) : null],
      onChange: (date: any[]) => {
        this.startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
        this.endDate = date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
      }
    }
  }

  init(recordCode: string) {
    service.commonApiService.multiDictInfo(['sch_range_shift_type']).then((res) => {
      this.classesList = res.data.sch_range_shift_type.filter((item: any) => item.name !== '休假')
    })
    wardRegisterService
      .qcRegisterItemGetRevisionList({
        recordCode,
        wardCode: '10802'
      })
      .then((res) => {
        this.revisionList = res.data
        this.selectedRevisionIndex = this.revisionList.length - 1
        this.endDate = moment().format('YYYY-MM-DD')
        this.startDate = this.selectedRevision.beginDate
      })
  }

  onRevisionIndexChange(index: number) {
    if (index == 0) {
      this.endDate = this.revisionList[index].endDate
      // this.startDate = moment(this.endDate)
    } else if (index == this.revisionList.length - 1) {
    } else {
    }
  }
}

export const wardRegisterViewModal = new WardRegisterViewModal()
