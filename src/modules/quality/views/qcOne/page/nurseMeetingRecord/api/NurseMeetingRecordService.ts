import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class NurseMeetingRecordService extends BaseApiService {
  /**列表接口 */
  public getPage(query: any) {
    return this.post('/qcNurseMeetingRecord/findRecord', query)
  }

  /**新建编辑 */
  public saveOrUpdate(query: any) {
    return this.post('/qcNurseMeetingRecord/saveOrUpdate', query)
  }

  /**编辑详情接口 */
  public getEditDetail(id: string) {
    return this.get(`/qcNurseMeetingRecord/toSaveOrUpdate/${id}`)
  }

  /**详情接口 */
  public getDetail(id: string, wardCode: string) {
    return this.get(`/qcNurseMeetingRecord/detail/${wardCode}/${id}`)
  }

  /**删除 */
  public delete(id: string) {
    return this.get(`/qcNurseMeetingRecord/delete/${id}`)
  }

  /**已读 */
  // 
  public read(id: string) {
    return this.get(`/qcNurseMeetingRecord/receiveRead/${id}`)
  }
}

export const nurseMeetingRecordService = new NurseMeetingRecordService()