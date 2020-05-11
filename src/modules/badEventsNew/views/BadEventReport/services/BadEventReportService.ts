import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { badEventReportModel } from '../BadEventReportModel'
export default class BadEventReportService extends BaseApiService {
  /** 获取病区护理工作报表 */
  public getReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/getReport`, obj || appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/wn/cancelPublish`, appStore.queryObj)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = badEventReportModel.report
    let obj = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post(`/qcAnalysis/wn/update/report`, obj)
  }

  /** 更新护理工作计划 */
  public updateWorkScheduleList(itemList?: any) {
    let obj = {
      ...badEventReportModel.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/wn/update/workScheduleList`, obj)
  }
  /** 更新病区检查 */
  public updateWardCheckList(itemList?: any) {
    let obj = {
      ...badEventReportModel.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/wn/update/wardCheckList`, obj)
  }
  /** 更新护士会议 */
  public updateNurseMeetingList(itemList?: any) {
    let obj = {
      ...badEventReportModel.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/wn/update/nurseMeetingList`, obj)
  }
  /** 更新不良事件 */
  public updateBadEventList(itemList?: any) {
    let obj = {
      ...badEventReportModel.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/wn/update/badEventList`, obj)
  }
  /** 更新人力资源调配 */
  public updateHrAllocationList(itemList?: any) {
    let obj = {
      ...badEventReportModel.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/wn/update/hrAllocationList`, obj)
  }
}

export const badEventReportService = new BadEventReportService()
