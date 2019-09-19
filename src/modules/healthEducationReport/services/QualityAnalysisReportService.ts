import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { qualityAnalysisReportViewModal } from '../QualityAnalysisReportViewModal'
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

    return this.post(`/qcAnalysis/getReport`, appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/cancelPublish`, appStore.queryObj)
  }

  /** 更新上月质量问题，持续改进效果评价 */
  public updateImproveItemCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/improveItemCompareList`, obj)
  }
  /** 更新检查科室描述语 */
  public updateCheckDeptDesc(checkDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      checkDeptDesc: checkDeptDesc
    }
    return this.post(`/qcAnalysis/update/checkDeptDesc`, obj)
  }
  /** 更新质量扣分比 */
  public updateTypeCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/typeCompareList`, obj)
  }
  /** 更新本月质量扣分科室排序 */
  public updateDeptItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/deptItemList`, obj)
  }

  /** 更新重点问题 */
  public updateDetailItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/detailItemList`, obj)
  }
  /** 更新亮点问题 */
  public updateHighlightItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/highlightItemList`, obj)
  }
  /** 更新重点问题 */
  public updateKeyItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/keyItemList`, obj)
  }
  /** 更新持续改进问题 */
  public updateCurrentImproveItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/currentImproveItemList`, obj)
  }
  /** 更新追踪科室 */
  public updateFollowUpDeptDesc(followUpDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      followUpDeptDesc: followUpDeptDesc
    }
    return this.post(`/qcAnalysis/update/followUpDeptDesc`, obj)
  }
  /** 更新下个月重点检查 */
  public updateKeyCheckItemDesc(keyCheckItemDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      keyCheckItemDesc: keyCheckItemDesc
    }
    return this.post(`/qcAnalysis/update/keyCheckItemDesc`, obj)
  }
  /** 更新建议 */
  public updateSuggestions(suggestions?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      suggestions: suggestions
    }
    return this.post(`/qcAnalysis/update/suggestions`, obj)
  }
  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      reportName: reportName
    }
    return this.post(`/qcAnalysis/update/reportName`, obj)
  }
}

export const qualityAnalysisReportService = new QualityAnalysisReportService()
