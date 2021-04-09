import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export interface NurseQuery {
  deptCode?: string /** 部门编码 */
  empNo?: string /** 员工工号 */
  education: string /** 学历 */
  title: string /** 职称 */
  currentLevel: string /** 能级、层级 */
  post: string /**  当前页数  */
  pageIndex: number /**  职务  */
  pageSize: number /**   每页页数 */
  empName: string /**   每页页数 */
}

export default class IndicatorService extends BaseApiService {
  /** 获取指标数据 */
  public getIndicatoeData(serviceName: any, beginDate: any, endDate: any) {
    return this.post(`/nursingIndex/${serviceName}`, {
      beginDate,
      endDate
    })
  }
  // 导出指标数据表格
  public postExport(serviceName: any, beginDate: any, endDate: any) {
    return this.post(
      `/nursingIndex/${serviceName}`,
      {
        beginDate,
        endDate
      },
      { responseType: 'blob' }
    )
  }

  /**
   * NQ.1.03、敏感指标：自定义统计表
   * @param query 
   * @returns Promise<any>
   */
  public getIndicatorTable(query: {
    beginDate: string,
    endDate: string,
    indicatorTableCode: string
  }) {
    const { indicatorTableCode, endDate, beginDate } = query
    return this
      .post(`/sensitiveIndicator/customIndicatorTable/${indicatorTableCode}`, {
        endDate, beginDate
      })
  }
}

export const indicatorService = new IndicatorService()
