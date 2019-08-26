import { observable, computed, action } from 'mobx'
/** 用于存放排班表等基础数据 */
class SelectViewModal {
  @observable public sheetTable = [
    {
      工号: '0020',
      姓名: '王大锤',
      层级: ''
    }
  ]
}

export const selectViewModal = new SelectViewModal()
