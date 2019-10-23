import { observable, computed } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import { crrentMonth } from 'src/utils/moment/crrentMonth'

class RecordViewModal {
  @observable public selectedWardRound = '' //查房类型
  @observable public selectedWardRoundText = '全院' //查房类型文字
  @observable public selectedWardRoundArray = [] //查房类型过滤数据
  @observable public WardRoundList = []
  @observable public selectedCheckState = '' //查房状态
  // @observable public selectedCheckStateCode = '' //查房状态名称
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
        let array = res.data.deptList
        array.unshift({
          code: '', name: '全院'
        })
        this.deptList = array.slice()
        this.selectedWardRoundArray = array.slice()
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
    // let data: any = this.checkStateList.find((item: any) => item.code === this.selectedCheckState)
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
    // let data: any = this.checkStateList.find((item: any) => item.code === this.selectedCheckState)
    // let code: any = data ? data.code : ''
    this.tableLoading = true
    checkWardService.getPage(this.postObj).then((res) => {
      let array: any = []
      res.data.page.list.length > 0 && res.data.page.list.map((item: any, index: any) => {
        item.nurseProblem = res.data.srPageItemlist[index].nurseProblem
        item.patientProblem = res.data.srPageItemlist[index].patientProblem
        array.push(item)
      })
      // if (code === '科护士长审核') {
      //   array = array.filter((item: any) => item.patientStatus == '0' && item.nurseStatus == '0')
      // }
      // if (code === '病区处理') {
      //   array = array.filter((item: any) => item.patientStatus !== '0' || item.nurseStatus !== '0')
      // }
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
