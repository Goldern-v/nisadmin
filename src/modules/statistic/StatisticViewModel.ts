import { observable, computed, action } from 'mobx'

class StatisticViewModel {
  @observable public title = ''
  @observable public deptName = ''
  @observable public deptCode = ''
  @observable public startDate = ''
  @observable public endDate = ''
  @observable public classDiff: any = ''
  @observable public classItem: any = ''
  // 白班/夜班
  @observable public whiteBlack: any = ''
  // 时数/次数
  @observable public hourTime: any = ''

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
  @computed
  public get getStartDateByQuarter () {
    let nowMonth = this.startDate.slice(5,7)
    if(nowMonth == "01" || nowMonth == "02" || nowMonth == "03") {
      return this.startDate.substr(0, 5) + "01-01"
    }
    if(nowMonth == "04" || nowMonth == "05" || nowMonth == "06") {
      return this.startDate.substr(0, 5) + "04-01"
    }
    if(nowMonth == "07" || nowMonth == "08" || nowMonth == "09") {
      return this.startDate.substr(0, 5) + "07-01"
    }
    if(nowMonth == "10" || nowMonth == "11" || nowMonth == "12") {
      return this.startDate.substr(0, 5) + "10-01"
    }
  }
  @computed
  public get getEndDateByQuarter () {
    let nowMonth = this.startDate.slice(5,7)
    if(nowMonth == "01" || nowMonth == "02" || nowMonth == "03") {
      return this.startDate.substr(0, 5) + "03-31"
    }
    if(nowMonth == "04" || nowMonth == "05" || nowMonth == "06") {
      return this.startDate.substr(0, 5) + "06-30"
    }
    if(nowMonth == "07" || nowMonth == "08" || nowMonth == "09") {
      return this.startDate.substr(0, 5) + "09-30"
    }
    if(nowMonth == "10" || nowMonth == "11" || nowMonth == "12") {
      return this.startDate.substr(0, 5) + "12-31"
    }
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
