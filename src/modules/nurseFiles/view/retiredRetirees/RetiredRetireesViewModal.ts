import { appStore } from 'src/stores';
import { fileDownload } from './../../../../utils/file/file'
import { observable, computed, action } from 'mobx'
import { retiredRetireesService } from './services/RetiredRetireesService'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
import service from 'src/services/api'
import * as types from 'src/libs/types'

class RetiredRetireesViewModal {
  @observable public bigDeptList = []
  @observable public deptList = []
  @observable public stateList = ['离职', '退休', '离职+退休']

  @observable public selectedBigDept = ''
  @observable public selectedDept = ['全部']
  @observable public selectedDate: any = crrentMonth()
  @observable public selectedStatus = '离职'
  @observable public tableList = []
  /**查询条件 by虎门 */
  @observable public query: types.Obj = {
    bigDept: '',
    deptCodes: ['全部'],
    selectedDate: crrentMonth(),
    selectedStatus: '离职',
    nurseHierarchy: '', //层级：
    newTitle: '', //职称
    goHospitalWorkDateYearGe: '', //在院工龄大于等于
    goHospitalWorkDateYearLe: '', //在院工龄小于等于
    takeWorkYearGe: '', //工龄大于等于
    takeWorkYearLe: '', //工龄小于等于
  }

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
      service.commonApiService.getBigDeptListSelfList().then((res) => {
        this.bigDeptList = res.data || []
      }),
      service.commonApiService.getNursingUnitSelf().then((res) => {
        this.deptList = res.data.deptList || []
        // this.selectedDept = res.data.defaultDept
      })
    ])
  }

  @computed
  get postObj() {
    if ('dghm' === appStore.HOSPITAL_ID) {
      const {selectedDate, selectedStatus, ...other } = this.query 
      return {
        ...other,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        leaveStartDate: selectedDate[0].format('YYYY-MM-DD'),
        leaveEndDate: selectedDate[1].format('YYYY-MM-DD'),
        statusType: selectedStatus.split('+')
      }
    }
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      deptCodes: this.selectedDept,
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
      this.total = res.data.totalCount
      this.tableLoading = false
    })
  }

  /** 修改病区联动科室选择 */
  async onChangeBigDept(bigDeptCode: any) {
    if (bigDeptCode == '') {
      await service.commonApiService.getNursingUnitSelf().then((res) => {
        /** 默认全部 */
        this.deptList = res.data.deptList || []
        this.selectedDept = ['全部']
      })
    } else {
      await service.commonApiService.groupByDeptInDeptList(bigDeptCode).then((res) => {
        /** 默认全部 */
        this.deptList = (res.data || []).map((item: any) => ({ name: item.deptName, code: item.deptCode }))
        this.selectedDept = ['全部']
      })
    }
    this.onload()
  }
  async onChangeBigDept1(bigDeptCode: any) {
    if (bigDeptCode == '') {
      await service.commonApiService.getNursingUnitSelf().then((res) => {
        /** 默认全部 */
        this.deptList = res.data.deptList || []
        this.query.deptCodes = ['全部']
      })
    } else {
      await service.commonApiService.groupByDeptInDeptList(bigDeptCode).then((res) => {
        /** 默认全部 */
        this.deptList = (res.data || []).map((item: any) => ({ name: item.deptName, code: item.deptCode }))
        this.query.deptCodes = ['全部']
      })
    }
    this.onload()
  }
  async init() {
    await this.initData()
    await this.onload()
  }
}

export const retiredRetireesViewModal = new RetiredRetireesViewModal()
