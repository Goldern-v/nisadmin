import { observable, computed, action } from 'mobx'

class BadEventViewModal {
  @observable public reportTitle: string = '2019年第二季度不良事件分析报告'
}

export const badEventViewModal = new BadEventViewModal()
