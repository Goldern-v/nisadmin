import { observable, computed, action } from 'mobx'

class StatisticViewModel {
  @observable public title = ''
  @observable public deptName = ''
  @observable public deptCode = ''
  @observable public startDate = ''
  @observable public endDate = ''
  @computed
  public get getTitle () {
    return this.deptName + this.title
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle
  }

  @action
  public getDeptName = () => {
    return this.deptName
  }
}

const statisticViewModel = new StatisticViewModel()
export default statisticViewModel
