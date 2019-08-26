import { observable, computed, action } from 'mobx'
/** 主视图控制 */
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
