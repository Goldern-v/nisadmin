import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class SummaryReportService extends BaseApiService {
  public getPage(query: any) {
    return this.post('/qcAnalysis/wn/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/qcAnalysis/wn/createReport', params)
  }

  public publish(obj?: any) {
    return this.post(`/qcAnalysis/wn/publish`, obj)
  }
  public cancelPublish(obj?: any) {
    return this.post(`/qcAnalysis/wn/cancelPublish`, obj)
  }

  /**导出 */
  public exportData(query: { wardCode: string, year: string, month: string }) {
    return this.post('/qcFlReport/export/wardNursingWork', query, { responseType: 'blob' })
  }
}

export const summaryReportService = new SummaryReportService()
