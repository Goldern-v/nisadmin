import { appStore } from '../../../../../stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { qualityAnalysisReportViewModal } from '../QualityAnalysisReportPoolViewModal'
export default class QualityAnalysisReportPoolService extends BaseApiService {
  /** 获取分析报告 */
  public getReport(obj?: any) {
    obj = {
      type: 'month',
      year: '2019',
      indexInType: 8,
      itemList: [
        {
          id: 1113,
          qcGroupCode: 'QCR0017',
          qcGroupName: '基础护理',
          content: 'BI评分与患者实际情况相符：儿科二护理单元',
          highlightItem: true
        }
      ]
    }

    return this.post(`/qcSummary/getReport`, obj || appStore.queryObj)
  }
  public deleteReport(obj?: any) {
    return this.post(`/qcAnalysis/deleteReport`, appStore.queryObj)
  }
  public publishReport(obj?: any) {
    return this.post(`/qcAnalysis/publish`, appStore.queryObj)
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
  /** 更新病区质量考核前十 */
  public updateNotDeductDeptDesc(notDeductDeptDesc: any) {
    let { year, type, indexInType } = qualityAnalysisReportViewModal.report;
    let params = {
      year,
      type,
      indexInType,
      notDeductDeptDesc
    }

    return this.post(`/qcSummary/update/notDeductDeptDesc`, params)
  }
  /** 更新病区质量扣分前十 */
  public updateTopRankDeptItemList(itemList: any) {
    let { year, type, indexInType } = qualityAnalysisReportViewModal.report;
    let params = {
      year,
      type,
      indexInType,
      itemList
    }

    return this.post(`/qcSummary/update/topRankDeptItemList`, params)
  }
  /** 更新特殊科室质量扣分 */
  public updateSpecialDeptItemList(itemList: any) {
    let { year, type, indexInType } = qualityAnalysisReportViewModal.report;
    let params = {
      year,
      type,
      indexInType,
      itemList
    }

    return this.post(`/qcSummary/update/specialDeptItemList`, params)
  }
  /** 更新特殊监护病房质量扣分 */
  public updateIcuDeptItemList(itemList: any) {
    let { year, type, indexInType } = qualityAnalysisReportViewModal.report;
    let params = {
      year,
      type,
      indexInType,
      itemList
    }

    return this.post(`/qcSummary/update/icuDeptItemList`, params)
  }
  /** 更新门诊科室质量扣分 */
  public updateOpdeptItemList(itemList: any) {
    let { year, type, indexInType } = qualityAnalysisReportViewModal.report;
    let params = {
      year,
      type,
      indexInType,
      itemList
    }

    return this.post(`/qcSummary/update/opdDeptItemList`, params)
  }
}

export const qualityAnalysisReportPoolService = new QualityAnalysisReportPoolService()
