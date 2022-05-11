import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class QualityAnalysisService extends BaseApiService {
  
  //查房率页面
  public getPage(query: any) {
    return this.post('/wardRoundRate/getPage', query)
  }
  // 表单创建
  public createReport(params: any) {
    return this.post('/wardRoundRate/create', params)
  }
  // 删除
  public wardRoundRateDelete(id: any) {
    return this.get(`/wardRoundRate/delete/${id}`)
  }
}
