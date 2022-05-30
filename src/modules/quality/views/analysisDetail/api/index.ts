import { appStore } from '../../../../../stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
// import { analysisDetailModal } from '../AnalysisDetailModal'
export default class AnalysisDetailApi extends BaseApiService {
  /** 获取分析报告 */
  // public getReport(obj?: any) {
  //   obj = {
  //     type: 'month',
  //     year: '2019',
  //     indexInType: 7,
  //     beginDate: '2019-07-01',
  //     endDate: '2019-07-31',
  //     groupRoleCode: 'QCR0017',
  //     reportName: '2019年度7月基础质控分析报告'
  //   }

  //   return this.post(`/qcAnalysis/getReport`, appStore.queryObj)
  // }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/cancelPublish`, appStore.queryObj)
  }
  public getReport(id: string) {
    return this.get(`/baseReport/getReport/${id}`)
  }
}

export const analysisDetailApi = new AnalysisDetailApi()
