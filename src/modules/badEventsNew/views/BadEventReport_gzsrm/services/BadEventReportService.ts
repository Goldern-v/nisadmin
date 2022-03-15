import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
export default class BadEventReportService extends BaseApiService {
  /** 获取病区护理工作报表 */
  public getReport(params: any) {
    return this.post('/badEventReport/getReport', params)
  }
  public deleteReport(obj?: any) {
    let { id } = obj
    return this.get(`/badEventReport/deleteReportById/${id}`)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/cancelPublish`, appStore.queryObj)
  }

  /**获取不良事件类型 */
  public getEventTypeList() {
    return this.post('/dept/dictInfo', qs.stringify({ code: 'badEvent_eventType' }))
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }

  public saveReport(params:any){
    return this.post(`/badEventReport/saveReport`,params);
  }
}

export const badEventReportService = new BadEventReportService()
