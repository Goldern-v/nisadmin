import { observable, computed } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import { crrentMonth } from 'src/utils/moment/crrentMonth'

class RecordViewModal {
  @observable public selectedWardRound = '' //查房类型
  @observable public WardRoundList = []
  @observable public selectedCheckState = '' //查房状态
  @observable public checkStateList = []
  @observable public selectedDept = '' //科室
  @observable public deptList = []
  @observable public selectedDate: any = crrentMonth() // 查房日期
  @observable public tableList = [] // 表格内容
  @observable public problem = [] // 问题详情
  @observable public tableLoading = false 
  @observable public pageIndex: any = 1
  @observable public pageSize: any = 20
  @observable public total: any = 0

  async initData() {
    await Promise.all([
      //科室
      checkWardService.getNursingUnitAll().then((res) => {
        this.deptList = res.data.deptList
      }),
      //查房类型
      checkWardService.dictInfo().then((res) => {
        this.WardRoundList = res.data
      }),
      //查房状态
      checkWardService.dictStatus().then((res) => {
        this.checkStateList = res.data
      })     
    ])
  }

  @computed
  get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      wardCode: this.selectedDept,
      type: this.selectedWardRound,
      status: this.selectedCheckState,
      beginDate: `${this.selectedDate[0].format('YYYY-MM-DD')} 00:00`,
      endDate: `${this.selectedDate[1].format('YYYY-MM-DD')} 23:59`,
    }
  }

  onload() {
    this.tableLoading = true
    checkWardService.getPage(this.postObj).then((res) => {
      let array:any = []
      res.data.page.list.length > 0 && res.data.page.list.map((item:any, index:any) => {
        item.nurseProblem =  res.data.srPageItemlist[index].nurseProblem
        item.patientProblem =  res.data.srPageItemlist[index].patientProblem
        array.push(item)
      })
      this.tableList = array
      this.pageIndex = res.data.page.pageIndex
      this.pageSize = res.data.page.pageSize
      this.total = res.data.page.totalCount
      this.problem = res.data.srPageItemlist
      this.tableLoading = false
    })
  }

  async init() {
    await this.initData()
    await this.onload()
  }
}

export const recordViewModal = new RecordViewModal()
