import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class WorkSummaryReportListService extends BaseApiService {
  public qcBigDeptList() {
    return this.get('/dept/bigDeptList')
  }
  public qcBigDeptListSelf() {
    return this.get('/qcItem/dict/bigDeptListSelf')
  }
  public getPage(query: any) {
    return this.post('/qcAnalysis2L/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/qcAnalysis2L/createReport', params)
  }
}


export const workSummaryReportListService = new WorkSummaryReportListService()