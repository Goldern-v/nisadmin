import { fileDownload } from '../../../../utils/file/file'
import { format } from 'date-fns'
import { observable, computed, action } from 'mobx'
import { retiredRetireesService } from './services'
import monnet from 'src/vendors/moment'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
import service from 'src/services/api'
import { appStore, authStore } from "src/stores";

class RetiredRetireesViewModal {
  // @observable public deptList = []
  @observable public deptAllList = []
  // @observable public stateList = ['离职', '退休', '离职+退休']

  // @observable public selectedDept = ['全部']
  @observable public deptCode = authStore.isDepartment ? '' : authStore.selectedDeptCode //科室
  @observable public selectedDate: any = crrentMonth()
  @observable public keyWord = ''
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
    // 旧的代码是  getNursingUnitSelf
    await service.commonApiService.getNursingUnitAll().then((res) => {
      this.deptAllList = res.data.deptList || []
      // this.selectedDept = res.data.defaultDept
    })
  }

  @computed
  get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      currentDepartmentName: this.deptCode,
      startDateBeginIndex: this.selectedDate[0] ? this.selectedDate[0].format('YYYY-MM-DD') : '',
      startDateEndIndex: this.selectedDate[1] ? this.selectedDate[1].format('YYYY-MM-DD'): '',
      empNo: this.keyWord
    }
  }

  onload() {
    this.tableLoading = true
    retiredRetireesService.nurseTransferQuery(this.postObj).then((res) => {
      this.tableList = res.data.list
      this.pageIndex = res.data.pageIndex
      this.pageSize = res.data.pageSize
      this.total = res.data.totalCount
      this.tableLoading = false
    })
  }

  async init() {
    await this.initData()
    await this.onload()
  }
}

export const retiredRetireesViewModal = new RetiredRetireesViewModal()
