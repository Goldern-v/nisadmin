import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class SummaryReportService extends BaseApiService {
  public getPage(query: any) {
    return this.post('/qcSummary/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/qcSummary/createReport', params)
  }
}

export const summaryReportService = new SummaryReportService();
