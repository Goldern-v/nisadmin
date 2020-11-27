import { appStore } from '../../../../../stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { workSummaryReportViewModal } from '../ReportModal'
export default class WorkSummaryReportService extends BaseApiService {
  /** 获取分析报告 */
  public getReport(obj?: any) {
    return this.post(`/qcAnalysis2L/getReport`, obj || appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis2L/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis2L/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis2L/cancelPublish`, appStore.queryObj)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      reportName
    }
    return this.post(`/qcAnalysis2L/update/report`, obj)
  }

  /** 本月片区人力资源调配 */
  public updateHrAllocationList(itemList?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      itemList
    }
    return this.post(`/qcAnalysis2L/update/hrAllocationList`, obj)
  }

  /** 本月片区不良事件汇总表 */
  public updateBadEventList(itemList?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      itemList
    }
    return this.post(`/qcAnalysis2L/update/badEventList`, obj)
  }

  /** 本月护理质量检查问题及持续改进 */
  public updateImproveItemList(itemList?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      itemList
    }
    return this.post(`/qcAnalysis2L/update/improveItemList`, obj)
  }

  /** 下月工作重点 */
  public updateKeyItemList(itemList?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      itemList
    }
    return this.post(`/qcAnalysis2L/update/keyItemList`, obj)
  }

  /** 更新团建内容 */
  public updateTeamBuildingDesc(teamBuildingDesc?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report
    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      teamBuildingDesc
    }
    return this.post(`/qcAnalysis2L/update/report`, obj)
  }

  /** 更新附件 */
  public updateAttachList(itemList?: any) {
    let { year, type, indexInType, groupRoleCode } = workSummaryReportViewModal.report

    let obj = {
      year,
      type,
      indexInType,
      groupRoleCode,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/update/attachList`, obj)
  }

  /** 上传附件 */
  public uploadAttachment(obj: any) {
    const trancePostData = new FormData()
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        trancePostData.append(key, obj[key])
      }
    }
    return this.post(`/file/uploadAttachment/qcReport2L`, trancePostData)
  }
}

export const workSummaryReportService = new WorkSummaryReportService()
