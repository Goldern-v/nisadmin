import { RangePickerValue } from "antd/lib/date-picker/interface";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import moment from 'moment'

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
    this.date = getCurrentMonth() as RangePickerValue
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
  deliveryMode?: string

  constructor(data: iModalForm = {}) {
    this.id = data.id
    this.empNo = data.empNo
    this.empName = data.empName
    this.deptCode = data.deptCode
    this.lastMenstrualPeriod = data.lastMenstrualPeriod && moment(data.lastMenstrualPeriod)
    this.expectedDate = data.expectedDate && moment(data.expectedDate)
    this.deliveryDate = data.deliveryDate && moment(data.deliveryDate)
    this.deliveryMode = data.deliveryMode
  }
}