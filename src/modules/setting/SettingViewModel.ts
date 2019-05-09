import { observable, computed, action } from 'mobx'
class SettingViewModel {
  @observable public headTitle = ''
  @observable public selectYear = ''
  @observable public holidayName = ''
  @observable public holidayDate = ''
  @observable public holidayAdd: any = {}
  @observable public tableDate: any = []
  @computed public get getHeadTitle () {
    return this.headTitle
  }
  @computed public get getHolidayName () {
    return this.selectYear
  }
  @computed public get getHolidayDate () {
    return this.selectYear
  }
  @computed public get getSelectYear () {
    return this.selectYear
  }
  @computed public get getHolidayAdd () {
    return { name: this.holidayName, holidaysDate: this.holidayDate }
  }
  @action public setHeadTitle = (newTitle: any) => {
    this.headTitle = newTitle
  }
  @action public setSelectYear = (newTitle: any) => {
    this.selectYear = newTitle
  }
  // @action public setHolidayName = (newTitle: any) => {
  //   this.selectYear = newTitle
  // }
  @action public setHolidayDate = (newTitle: any) => {
    this.selectYear = newTitle
  }
  @action public setTableDate = (newDate: any) => {
    this.tableDate = newDate
  }
}

const settingViewModel = new SettingViewModel()
export default settingViewModel
