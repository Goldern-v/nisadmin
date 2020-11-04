import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { badEventReportModel } from '../BadEventReportModel'
import qs from 'qs'
export default class BadEventReportService extends BaseApiService {
  /** 获取病区护理工作报表 */
  public getReport(obj?: any) {
    return this.post(`/beReport/list/${obj.id}`)
  }
  public deleteReport(obj?: any) {
    let { id } = appStore.queryObj
    return this.get(`/beReport/deleteReport/${id}`)
  }
  public publishReport(obj?: any) {
    let { id } = badEventReportModel.report
    return this.post(`/beReport/release/${id}`)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/cancelPublish`, appStore.queryObj)
  }

  /** 更新报告名称 */
  public updateReportName(name?: any) {
    let { id } = badEventReportModel.report
    let obj = {
      id,
      name
    }
    return this.post(`/beReport/updateInstance`, obj)
  }

  /**更新报告 */
  public updateReport(obj: any) {
    let { id } = badEventReportModel.report
    return this.post('/beReport/updateReport', { ...obj, reportId: id })
  }

  /**编辑分析报告文字描述 */
  public updateReportDesc(obj: any) {
    let { id } = badEventReportModel.report
    return this.post('/beReport/updateReportDesc', { ...obj, reportId: id })
  }

  /**获取不良事件类型 */
  public getEventTypeList() {
    return this.post('/dept/dictInfo', qs.stringify({ code: 'badEvent_eventType' }))
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }
}

export const badEventReportService = new BadEventReportService()
