import { observable, computed, action } from 'mobx'
import moment from 'moment'
class WardRegisterViewModal {
  @observable public startDate = ''
  @observable public endDate = ''
  @observable public classes = ''

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
}

export const wardRegisterViewModal = new WardRegisterViewModal()
