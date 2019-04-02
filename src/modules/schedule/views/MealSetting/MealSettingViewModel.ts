import { observable, computed, action } from 'mobx'

class MealSettingViewModel {
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

const mealSettingViewModel = new MealSettingViewModel()
export default MealSettingViewModel
