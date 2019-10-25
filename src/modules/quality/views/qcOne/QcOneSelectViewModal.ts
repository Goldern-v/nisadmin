import { DictItem } from './../../../../services/api/CommonApiService'
import { authStore } from 'src/stores'
import service from 'src/services/api'
import User from 'src/models/User'
import { observable, computed, action } from 'mobx'
import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'

class QcOneSelectViewModal {
  @observable public startDate: string = getCurrentMonthNow()[0].format('YYYY-MM-DD')
  @observable public endDate: string = getCurrentMonthNow()[1].format('YYYY-MM-DD')
  /** 当前科室护士列表 */
  @observable public nurseList: DictItem[] = []
  @observable public wtzlList = [
    {
      code: '护理方面',
      name: '护理方面'
    },
    {
      code: '环境设置',
      name: '环境设置'
    },
    {
      code: '协作科室',
      name: '协作科室'
    },
    {
      code: '管理方面',
      name: '管理方面'
    },
    {
      code: '其他',
      name: '其他'
    },
    {
      code: '无',
      name: '无'
    }
  ]

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

  initNurseList() {
    service.commonApiService.userDictInfo(authStore.selectedDeptCode).then((res) => {
      this.nurseList = res.data
    })
  }
}

export const qcOneSelectViewModal = new QcOneSelectViewModal()
