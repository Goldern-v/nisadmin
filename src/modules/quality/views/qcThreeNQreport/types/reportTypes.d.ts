export interface ParamsType {
  templateName:string
  reportName:string
  reportLevel:string
  reportYear:string
  startDate:string
  endDate:string
  reportType:string
  qcTime:string
  dataSourceType: number
}

export interface getPageType {
  templateName: string
  hospitalCode: string
  reportLevel: any
  reportYear?: any
  reportMonth?: string
  reportQuarter?: string
  reportName?: string
  wardCode?: string
  roleCode?: string
  status?: string
  pageIndex: string | number
  pageSize: string | number
  startDate: string
  endDate: string
  qcCode?: string
}