import { action, observable, computed } from 'mobx'
import { appStore } from 'src/stores'
import { trainingResultService } from './../api/TrainingResultService'
import { fileDownload } from 'src/utils/file/file'

class TrainingResultModel {

  private defaultQuery = (): any => {
    return JSON.parse(JSON.stringify({
      cetpId: '',//计划id
      bigDeptCode: '' as string | number,//片区code
      deptCode: '' as string | number,//病区code
      empTitle: '' as string | number,//职称
      taskStatus: '' as string | number,//完成情况
      keyWord: '', //关键字
      pageIndex: 1,
      pageSize: 20,
    }))
  }

  @observable iptVisible = false //带有defaultValue属性的组件渲染与否
  @observable baseInfo = {} as any //基本信息
  @observable query = this.defaultQuery() as any //列表请求参数
  @observable tableData = [] as any[] //列表数据
  @observable tableDataTotal = 0 //列表数据
  @observable loading = false //页面载入状态
  @observable bigDeptList = [] as any[] //片区列表
  @observable deptListAll = [] as any[] //全部病区列表
  @observable deptList = [] as any[] //病区列表
  @observable titleList = [] as any[] //职称列表
  @observable menuInfo = {} as any

  /**是否为线下签到类型 */
  @computed get isSignType() {
    return !!((this.baseInfo.organizationWay || this.baseInfo.organizationWayName) == '线下')
  }

  @action public init() {
    this.iptVisible = false
    this.baseInfo = {}
    this.menuInfo = {}
    this.tableDataTotal = 0
    this.tableData = []

    this.setQuery({
      ...this.defaultQuery(),
      cetpId: appStore.queryObj.id || ''
    }, true)

    this.deptList = []

    if (this.deptListAll.length <= 0) {
      this.getDeptList()
    } else {
      this.deptList = this.deptListAll.concat()
    }

    if (this.bigDeptList.length <= 0) this.getBigDeptList()

    if (this.titleList.length <= 0) this.getTitleList()

    this.getBaseInfo()
    this.getMenuInfo()
    setTimeout(() => this.iptVisible = true, 100)
  }

  @action public setQuery(newQuery: any, newData?: boolean) {
    this.query = { ...newQuery }
    // console.log({ ...newQuery })
    if (newData) this.getTableData()
  }

  @action public getTableData(
    before?: Function | null,
    success?: Function | null,
    error?: Function | null
  ) {
    before && before()
    this.loading = true

    const successCallback = (res: any) => {
      this.loading = false
      if (res.data) {
        this.tableDataTotal = res.data.totalCount || 0
        this.tableData = res.data.list
        success && success(res.data)
      }
    }

    const errorCallback = () => {
      error && error()
      this.loading = false
    }

    if (appStore.queryObj.editable) {
      trainingResultService
        .queryToScoreDetailList(this.query)
        .then(res => successCallback(res), () => errorCallback())
    } else {
      trainingResultService
        .getTableData(this.query)
        .then(res => successCallback(res), () => errorCallback())
    }

  }

  private getBigDeptList() {
    trainingResultService
      .getBigDeptMentTree()
      .then(res => {
        if (res.data) this.bigDeptList = res.data
      })
  }

  private getDeptList() {
    trainingResultService
      .getAllDeptList()
      .then(res => {
        if (res.data && res.data.deptList) {
          let deptListAll = this.deptList =
            res.data.deptList.map((item: any) => {
              return {
                deptName: item.name,
                depCode: item.code
              }
            })

          this.deptList = deptListAll.concat()
          this.deptListAll = deptListAll.concat()
        }
      })
  }

  private getTitleList() {
    trainingResultService
      .getAllTitles()
      .then(res => {
        if (res.data) this.titleList = res.data
      })
  }

  @action public getBaseInfo(
    before?: Function | null,
    success?: Function | null,
    error?: Function | null
  ) {
    before && before()
    trainingResultService
      .getInfo(appStore.queryObj.id || '')
      .then(res => {
        if (res.data) {
          this.baseInfo = res.data
          success && success(res.data)
        } else {
          error && error()
        }
      }, () => error && error())
  }

  @action public setBaseInfo(newBaseInfo: any) {
    this.baseInfo = { ...newBaseInfo }
  }

  private getMenuInfo() {
    trainingResultService
      .getMenuChain(appStore.queryObj.id || '')
      .then(res => {
        if (res.data) this.menuInfo = res.data
      })
  }

  @action public setLoading(loading: boolean) {
    this.loading = loading
  }

  @action public setDeptList(bigDeptCode: string | number | null) {
    let target = this.bigDeptList
      .find((item: any) => item.depCode == bigDeptCode)

    if (target && target.childList)
      this.deptList = target.childList.concat()
    else
      this.deptList = this.deptListAll.concat()
  }

  /**导出签到信息 */
  @action public handleSignExport() {
    trainingResultService
      .exportSignInInfo(appStore.queryObj.id || '')
      .then(res => fileDownload(res))
  }

  /**导出出勤率统计信息 */
  @action public handleAttendanceExport() {
    trainingResultService
      .exportAttendanceRateStatInfo(appStore.queryObj.id || '')
      .then(res => fileDownload(res))
  }
}

export const trainingResultModel = new TrainingResultModel()