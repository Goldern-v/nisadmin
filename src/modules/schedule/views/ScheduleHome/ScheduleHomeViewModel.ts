import { observable, computed, action } from 'mobx'

class ScheduleHomeViewModel {
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

const scheduleHomeViewModel = new ScheduleHomeViewModel()
export default scheduleHomeViewModel
