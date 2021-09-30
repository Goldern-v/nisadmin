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
  checkDeptDesc: ''
  keyCheckItemDesc: string
  followUpDeptDesc: string
  suggestions: string
  checkWardDesc: string
  [p: string]: any
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
  [p: string]: any
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
  content: string,
  year: number,
  type: string,
  indexInType: number,
  qcGroupCode: string,
  qcGroupName: string,
  itemImproveDesc: string
  childrenItemList: any[]
}
/** 检查亮点 */
interface HighlightItem extends DetailItem { }
/** 重点问题 */
interface keyItem extends DetailItem { }

/** 4.2、持续改进 5.1.检查重点 */
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


//审核状态
export interface IApprovalStatus extends Record<string, any> {
  approvalStatus: number,//状态
  str: string,//状态说明
}

export const approvalStatusList: Array<IApprovalStatus> = [
  {
    approvalStatus: 0,
    str: "待提交",
  },
  {
    approvalStatus: 1,
    str: "通过",
  },
  {
    approvalStatus: 2,
    str: "驳回",
  },
  {
    approvalStatus: 3,
    str: "待区护长审核",
  }
]

//夜班费统计标准
export const standardList = [
  {
      "code": "护士/护师 120元/个",
      "name": "120"
  },
  {
      "code": "带教晚夜班 120元/个",
      "name": "120"
  },
  {
      "code": "主管护师 130元/个",
      "name": "130"
  },
  {
      "code": "副主任护师 150元/个",
      "name": "150"
  },
  {
      "code": "早晚助班 60元/个",
      "name": "60"
  },
  {
      "code": "早晚助带教 60元/个",
      "name": "60"
  },
  {
      "code": "护士长夜查房 60元/个",
      "name": "60"
  },
  {
      "code": "护工/工人 40元/个",
      "name": "40"
  }
]

//夜班统计标准字典
export interface IStandardItem{
  code:string,
  name:string,
}