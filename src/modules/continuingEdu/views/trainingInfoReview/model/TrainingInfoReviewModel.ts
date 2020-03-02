import { action, observable, computed } from 'mobx'
import { trainingInfoReviewService } from './../api/TrainingInfoReviewService'
import { appStore } from 'src/stores'
import { message } from 'antd'

class TrainingInfoReviewModel {
  @observable baseInfo = {} as any
  @observable baseLoading = false

  @observable auditInfo = [] as any[]
  @observable auditLoading = false

  public taskTypeName(taskType: number): string {
    switch (taskType) {
      case 1: return '新建'
      case 2: return '提交'
      case 3: return '撤销'
      case 4: return '退回'
      case 5: return '审核通过'
      default: return ''
    }
  }

  @action public init() {
    this.clean()
    this.getBaseInfo(appStore.queryObj.id)
    this.getAuditInfo(appStore.queryObj.id)
  }

  @action public clean() {
    this.baseInfo = {}
    this.auditInfo = []
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

  @action public getAuditInfo(id: string | any) {
    if (!id) return

    this.auditLoading = true
    trainingInfoReviewService
      .getAuditInfo(id)
      .then((res) => {
        this.auditLoading = false
        if (res.data) this.auditInfo = res.data
      }, () => this.auditLoading = false)
  }
}

export const trainingInfoReviewModel = new TrainingInfoReviewModel()