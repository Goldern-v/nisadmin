interface SchAddOrSubItem {
  startDate: string
  endDate: string
  statusType: string
}

export interface ArrangeItem {
  rangeName?: string
  nameColor?: string
  effectiveTime?: number | null
  effectiveTimeOld?: number | null
  shiftType?: string
  addSymbols?: { symbol: string; detail: string }[] | null
  detail?: string
  settings?: ArrangeItem | null
  statusType?: string
  /** 武汉加减班 */
  schAddOrSubs?: Partial<SchAddOrSubItem>[]
  [p: string]: any
}

export interface SymbolItem {
  deptCode: string
  createTime: string
  id: string
  symbol: string
  detail: string
}
