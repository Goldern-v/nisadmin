interface SchAddOrSubItem {
  startDate: string;
  endDate: string;
  statusType: string;
  hour: number;
  settingNightHour: number;
  settingMorningHour: number;
}

export interface ArrangeItem {
  userId?: number;
  rangeName?: string;
  rangeNameCode?: string | number | null; //编号
  nameColor?: string;
  effectiveTime?: number | null;
  effectiveTimeOld?: number | null;
  shiftType?: string;
  addSymbols?: { symbol: string; detail: string }[] | null;
  detail?: string;
  settings?: ArrangeItem | null;
  statusType?: string;
  workDate?: string;
  /** 武汉加减班 */
  schAddOrSubs?: Partial<SchAddOrSubItem>[];
  rangeNameCodeList?: any;
  [p: string]: any;
}

export interface SymbolItem {
  deptCode: string;
  createTime: string;
  id: string;
  symbol: string;
  detail: string;
}
