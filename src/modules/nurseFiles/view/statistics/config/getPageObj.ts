import { ColumnProps } from 'src/vendors/antd'

export type filterType =
  | 'select'
  | 'input'
  | 'yearRangePicker'
  | 'dateRangePicker'
  | 'yearPicker'
  | 'yearMonthRangePicker'
export interface filterItem {
  label: string
  type: filterType
  dataSource?: { name: string; code: string }[]
  name: string

  nameList?: string[]
}

export interface PageObj {
  title: string
  filterList: filterItem[]
  tableList: ColumnProps<any>[]
  detailPath?: string
  [p: string]: any
}

export const getPageObj = (path: string) => {
  return require(`./${path}`).pageObj
}
