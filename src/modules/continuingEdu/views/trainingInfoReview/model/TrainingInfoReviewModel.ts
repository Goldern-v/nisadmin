import { action, observable, computed } from 'mobx'
import { trainingInfoReviewService } from './../api/TrainingInfoReviewService'
import { appStore } from 'src/stores'
import { message } from 'antd'

class TrainingInfoReviewModel {
  @observable baseInfo = {} as any
  @observable baseLoading = false

  @action public init() {
    this.clean()
    this.getBaseInfo(appStore.queryObj.id)
  }

  @action public clean() {
    this.baseInfo = {}
  }

  @action public getBaseInfo(id: string | any) {
    if (!id) {
      message.error('缺少详情ID')
      return
    }

    this.baseLoading = true
    trainingInfoReviewService
      .getBaseInfo(id)
      .then((res) => {
        this.baseLoading = false
        if (res.data) this.baseInfo = res.data
      }, () => this.baseLoading = false)
  }
}

export const trainingInfoReviewModel = new TrainingInfoReviewModel()