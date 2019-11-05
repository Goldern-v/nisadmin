import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import { checkWardReportViewModal } from '../CheckWardReportViewModal'
export default class CheckWardReportService extends BaseApiService {
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

  /**删除 */
  public deleteReport(id: string) {
    return this.get(`/srReport/delete/${id}`)
  }

  /**发布报告 */
  public publishReport(id: string) {
    return this.get(`/srReport/publish/${id}`)
  }

  /**撤销发布报告 */
  public cancelPublishReport(id: string) {
    return this.get(`/srReport/revoke/${id}`)
  }

  /** 更新上月质量问题，持续改进效果评价 */
  public updateImproveItemCompareList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/improveItemCompareList`, obj)
  }
  /** 更新检查科室描述语 */
  public updateCheckDeptDesc(checkDeptDesc?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      checkDeptDesc: checkDeptDesc
    }
    return this.post(`/qcAnalysis/update/checkDeptDesc`, obj)
  }
  /** 更新2-1 */
  public updateReport(report?: any) {
    return this.post(`/qcAnalysis/update/report`, report)
  }
  /** 更新质量扣分比 */
  public updateTypeCompareList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/typeCompareList`, obj)
  }
  /** 更新本月质量扣分科室排序 */
  public updateDeptItemList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/deptItemList`, obj)
  }

  /** 更新重点问题 */
  public updateDetailItemList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/detailItemList`, obj)
  }
  /** 更新亮点问题 */
  public updateHighlightItemList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/highlightItemList`, obj)
  }
  /** 更新重点问题 */
  public updateKeyItemList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/keyItemList`, obj)
  }
  /** 更新持续改进问题 */
  public updateCurrentImproveItemList(itemList?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      itemList: itemList
    }
    return this.post(`/qcAnalysis/update/currentImproveItemList`, obj)
  }
  /** 更新追踪科室 */
  public updateFollowUpDeptDesc(followUpDeptDesc?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      followUpDeptDesc: followUpDeptDesc
    }
    return this.post(`/qcAnalysis/update/followUpDeptDesc`, obj)
  }
  /** 更新下个月重点检查 */
  public updateKeyCheckItemDesc(keyCheckItemDesc?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      keyCheckItemDesc: keyCheckItemDesc
    }
    return this.post(`/qcAnalysis/update/keyCheckItemDesc`, obj)
  }
  /** 更新建议 */
  public updateSuggestions(suggestions?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      suggestions: suggestions
    }
    return this.post(`/qcAnalysis/update/suggestions`, obj)
  }
  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let obj = {
      ...checkWardReportViewModal.report,
      reportName: reportName
    }
    return this.post(`/qcAnalysis/update/reportName`, obj)
  }
}

export const checkWardReportService = new CheckWardReportService()
