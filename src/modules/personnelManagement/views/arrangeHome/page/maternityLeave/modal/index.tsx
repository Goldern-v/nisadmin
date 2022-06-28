import { RangePickerValue } from "antd/lib/date-picker/interface";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import moment from 'moment'
import { appStore } from "src/stores";

export interface iSearchForm {
  empName?: string,
  deptCode?: string
  date?: RangePickerValue,
  status?: string,
  type?: string,
  pageIndex?: number,
  pageSize?: number,
}

export class SearchForm implements iSearchForm {
  empName?: string
  deptCode?: string
  date?: RangePickerValue
  status?: string
  deliveryMode?: string
  pageIndex?: number
  pageSize?: number

  constructor() {
    if (['jmfy'].includes(appStore.HOSPITAL_ID)) {
      this.date = [
        moment(moment().format('YYYY-MM-DD')),
        moment(moment().format('YYYY-MM-DD'))
      ]
    } else {      
      this.date = [
        moment(moment().format('YYYY-MM-01')),
        moment(moment().add(1, 'year').format('YYYY-MM-01'))
      ]
    }
    this.status = ''
    this.deliveryMode = ''
    this.pageIndex = 1
    this.pageSize = 20
  }
}

export class justiceSearchForm implements iSearchForm {
  empName?: string
  deptCode?: string
  date?: RangePickerValue
  status?: string
  deliveryMode?: string
  pageIndex?: number
  pageSize?: number

  constructor() {
    // this.date = [
    //   moment(moment().format('YYYY-MM-01')),
    //   moment(moment().add(1, 'year').format('YYYY-MM-01'))
    // ]
    this.date = [],
      this.status = ''
    this.deliveryMode = ''
    this.pageIndex = 1
    this.pageSize = 20
  }
}

export interface iModalForm {
  id?: string,
  empNo?: string
  empName?: string
  deptCode?: string
  lastMenstrualPeriod?: moment.Moment
  expectedDate?: moment.Moment
  deliveryDate?: moment.Moment
  babyBreakStartDate?: moment.Moment
  deliveryMode?: string
}

export class ModalForm implements iModalForm {
  id?: string
  empNo?: string
  empName?: string
  deptCode?: string
  lastMenstrualPeriod?: moment.Moment
  expectedDate?: moment.Moment
  deliveryDate?: moment.Moment
  babyBreakStartDate?: moment.Moment
  deliveryMode?: string

  constructor(data: iModalForm = {}) {
    this.id = data.id
    this.empNo = data.empNo
    this.empName = data.empName
    this.deptCode = data.deptCode
    this.lastMenstrualPeriod = data.lastMenstrualPeriod && moment(data.lastMenstrualPeriod)
    this.expectedDate = data.expectedDate && moment(data.expectedDate)
    this.deliveryDate = data.deliveryDate && moment(data.deliveryDate)
    this.babyBreakStartDate = data.babyBreakStartDate && moment(data.babyBreakStartDate)
    this.deliveryMode = data.deliveryMode
  }
}