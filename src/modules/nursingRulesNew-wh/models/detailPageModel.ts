import { action, observable, computed } from 'mobx'
import { nursingRulesApiService } from './../api/nursingRulesNewService'

export class DetailPageModel {
  public defautInfo = {
    bookId: '',
    coverPath: '',
    bookName: '',
    bookBrief: '',
    upLoaderEmpNo: '',
    upLoaderEmpName: '',
    upLoadTime: '',
    auditorEmpNo: '',
    auditorEmpName: '',
    auditTime: '',
    status: '',
    enabled: 1,
    currentVersion: ''
  }
  //基本信息
  @observable public baseInfo = { ...this.defautInfo } as any

  @observable baseLoading = false as boolean
  //目录
  @observable public indexList = [] as any
  @observable public indexLoading = false
  //我的收藏
  @observable public favorList = [] as any
  @observable public favorLoading = false
  //修订记录
  @observable public repairList = [] as any
  @observable public repairLoading = false
  //待审核目录
  @observable public auditList = [] as any
  @observable public auditLoading = false
  //当前版本书籍收藏列表
  @computed get currentVersionFavorList() {
    return this.favorList.filter((item: any) => item.version == this.baseInfo.currentVersion)
  }

  @action public inited(query: any) {
    this.indexList = []
    this.favorList = []
    this.repairList = []
    this.auditList = []

    this.baseInfo = { ...this.defautInfo, bookId: query.bookId }

    this.getBaseInfo()

    this.getIndexAudited()

    this.getRepairList()

    this.getFavorlist()

    this.getAuditList()
  }
  //获取基本信息
  @action public getBaseInfo = () => {
    this.baseLoading = true
    nursingRulesApiService.getBookInfo(this.baseInfo.bookId)
      .then(res => {
        this.baseLoading = false
        if (res.data) {
          let newBaseInfo = { ...this.baseInfo } as any;

          for (let x in this.baseInfo) {
            if (Object.keys(res.data).indexOf(x) >= 0) newBaseInfo[x] = res.data[x]
          }

          this.baseInfo = newBaseInfo
        }
      }, () => {
        this.baseLoading = false
      })
  }
  //获取已审核目录
  @action public getIndexAudited = () => {
    this.indexLoading = true
    nursingRulesApiService.getBookCataLog(this.baseInfo.bookId)
      .then(res => {
        this.indexLoading = false
        if (res.data) this.indexList = res.data.map((item: any) => {
          return {
            ...item,
            childrenList: item.childrenList || []
          }
        })
        else this.indexList = []
      }, () => this.indexLoading = false)
  }
  //获取修订记录
  @action public getRepairList = () => {
    this.repairLoading = true
    nursingRulesApiService
      .getRevisions(this.baseInfo.bookId)
      .then(res => {
        this.repairLoading = false
        if (res.data) this.repairList = res.data
        else this.repairList = []
      }, () => this.repairLoading = false)
  }
  //获取收藏记录
  @action public getFavorlist = () => {
    this.favorLoading = true
    nursingRulesApiService.getCollections(this.baseInfo.bookId)
      .then(res => {
        this.favorLoading = false
        if (res.data) this.favorList = res.data
        else this.favorList = []

      }, () => this.favorLoading = false)
  }
  //获取待审核章节
  @action public getAuditList = () => {
    this.auditLoading = true
    nursingRulesApiService.getToAuditChapters(this.baseInfo.bookId)
      .then(res => {
        this.auditLoading = false
        if (res.data) this.auditList = res.data.filter((item: any) => {
          return item.urls && item.urls.length > 0
        })
        else this.auditList = []
      }, () => this.auditLoading = false)
  }
  //设置启用和无效
  @action public setEnabled = (newEnabled: number) => {
    this.baseInfo.enabled = newEnabled
  }
  //取消收藏
  @action public cancelFavor = (collectionId: string, success: Function) => {
    nursingRulesApiService
      .cancelCollection(collectionId)
      .then(res => {
        this.getFavorlist()
        success && success()
      })
  }
}

export const detailPageModel = new DetailPageModel()