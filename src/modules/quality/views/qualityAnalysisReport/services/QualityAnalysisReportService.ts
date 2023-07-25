import { appStore } from './../../../../../stores/index'
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
  public getReport_dgxg_one(obj?: any) {
    obj = {
      type: 'month',
      year: '2019',
      indexInType: 7,
      beginDate: '2019-07-01',
      endDate: '2019-07-31',
      groupRoleCode: 'QCR0017',
      reportName: '2019年度7月基础质控分析报告'
    }
    return this.post(`/qcAnalysisOne/getReport`, appStore.queryObj)
    
  }
  public deleteReport(obj?: any) {
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/deleteReport`, appStore.queryObj)
    }
    return this.post(`/qcAnalysis/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/publish`, appStore.queryObj)
    }
    return this.post(`/qcAnalysis/publish`, appStore.queryObj)
  }
  public cancelPublishReport(obj?: any) {
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/cancelPublish`, appStore.queryObj)
    }
    return this.post(`/qcAnalysis/cancelPublish`, appStore.queryObj)
  }

  /** 更新上月质量问题，持续改进效果评价 */
  public updateImproveItemCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/improveItemCompareList`, obj)
    }
    return this.post(`/qcAnalysis/update/improveItemCompareList`, obj)
  }
  /** 更新检查科室描述语 */
  public updateCheckDeptDesc(checkDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      checkDeptDesc: checkDeptDesc
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/checkDeptDesc`, obj)
    }
    return this.post(`/qcAnalysis/update/checkDeptDesc`, obj)
  }
  /** 更新2-1 */
  public updateReport(report?: any) {
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/report`, report)
    }
    return this.post(`/qcAnalysis/update/report`, report)
  }
  /** 更新质量扣分比 */
  public updateTypeCompareList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/typeCompareList`, obj)
    }
    return this.post(`/qcAnalysis/update/typeCompareList`, obj)
  }
  /** 更新本月质量扣分科室排序 */
  public updateDeptItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/deptItemList`, obj)
    }
    return this.post(`/qcAnalysis/update/deptItemList`, obj)
  }

  /** 更新重点问题 */
  public updateDetailItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/detailItemList`, obj)
    }
    return this.post(`/qcAnalysis/update/detailItemList`, obj)
  }
  /** 更新亮点问题 */
  public updateHighlightItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/highlightItemList`, obj)
    }
    return this.post(`/qcAnalysis/update/highlightItemList`, obj)
  }
  /** 更新重点问题 */
  public updateKeyItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/keyItemList`, obj)
    }
    return this.post(`/qcAnalysis/update/keyItemList`, obj)
  }
  /** 更新持续改进问题 */
  public updateCurrentImproveItemList(itemList?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      itemList: itemList
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/currentImproveItemList`, obj)
    }
    return this.post(`/qcAnalysis/update/currentImproveItemList`, obj)
  }
  /** 更新追踪科室 */
  public updateFollowUpDeptDesc(followUpDeptDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      followUpDeptDesc: followUpDeptDesc
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/followUpDeptDesc`, obj)
    }
    return this.post(`/qcAnalysis/update/followUpDeptDesc`, obj)
  }
  /** 更新下个月重点检查 */
  public updateKeyCheckItemDesc(keyCheckItemDesc?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      keyCheckItemDesc: keyCheckItemDesc
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/keyCheckItemDesc`, obj)
    }
    return this.post(`/qcAnalysis/update/keyCheckItemDesc`, obj)
  }
  /** 更新建议 */
  public updateSuggestions(suggestions?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      suggestions: suggestions
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      return this.post(`/qcAnalysisOne/update/suggestions`, obj)
    }
    return this.post(`/qcAnalysis/update/suggestions`, obj)
  }
  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let obj = {
      ...qualityAnalysisReportViewModal.report,
      reportName: reportName
    }
    if(appStore.queryObj.qcOne=='monthReport'){
    return this.post(`/qcAnalysisOne/update/reportName`, obj)
    }
    return this.post(`/qcAnalysis/update/reportName`, obj)
  }
}

export const qualityAnalysisReportService = new QualityAnalysisReportService()
