import BaseApiService from 'src/services/api/BaseApiService'
export default class QcFormNysService extends BaseApiService {
  /**护理质量巡查情况汇总表 */
  public countResult(params: any) {
    return this.post(`/qcCount/countResult`, params)
  }

  /**质控项目问题频次统计 */
  public countNoItem(params: any) {
    return this.post(`/qcCount/countNoItem`, params)
  }

  /**护理质量检查小结 */
  public countDetail(params: any) {
    return this.post(`/qcCount/countDetail`, params)
  }

  /**护理质量巡查情况汇总表 */
  public countResultExport(params: any) {
    return this.post(`/qcCount/countResult/export`, params, { responseType: 'blob' })
  }

  /**护理质量检查小结导出 */
  public countDetailExport(params: any) {
    return this.post(`/qcCount/countDetail/export`, params, { responseType: 'blob' })
  }

  /**导出质控项目问题频次统计 */
  public countNoItemExport(params: any) {
    return this.post(`/qcCount/countNoItem/export`, params, { responseType: 'blob' })
  }
}

export const qcFormNysService = new QcFormNysService()