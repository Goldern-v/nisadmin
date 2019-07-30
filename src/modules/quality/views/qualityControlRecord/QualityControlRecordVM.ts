import { observable, computed, action, reaction } from 'mobx'
import { qualityControlRecordApi, NurseQuery } from './api/QualityControlRecordApi'
import { authStore } from 'src/stores'
import moment from 'moment'

class QualityControlRecordVM {
  /** 筛选列表 */
  @observable public formSelectList: any = []
  @observable public stateSelectList: any = []
  @observable public filterDeptList: any = []
  /** 筛选条件 */
  @observable public filterDate: any = [moment(moment().format('YYYY-MM') + '-01'), moment()]
  @observable public filterForm: any = ''
  @observable public filterState: any = ''
  @observable public filterDeptCode: any = ''

  async init() {
    this.filterForm = ''
    this.filterState = ''
    this.filterDeptCode = ''
    this.filterDate = [moment(moment().format('YYYY-MM') + '-01'), moment()]

    await Promise.all([
      qualityControlRecordApi.qcRoleCodeSelf().then((res: any) => {
        this.formSelectList = res.data
      }),
      qualityControlRecordApi.dictChainNode().then((res: any) => {
        this.stateSelectList = res.data
      }),
      qualityControlRecordApi.qcWardCodeList().then((res) => {
        if (authStore.isDepartment) {
          this.filterDeptCode = ''
        } else {
          this.filterDeptCode = res.data.defaultDept
        }
        this.filterDeptList = res.data.deptList
      })
    ])
  }
}

export const qualityControlRecordVM = new QualityControlRecordVM()
