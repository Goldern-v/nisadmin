import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { qualityAnalysisReportViewModal } from '../QualityAnalysisReportViewModal'
export default class QualityAnalysisReportService extends BaseApiService {
  /** 获取分析报告 */
  public getReport() {
    return this.post(`/missionReportInstance/getReport`, { id: appStore.queryObj.id })
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

  /** 更新报告名称 */
  public updateReport(instance?: any) {
    let obj = instance
    return this.post(`/missionReportInstance/updateReport`, obj)
  }
  /** 更新数据概况 */
  public updateOverview(overview?: any) {
    let obj = {
      reportId: appStore.queryObj.id,
      overview: overview
    }
    return this.post(`/missionReportInstance/update/overview`, obj)
  }
  /** 更新数据分析 */
  public updateGraphs(graphsList?: any) {
    let obj = {
      reportId: appStore.queryObj.id,
      graphsList: graphsList
    }
    return this.post(`/missionReportInstance/update/graphs`, obj)
  }
}

export const qualityAnalysisReportService = new QualityAnalysisReportService()
