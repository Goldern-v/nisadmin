
import BaseApiService from 'src/services/api/BaseApiService'
export default class QcFormHjService extends BaseApiService {
  /** 护理质量巡查情况汇总表 */
  public countResult(params: any) {
    return this.post(`/qcCount/countResult`, params)
  }

  /** 护理质量检查小结 */
  public countDetail(params: any) {
    return this.post(`/qcCount/countDetail`, params)
  }
}

export const qcFormHjService = new QcFormHjService()