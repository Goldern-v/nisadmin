export type filterType = 'select' | 'input'
export interface filterItem {
  label: string
  type: filterType
  dataSource: { name: string; code: string }[]
  name: string
}

export interface PageObj {
  title: string
  filterList: filterItem[]
  [p: string]: any
}

export const getPageObj = (path: string) => {
  return require(`./${path}`).pageObj
}
