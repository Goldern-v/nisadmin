import { observable, computed, action } from 'mobx'

class ScheduleSettingViewModel {
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
const scheduleSettingViewModel = new ScheduleSettingViewModel()
export default scheduleSettingViewModel
