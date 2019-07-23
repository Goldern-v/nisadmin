import BaseApiService from 'src/services/api/BaseApiService'
export default class QualityAnalysisReportService extends BaseApiService {
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
    return this.post(`/qcAnalysis/getReport`, obj)
  }
}

export const qualityAnalysisReportService = new QualityAnalysisReportService()
