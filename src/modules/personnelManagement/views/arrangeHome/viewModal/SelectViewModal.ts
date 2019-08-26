import { observable, computed, action } from 'mobx'
/** 用于存放筛选条件等基础数据 */
class SelectViewModal {
  @observable public title = ''
  @computed
  public get getTitle() {
    return this.title
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle
  }
}

export const selectViewModal = new SelectViewModal()
