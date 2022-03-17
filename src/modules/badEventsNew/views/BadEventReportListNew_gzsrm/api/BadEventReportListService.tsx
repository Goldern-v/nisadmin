import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class BadEventReportListService extends BaseApiService {
  public getPage(query: any) {
    return this.post('/badEventReport/getReportList', query)
  }
  public createReport(params: any) {
    return this.post('/badEventReport/getReport', params)
  }
  public createNewReport(params: any) {
    return this.post('/badEventReport/getReportList', params)
  }
}

export const badEventReportListService = new BadEventReportListService();
