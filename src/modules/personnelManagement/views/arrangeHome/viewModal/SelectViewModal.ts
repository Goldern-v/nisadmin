import { observable, computed, action } from 'mobx'
/** 用于存放筛选条件等基础数据 */
class SelectViewModal {
  /** 开始时间 */
  @observable public startDate = '2019-08-08'
  /** 截止时间 */
  @observable public endDate = '2019-08-28'
}

export const selectViewModal = new SelectViewModal()
