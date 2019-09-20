import { action, observable, computed } from 'mobx'

export class DetailPageModel {
  //目录
  @observable public indexList = [] as any
  //我的收藏
  @observable public favorList = [] as any
  //修订记录
  @observable public repairList = [] as any
  //待审核章节
  @observable public auditList = [] as any

  @action public inited(callback: Function) {
    this.indexList = []
    this.favorList = []
    this.repairList = []
    this.auditList = []

    callback && callback()
  }
}

export const detailPageModel = new DetailPageModel()