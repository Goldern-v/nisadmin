import { observable, computed, action, reaction } from 'mobx'
import { qualityControlRecordApi, NurseQuery } from './api/QualityControlRecordApi'
import { authStore } from 'src/stores'
import moment from 'moment'

class QualityControlRecordVM {
  /** 筛选列表 */
  @observable public formSelectList: any = []
  @observable public stateSelectList: any = []
  @observable public filterDeptList: any = []
  @observable public filterLevelList: any = [
    {
      code: 2,
      name: '二级质控'
    },
    {
      code: 3,
      name: '三级质控'
    }
  ]
  /** 筛选条件 */
  @observable public filterDate: any = [moment(moment().format('YYYY-MM') + '-01'), moment()]
  @observable public filterForm: any = ''
  @observable public filterState: any = ''
  @observable public filterDeptCode: any = ''
  @observable public level: any = 3
  @observable public readWay: any = 1
  @observable public allData: any = {}

  async init() {
    this.filterForm = ''
    this.filterState = ''
    this.filterDeptCode = ''
    this.readWay = 1
    this.filterDate = [moment(moment().format('YYYY-MM') + '-01'), moment()]
    this.allData = {}
    await Promise.all([
      qualityControlRecordApi.qcRoleCodeSelf().then((res: any) => {
        this.formSelectList = res.data
      }),
      qualityControlRecordApi.dictChainNode().then((res: any) => {
        this.stateSelectList = res.data
      }),
      qualityControlRecordApi.qcWardCodeList().then((res) => {
        if (authStore.isDepartment) {
          this.filterDeptCode = res.data.deptList[0] && res.data.deptList[0].code
        } else {
          this.filterDeptCode = res.data.defaultDept
        }
        this.filterDeptList = res.data.deptList
      })
    ])
  }
}

export const qualityControlRecordVM = new QualityControlRecordVM()
