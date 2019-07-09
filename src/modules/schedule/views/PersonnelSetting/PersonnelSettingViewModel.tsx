import { observable, computed, action } from 'mobx'

class PersonnelSettingViewModel {
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

const personnelSettingViewModel = new PersonnelSettingViewModel()
export default personnelSettingViewModel
