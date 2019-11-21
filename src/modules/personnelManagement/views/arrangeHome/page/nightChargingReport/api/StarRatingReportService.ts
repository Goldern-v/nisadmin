import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'
import { starRatingReportEditModel } from './../model/StarRatingReportEditModel'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class StarRatingReportService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcAnalysis/sr/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/qcAnalysis/sr/createReport', query)
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post('/qcAnalysis/sr/getReport', query)
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post('/qcAnalysis/sr/update/report', query)
  }

  /**更新星级考核 */
  public update(query: any) {
    return this.post('/qcAnalysis/sr/update/workScheduleList', query)
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcAnalysis/sr/deleteReport', query)
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post('/qcAnalysis/sr/publish', query)
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post('/qcAnalysis/sr/cancelPublish', query)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = starRatingReportEditModel.report
    let query = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post('/qcAnalysis/sr/update/report', query)
  }

  /** 更新星级考核 */
  public updateStarRattingList(itemList: any[]) {
    let { year, month, wardCode } = starRatingReportEditModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/sr/update/workScheduleList', query)
  }

  /**导出 */
  public exportData(query: { wardCode: string, year: string, month: string }) {
    return this.post('/qcFlReport/export/qcStarRating', query, { responseType: 'blob' })
  }
}

export const starRatingReportService = new StarRatingReportService()