import { observable, computed, action } from 'mobx'

class NuserSettingViewModel {
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

const nuserSettingViewModel = new NuserSettingViewModel()
export default nuserSettingViewModel
