import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'
import { safetyCheckEditModel } from './../model/SafetyCheckEditModel'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class SafetyCheckReportService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcAnalysis/qsc/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/qcAnalysis/qsc/createReport', query)
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post('/qcAnalysis/qsc/getReport', query)
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post('/qcAnalysis/qsc/update/report', query)
  }

  /**更新安全隐患排查recordList */
  public updateRecordList(query: any) {
    let { year, month, wardCode } = safetyCheckEditModel.report
    return this.post('/qcAnalysis/qsc/update/safetyCheckRecordList', {
      ...query,
      year, month, wardCode
    })
  }

  /**更新安全隐患排查contentList */
  public updateContentList(query: any, contentType: string) {
    let { year, month, wardCode } = safetyCheckEditModel.report
    return this.post(`/qcAnalysis/qsc/update/content/${contentType}`, {
      ...query,
      year, month, wardCode
    })
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcAnalysis/qsc/deleteReport', query)
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post('/qcAnalysis/qsc/publish', query)
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post('/qcAnalysis/qsc/cancelPublish', query)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = safetyCheckEditModel.report
    let query = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post('/qcAnalysis/qsc/update/report', query)
  }

  /** 更新安全隐患排查 */
  public updateStarRattingList(itemList: any[]) {
    let { year, month, wardCode } = safetyCheckEditModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/qsc/update/workScheduleList', query)
  }

  /**导出 */
  public exportData(query: { wardCode: string, year: string, month: string }) {
    return this.post('/qcFlReport/export/qcStarRating', query, { responseType: 'blob' })
  }
}

export const safetyCheckReportService = new SafetyCheckReportService()