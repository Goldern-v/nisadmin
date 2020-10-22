import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class BadEventReportListService extends BaseApiService {
  public getPage(query: any) {
    return this.post('/beReport/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/beReport/create', params)
  }
}

export const badEventReportListService = new BadEventReportListService();
