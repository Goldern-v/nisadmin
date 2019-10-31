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
  @observable public revisionList = []

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
      })
  }
}

export const wardRegisterViewModal = new WardRegisterViewModal()
