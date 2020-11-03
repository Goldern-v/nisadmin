import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { badEventReportModel } from '../BadEventReportModel'
export default class BadEventReportService extends BaseApiService {
  /** 获取病区护理工作报表 */
  public getReport(obj?: any) {
    return this.post(`/beReport/list/${obj.id}`)
  }
  public deleteReport(obj?: any) {
    let { id } = badEventReportModel.report
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
}

export const badEventReportService = new BadEventReportService()
