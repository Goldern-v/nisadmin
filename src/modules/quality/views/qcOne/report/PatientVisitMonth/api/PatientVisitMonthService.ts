import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'
import { patientVisitMonthModel } from '../model/PatientVisitMonthModel'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class PatientVisitMonthService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcAnalysis/pvm/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/qcAnalysis/pvm/createReport', query)
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post('/qcAnalysis/pvm/getReport', query)
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post('/qcAnalysis/pvm/update/report', query)
  }

  /**更新随访记录 */
  public update(query: any) {
    return this.post('/qcAnalysis/pvm/update/patientVisitList', query)
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcAnalysis/pvm/deleteReport', query)
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post('/qcAnalysis/pvm/publish', query)
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post('/qcAnalysis/pvm/cancelPublish', query)
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = patientVisitMonthModel.report
    let query = {
      year,
      month,
      wardCode,
      reportName
    }
    return this.post('/qcAnalysis/pvm/update/report', query)
  }

  /** 更新备注 */
  public updateWardRemark(wardRemark?: any) {
    let { year, month, wardCode } = patientVisitMonthModel.report
    let query = {
      year,
      month,
      wardCode,
      wardRemark
    }
    return this.post('/qcAnalysis/pvm/update/report', query)
  }

  /** 更新月度随访 */
  public updatePatientVisitList(itemList: any[]) {
    let { year, month, wardCode } = patientVisitMonthModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/pvm/update/patientVisitList', query)
  }

  /** 更新附件 */
  public updateAttachmentList(itemList: any[]) {
    let { year, month, wardCode } = patientVisitMonthModel.report
    let query = {
      year,
      month,
      wardCode,
      itemList
    }

    return this.post('/qcAnalysis/pvm/update/attachmentList', query)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }

  /**修改抽查报告 */
  public relPvmItem(params: any) {
    return this.post('/qcAnalysis/pvm/update/relPvmItem', params)
  }
}

export const patientVisitMonthService = new PatientVisitMonthService()