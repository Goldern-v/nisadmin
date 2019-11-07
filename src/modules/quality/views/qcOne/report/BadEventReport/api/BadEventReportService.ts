import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'
import { badEventReportEditModel } from '../model/BadEventReportEditModel'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class BadEventReportService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcAnalysis/be/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/qcAnalysis/be/createReport', query)
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post('/qcAnalysis/be/getReport', query)
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post('/qcAnalysis/be/update/report', query)
  }

  /**更新不良事件报告 */
  public update(query: any) {
    return this.post('/qcAnalysis/be/update/badEventList', query)
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcAnalysis/be/deleteReport', query)
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post('/qcAnalysis/be/publish', query)
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post('/qcAnalysis/be/cancelPublish', query)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = badEventReportEditModel.report
    let query = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post('/qcAnalysis/be/update/report', query)
  }

  /** 更新星级考核 */
  public updateBadEventList(itemList: any[]) {
    let { year, month, wardCode } = badEventReportEditModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/be/update/badEventList', query)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }
}

export const badEventReportService = new BadEventReportService()