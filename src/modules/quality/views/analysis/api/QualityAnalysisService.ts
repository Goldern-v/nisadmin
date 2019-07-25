import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class QualityAnalysisService extends BaseApiService {
  public qcRoleCode() {
    return this.get('/qcItem/dict/qcRoleCode');
  }
  public getPage(query: any) {
    return this.post('/qcAnalysis/getPage', query);
  }
  public createReport(params: any) {
    return this.post('/qcAnalysis/createReport', params);
  }
}