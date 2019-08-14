import { observable, computed, action } from 'mobx'
class WardManagementView {
  @observable public headTitle = ''
  @observable public selectYear = ''
  @observable public holidayName = ''
  @observable public holidayDate1 = ''
  @observable public holidayDate2 = ''
  @observable public holidayDate3 = ''
  @observable public holidayAdd: any = []
  @observable public tableDate: any = []
  @observable public tableDateCache: any = []
  @observable public testArr: any = []
  @computed public get getHeadTitle() {
    return this.headTitle
  }
  @computed public get getHolidayName() {
    return this.selectYear
  }
  @computed public get getHolidayDate() {
    return this.selectYear
  }
  @computed public get getSelectYear() {
    return this.selectYear
  }
  @computed public get getHolidayAdd() {
    if (this.holidayDate1 && this.holidayDate2 && this.holidayDate3) {
      return [
        { name: this.holidayName, holidaysDate: this.holidayDate1 },
        { name: this.holidayName, holidaysDate: this.holidayDate2 },
        { name: this.holidayName, holidaysDate: this.holidayDate3 }
      ]
    } else if (this.holidayDate1 && this.holidayDate2) {
      return [
        { name: this.holidayName, holidaysDate: this.holidayDate1 },
        { name: this.holidayName, holidaysDate: this.holidayDate2 }
      ]
    } else if (this.holidayDate2 && this.holidayDate3) {
      return [
        { name: this.holidayName, holidaysDate: this.holidayDate2 },
        { name: this.holidayName, holidaysDate: this.holidayDate3 }
      ]
    } else if (this.holidayDate1) {
      return [{ name: this.holidayName, holidaysDate: this.holidayDate1 }]
    } else if (this.holidayDate2) {
      return [{ name: this.holidayName, holidaysDate: this.holidayDate2 }]
    } else if (this.holidayDate3) {
      return [{ name: this.holidayName, holidaysDate: this.holidayDate3 }]
    }
    // return [{ name: this.holidayName, holidaysDate: this.holidayDate1 }]
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

  @action public setTableDateCache = (newDate: any) => {
    this.tableDateCache = newDate
  }
  @action public setTableDate = (newDate: any) => {
    this.tableDate = newDate
  }
}

const wardManagementView = new WardManagementView()
export default wardManagementView
