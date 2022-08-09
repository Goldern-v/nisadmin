import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export interface saveTextIn {
  id: string
  text: string
}
export default class GoodOrBadApi extends BaseApiService {
  /** 获取病区护理工作报表 */
  public getDetailList(obj?: any) {
    let { id } = obj
    return this.get(`/wardRoundRate/getDetailList?rateId=${id}`,)
  }
  public deleteReport(obj?: any) {
    let { id } = obj
    return this.get(`/badEventReport/deleteReportById/${id}`)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/cancelPublish`, appStore.queryObj)
  }
  public getPointCount(obj?: any) {
    return this.post(`/room/pointCount/getPointCount`, obj)
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }
  // 保存查房记录
  public saveReport(params: any) {
    return this.post(`/wardRoundRate/saveData`, params);
  }
  /**保存文本 */
  public saveText(params: saveTextIn) {
    return this.post(`/wardRoundRate/saveText`, params);
  }
  /**获取文本 */
  public getText(id: string) {
    return this.get(`/wardRoundRate/getText/${id}`);
  }

}

export const goodOrBadApi = new GoodOrBadApi()
