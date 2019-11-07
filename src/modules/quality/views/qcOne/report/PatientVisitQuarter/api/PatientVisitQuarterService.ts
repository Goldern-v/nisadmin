import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'
import { patientVisitQuarterModel } from '../model/PatientVisitQuarterModel'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class PatientVisitQuarterService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcAnalysis/pvq/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/qcAnalysis/pvq/createReport', query)
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post('/qcAnalysis/pvq/getReport', query)
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post('/qcAnalysis/pvq/update/report', query)
  }

  /**更新随访记录 */
  public update(query: any) {
    return this.post('/qcAnalysis/pvq/update/patientVisitList', query)
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcAnalysis/pvq/deleteReport', query)
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post('/qcAnalysis/pvq/publish', query)
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post('/qcAnalysis/pvq/cancelPublish', query)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = patientVisitQuarterModel.report
    let query = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post('/qcAnalysis/pvq/update/report', query)
  }

  /** 更新季度随访 */
  public updatePatientVisitList(itemList: any[]) {
    let { year, month, wardCode } = patientVisitQuarterModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/pvq/update/patientVisitList', query)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }
}

export const patientVisitQuarterService = new PatientVisitQuarterService()