import { data } from 'jquery';
import { appStore } from '../../../../../stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
// import { analysisDetailModal } from '../AnalysisDetailModal'
export default class AnalysisDetailApi extends BaseApiService {
  /** 获取分析报告 */
  public getReport(obj?: any) {
    obj = {
      type: 'month',
      year: '2019',
      indexInType: 7,
      beginDate: '2019-07-01',
      endDate: '2019-07-31',
      groupRoleCode: 'QCR0017',
      reportName: '2019年度7月基础质控分析报告'
    }

    return this.post(`/qcAnalysis/getReport`, appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/cancelPublish`, appStore.queryObj)
  }
  /**查看详细报告 */
  public getPageDetaile(reportId: number) {
    return this.get(`/baseReport/getReport/${reportId}`)
  }
  /**保存属性类型报告数据 */
  public saveReportFieldData(data:any) {
    return this.post(`/reportFieldData/save`,data)
  }
}

export const analysisDetailApi = new AnalysisDetailApi()
