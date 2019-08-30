export interface ArrangeItem {
  rangeName?: string
  nameColor?: string
  effectiveTime?: string
  effectiveTimeOld?: string
  shiftType?: string
  addSymbols?: string
  detail?: string
  settings?: ArrangeItem | null
  [p: string]: any
}

export interface SymbolItem {
  deptCode: string
  createTime: string
  id: string
  symbol: string
  detail: string
}
