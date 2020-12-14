import { appStore } from '../../../../../stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { qualityAnalysisReportViewModal } from '../ReportViewModal'
export default class QualityAnalysisReportService extends BaseApiService {
  /** 获取分析报告 */
  public getReport(obj?: any) {
    obj = {
      type: 'month',
      year: '2019',
      indexInType: 7,
      beginDate: '2019-07-01',
      endDate: '2019-07-31',
      groupRoleCode: 'QCR0017',
      reportName: '2019年度7月基础质控分析报告'
    }

    return this.post(`/qcAnalysis2L/epSummary/getReport`, appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis2L/epSummary/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis2L/epSummary/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis2L/epSummary/cancelPublish`, appStore.queryObj)
  }

  /** 更新上周防疫专项检查问题，持续改进效果评价 */
  public updateImproveItemCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/improveItemCompareList`, obj)
  }
  /** 更新检查科室描述语 */
  public updateCheckDeptDesc(checkDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      checkDeptDesc: checkDeptDesc
    }
    return this.post(`/qcAnalysis2L/epSummary/update/checkDeptDesc`, obj)
  }
  /** 更新2-1 */
  public updateReport(report?: any) {
    return this.post(`/qcAnalysis2L/epSummary/update/report`, report)
  }
  /** 更新质量扣分比 */
  public updateTypeCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/typeCompareList`, obj)
  }
  /** 更新本周防疫专项检查扣分科室排序 */
  public updateDeptItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/deptItemList`, obj)
  }

  /** 更新重点问题 */
  public updateDetailItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/detailItemList`, obj)
  }
  /** 更新亮点问题 */
  public updateHighlightItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/highlightItemList`, obj)
  }
  /** 更新本周防疫专项检查整改措施 */
  public updateMeasureList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/measureList`, obj)
  }
  /** 更新重点问题 */
  public updateKeyItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/keyItemList`, obj)
  }
  /** 更新持续改进问题 */
  public updateCurrentImproveItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis2L/epSummary/update/currentImproveItemList`, obj)
  }
  /** 更新追踪科室 */
  public updateFollowUpDeptDesc(followUpDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      followUpDeptDesc: followUpDeptDesc
    }
    return this.post(`/qcAnalysis2L/epSummary/update/followUpDeptDesc`, obj)
  }
  /** 更新下个月重点检查 */
  public updateKeyCheckItemDesc(keyCheckItemDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      keyCheckItemDesc: keyCheckItemDesc
    }
    return this.post(`/qcAnalysis2L/epSummary/update/keyCheckItemDesc`, obj)
  }
  /** 更新建议 */
  public updateSuggestions(suggestions?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      suggestions: suggestions
    }
    return this.post(`/qcAnalysis2L/epSummary/update/suggestions`, obj)
  }
  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      reportName: reportName
    }
    return this.post(`/qcAnalysis2L/epSummary/update/reportName`, obj)
  }
}

export const qualityAnalysisReportService = new QualityAnalysisReportService()
