import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class QualityAnalysisService extends BaseApiService {
  public dictInfo(code: string) {
    return this.post('/dept/dictInfo', qs.stringify({ code }));
  }
}