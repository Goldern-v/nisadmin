import { fileDownload } from './../../../../utils/file/file'
import { format } from 'date-fns'
import { observable, computed, action } from 'mobx'
import { retiredRetireesService } from './services/RetiredRetireesService'
import monnet from 'src/vendors/moment'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
import service from 'src/services/api'

class RetiredRetireesViewModal {
  @observable public bigDeptList = []
  @observable public deptList = []
  @observable public stateList = ['离职', '退休', '离职+退休']

  @observable public selectedBigDept = ''
  @observable public selectedDept = ''
  @observable public selectedDate: any = crrentMonth()
  @observable public selectedStatus = '离职'
  @observable public tableList = []

  @observable public tableLoading = false
  @observable public pageIndex: any = 1
  @observable public pageSize: any = 20
  @observable public total: any = 0

  export() {
    retiredRetireesService.excelNurseLeave(this.postObj).then((res) => {
      fileDownload(res)
    })
  }
  async initData() {
    await Promise.all([
      service.commonApiService.groupByBigDeptInDeptList().then((res) => {
        this.bigDeptList = res.data
      }),
      service.commonApiService.getNursingUnitAll().then((res) => {
        this.deptList = res.data.deptList
        // this.selectedDept = res.data.defaultDept
      })
    ])
  }

  @computed
  get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      deptCode: this.selectedDept,
      bigDept: this.selectedBigDept,
      leaveStartDate: this.selectedDate[0].format('YYYY-MM-DD'),
      leaveEndDate: this.selectedDate[1].format('YYYY-MM-DD'),
      statusType: this.selectedStatus.split('+')
    }
  }

  onload() {
    this.tableLoading = true
    retiredRetireesService.countNurseLeave(this.postObj).then((res) => {
      this.tableList = res.data.list
      this.pageIndex = res.data.pageIndex
      this.pageSize = res.data.pageSize
      this.total = res.data.total
      this.tableLoading = false
    })
  }

  async init() {
    await this.initData()
    await this.onload()
  }
}

export const retiredRetireesViewModal = new RetiredRetireesViewModal()
