import { RangePickerValue } from "antd/lib/date-picker/interface";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import moment from 'moment'

interface iSearchForm {
  name?: string,
  date?: RangePickerValue,
  status?: string,
  type?: string,
  pageIndex?: number,
  pageSize?: number,
}

export class SearchForm implements iSearchForm {
  name?: string
  date?: RangePickerValue
  status?: string
  type?: string
  pageIndex?: number
  pageSize?: number

  constructor() {
    this.date = getCurrentMonth() as RangePickerValue
    this.status = '0'
    this.type = '0'
    this.pageIndex = 1
    this.pageSize = 20
  }
}

interface iModalForm {
  name?: string
  aaa?: string
  time?: moment.Moment
  time2?: string
  time3?: moment.Moment
  type?: string
}

export class ModalForm implements iModalForm {
  name?: string
  aaa?: string
  time?: moment.Moment
  time2?: string
  time3?: moment.Moment
  type?: string

  constructor() {
  }
}