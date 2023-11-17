import { observable, computed, action } from 'mobx'

class ShiftSettingViewModel {
  @observable public title = ''
  @computed
  public get getTitle () {
    return this.title
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle
  }
}

const shiftSettingViewModel = new ShiftSettingViewModel()
export default shiftSettingViewModel
