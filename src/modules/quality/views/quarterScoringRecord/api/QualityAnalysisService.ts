import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class QualityAnalysisService extends BaseApiService {
  public qcRoleCode() {
    return this.get('/qcItem/dict/qcRoleCode')
  }
  public qcRoleCodeSelf() {
    return this.get('/qcItem/dict/qcRoleCodeSelf')
  }
  public getPage(query: any) {
    return this.post('/wardRoundRate/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/wardRoundRate/create', params)
  }

  public push(params: any) {
    return this.post('/qcItem/push/deptNotAuditList', params)
  }
}
