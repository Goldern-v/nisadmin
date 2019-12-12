import { DictItem } from './../../../../services/api/CommonApiService'
import { authStore } from 'src/stores'
import service from 'src/services/api'
import User from 'src/models/User'
import { observable, computed, action } from 'mobx'
import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'
import AuthStore from 'src/stores/AuthStore'

export const statusListAuth = (authStore: AuthStore) => {
  return [
    { name: '已保存', code: '0', disabled: authStore.isSupervisorNurse || authStore.isDepartment },
    { name: '病区已提交', code: '1', disabled: authStore.isDepartment },
    { name: '科护长已提交', code: '2' },
    { name: '已归档', code: '3' },
  ]
}

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
      code: '无',
      name: '无'
    }
  ]

  @observable public statusList = [
    { name: '已保存', code: '0', disabled: authStore.isSupervisorNurse || authStore.isDepartment },
    { name: '病区已提交', code: '1', disabled: authStore.isDepartment },
    { name: '科护长已提交', code: '2' },
    { name: '已归档', code: '3' },
  ]

  @observable public hrType = [
    {
      code: '1',
      name: '岗位变动'
    },
    {
      code: '2',
      name: '片区内调动'
    },
    {
      code: '3',
      name: '临时借调'
    }
  ]

  @computed get statusObj() {
    // console.log('statusObj')
    let obj = {} as any
    for (let i = 0; i < this.statusList.length; i++) {
      let item = this.statusList[i]
      obj[item.code] = item.name
    }
    return obj
  }

  @observable public wardCode = authStore.isDepartment ? '' : authStore.selectedDeptCode
  @computed get wardName() {
    let target = (authStore.deptList || []).find((item: any) => item.code === this.wardCode)
    if (target) return target.name
    return ''
  }
  @action public setWardCode = (wardCode: string) => {
    this.wardCode = wardCode
    if (wardCode) authStore.selectDeptCode(wardCode)
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

  @action public initWardCode = () => {
    if (authStore.deptList) {
      let target = authStore.deptList.find((item: any) => item.code === this.wardCode)

      if (!target) this.wardCode = authStore.isDepartment ? '' : authStore.selectedDeptCode
    }

    return this.wardCode
  }

  initNurseList() {
    service.commonApiService.userDictInfo(authStore.selectedDeptCode).then((res) => {
      this.nurseList = res.data
    })
  }
}

export const qcOneSelectViewModal = new QcOneSelectViewModal()
