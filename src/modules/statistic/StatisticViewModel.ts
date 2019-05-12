import { observable, computed, action } from 'mobx'

class StatisticViewModel {
  @observable public title = ''
  @observable public deptName = ''
  @observable public deptCode = ''
  @observable public startDate = ''
  @observable public endDate = ''
  @observable public classDiff: any = ''
  @observable public classItem: any = ''

  @computed
  public get getTitle () {
    return this.deptName + this.title
  }
  @computed
  public get getDeptName () {
    return this.deptName
  }
  @computed
  public get getDeptCode () {
    return this.deptCode
  }
  @computed
  public get getStartDate () {
    return this.startDate
  }
  @computed
  public get getEndDate () {
    return this.endDate
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle
  }
  public setDeptCode = (newDeptCode: any) => {
    this.deptCode = newDeptCode
  }
}

const statisticViewModel = new StatisticViewModel()
export default statisticViewModel
