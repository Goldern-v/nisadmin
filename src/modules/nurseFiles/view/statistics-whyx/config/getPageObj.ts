import { ColumnProps } from 'src/vendors/antd'

export type filterType =
  | 'select'
  | 'multiplesSelect'
  | 'input'
  | 'yearRangePicker'
  | 'dateRangePicker'
  | 'yearPicker'
  | 'yearMonthRangePicker'
  | 'numberUntilSelect'
  | 'multiplesSelecteSpecially'
export interface filterItem {
  label: string
  type: filterType
  dataSource?: { name: string; code: string }[]
  name: string
  nameList?: string[]
  multiple?: boolean,
  unit?: string | undefined,
  name1?: string | undefined,
  numberUntilSelect?: boolean,
  numberUntilInput? : boolean,
  placeholder?: string, 
  limit?: number,
  step?: number | string
}

export interface PageObj {
  title: string
  filterList: filterItem[]
  tableList: ColumnProps<any>[]
  detailPath?: string
  [p: string]: any,
}

export const getPageObj = (path: string) => {
  return require(`./${path}`).pageObj
}
