/** 报告主体数据 */
export interface Report {
  type: string
  year: string
  /** 当前月份 */
  indexInType: number
  groupRoleCode: string
  reportName: string
  beginDate: string
  endDate: string
  status: string
  creatorNo: string
  creatorName: string
  createTime: string
  updaterNo: string
  updaterName: string
  updateTime: string
  checkDeptSize: string
  deductDeptSize: string
  checkDeptDesc: string
  archiveDesc: string
  keyCheckItemDesc: string
  followUpDeptDesc: string
  suggestions: string
  lastBeginDate?: string
  lastEndDate?: string
}
/** 追踪科室 */
interface FollowUpDept {
  name: string
  code: string
}
/** 持续改进效果 */
export interface LastImproveItem {
  id: number
  itemCode: string
  itemName: string
  itemImproveDesc: string
  result: string
}
/** 质量扣分比较 */
export interface TypeCompare {
  id: number
  itemType: string
  itemTypeName: string
  currentDeductScore: number | string
  lastDeductScore: number | string
  compareScore: number | string
  compareScorePercent: number | string
}
/** 扣分科室 */
export interface DeptItem {
  id: number
  wardCode: string
  wardName: string
  itemCode: string
  itemBadDesc: string
  deductScore: number | string
}
/** 主要质量问题 */
export interface DetailItem {
  id: number
  wardCode: string
  wardName: string
  itemCode: string
  itemName: string
  itemType: string
  itemTypeName: string
  itemBadDesc: string
  itemGoodDesc: string
  totalDeductScore: string | number
  deductDeptSize: string | number
  attachUrls: string
  highlightItem: string
  content: string
  detailList: any[]
}
/** 检查亮点 */
interface HighlightItem extends DetailItem { }
/** 重点问题 */
interface keyItem extends DetailItem { }

/** 2、持续改进 5.1.检查重点 */
export interface CurrentImproveItem {
  id: number
  itemCode: string
  itemName: string
  itemImproveDesc: string
  result: string
}

export interface AllData {
  report: Partial<Report>
  lastImproveItemList: Partial<LastImproveItem>[]
  detailItemList: Partial<DetailItem>[]
  highlightItemList: Partial<HighlightItem>[]
  keyItemList: Partial<keyItem>[]
  currentImproveItemList: Partial<CurrentImproveItem>[]
  [p: string]: any
}
