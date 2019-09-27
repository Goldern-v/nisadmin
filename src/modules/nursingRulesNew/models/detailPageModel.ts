import { action, observable, computed } from 'mobx'
import { nursingRulesApiService } from './../api/nursingRulesNewService'

export class DetailPageModel {
  private defautInfo = {
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
  @observable public baseInfo = { ...this.defautInfo }

  @observable baseLoading = false as boolean
  //目录
  @observable public indexList = [] as any
  //我的收藏
  @observable public favorList = [] as any
  //修订记录
  @observable public repairList = [] as any
  //待审核目录
  @observable public auditList = [] as any

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
    nursingRulesApiService.getBookCataLog(this.baseInfo.bookId)
      .then(res => {
        if (res.data) this.indexList = res.data.map((item: any) => {
          return {
            ...item,
            childrenList: item.childrenList || []
          }
        })
        else this.indexList = []
      })
  }
  //获取修订记录
  @action public getRepairList = () => {
    nursingRulesApiService
      .getRevisions(this.baseInfo.bookId)
      .then(res => {
        if (res.data) this.repairList = res.data
        else this.repairList = []
      })
  }
  //获取收藏记录
  @action public getFavorlist = () => {
    nursingRulesApiService.getCollections(this.baseInfo.bookId)
      .then(res => {
        if (res.data) this.favorList = res.data
        else this.favorList = []

      })
  }
  //获取待审核章节
  @action public getAuditList = () => {
    nursingRulesApiService.getToAuditChapters(this.baseInfo.bookId)
      .then(res => {
        if (res.data) this.auditList = res.data.filter((item: any) => {
          return item.urls && item.urls.length > 0
        })
        else this.auditList = []
      })
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