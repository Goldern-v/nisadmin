import { observable, computed, action } from 'mobx'
/** 用于存放筛选条件等基础数据 */
class SelectViewModal {
  /** 开始时间 */
  @observable public startTime = '2019-08-01'
  /** 截止时间 */
  @observable public endTime = '2019-08-31'
}

export const selectViewModal = new SelectViewModal()
