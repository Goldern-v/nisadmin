import qs from 'qs'
import BaseApiService from 'src/services/api/BaseApiService'
import { appStore } from 'src/stores'

export interface getPageIn extends Record<string, any> {
  hospitalCode?: string
  // 必须 医院编码
  templateName: string
  // 必须 模板名称
  reportLevel: string|number
  // 必须 报告等级
  reportName?: string
  // 报告名称
  wardCode?: string
  // 科室编码
  roleCode?: string
  // 角色编码
  status?: '0' | '1' | ''
  // 状态（0、保存，1、发布）
  pageIndex?: string
  // 当前页，不传默认1
  pageSize?: string
  // 每页显示条数，不传默认0
  reportYear?: string
  // 报告年份
  reportMonth?: string
  // 汇总表单编码（多个以逗号分隔）
  summaryFormCode?: string
  // 报告月份
  [p: string]: any
}
export interface createReportIn extends Record<string, any> {
  hospitalCode?: string
  // 必须 医院编码
  templateName: string
  // 必须 模板名称
  reportName: string
  // 必须 报告名称
  reportLevel: string
  startDate: string
  endDate: string
  wardCode: string
}
export default class AnalysisService extends BaseApiService {
  private path = '/baseReport/'
  public qcRoleCode() {
    return this.get('/qcItem/dict/qcRoleCode')
  }
  public qcRoleCodeSelf() {
    return this.get('/qcItem/dict/qcRoleCodeSelf')
  }

  public push(params: any) {
    return this.post('/qcItem/push/deptNotAuditList', params)
  }
  /**
   * 分页查询报告
   * @param params 
   * @returns 
   */
  public getPage(params: getPageIn) {
  return this.post(`${this.path}getPage`, { ...params, reportLevel: parseInt(params.reportLevel + ''), hospitalCode: appStore.HOSPITAL_ID})
  }

  /**创建报告 */
  public createReport(params: createReportIn) {
  return this.post(`${this.path}createReport`, { ...params, reportLevel: parseInt(params.reportLevel + ''), hospitalCode: appStore.HOSPITAL_ID})
  }
  /**查询单条报告 */
  public getOneReport(params: getPageIn) {
  return this.post(`${this.path}getOneReport`, { ...params, hospitalCode: appStore.HOSPITAL_ID})
  }
}

export const analysisService = new AnalysisService()