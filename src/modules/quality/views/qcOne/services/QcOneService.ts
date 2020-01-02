import { PageOptions } from 'src/components/BaseTable'
import BaseApiService from 'src/services/api/BaseApiService'

interface PageObj extends PageOptions {
  wardCode: string
}

export default class QcOneService extends BaseApiService {
  /** 随访记录 */
  public qcPatientVisitGetPage(obj: PageObj) {
    return this.post(`/qcPatientVisit/getPage`, obj)
  }
  public qcPatientVisitSaveOrUpdate(obj: any) {
    return this.post(`/qcPatientVisit/saveOrUpdate`, obj)
  }
  public qcPatientVisitDelete(id: any) {
    return this.get(`/qcPatientVisit/delete/${id}`)
  }
  public qcPatientDetail(id: any) {
    return this.get(`/qcPatientVisit/getDetail/${id}`)
  }

  /** 安全隐患 */
  public qcSafetyCheckGetPage(obj: PageObj) {
    return this.post(`/qcSafetyCheck/getPage`, obj)
  }
  public qcSafetyCheckSaveOrUpdate(obj: any) {
    return this.post(`/qcSafetyCheck/saveOrUpdate`, obj)
  }
  public qcSafetyCheckDelete(id: any) {
    return this.get(`/qcSafetyCheck/delete/${id}`)
  }
  public qcSafetyGetDetail(id: any) {
    return this.get(`/qcSafetyCheck/getDetail/${id}`)
  }

  /** 人力资源 */
  public qcNurseTransferGetPage(obj: PageObj) {
    return this.post(`/nurseTransfer/getPage`, obj)
  }

  /**一级质控报告 */
  //不良事件报告=be，月度随访表=pvm，季度随访表=pvq，星级考核报告=sr，病区护理工作计划表=wn
  /**获取片区提交记录 */
  public getCommitList(
    query: {
      year: string,
      wardCode: string //片区编号
    }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/getCommitList`, query)
  }

  /**科护士长提交给护理部 */
  public publishToMd(
    query: {
      year: string,
      month: string,
      wardCode: string //片区编号
    }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/publishToMd`, query)
  }

  /**科护士长撤销 */
  public cancelPublishToMd(
    query: {
      year: string,
      month: string,
      wardCode: string //片区编号
    }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/cancelPublishToMd`, query)
  }

  /**获取归档记录 */
  public getArchiveList(
    query: { year: string }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/getArchiveList`, query)
  }

  /**护理部归档 */
  public archive(
    query: {
      year: string,
      month: string
    }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/archive`, query)
  }

  /**护理部撤销归档 */
  public cancelArchive(
    query: { year: string, month: string }, //传参
    reportSimpleCode: string //报告类型
  ) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/cancelArchive`, query)
  }

  /**获取质控片区 */
  public bigDeptListSelf() {
    return this.get('/qcItem/dict/bigDeptListSelf')
  }

  /**导出 */
  public export(query: any, reportSimpleCode: string) {
    // qcPatientVisitQuarter
    return this.post(`/qcAnalysis/${reportSimpleCode}/export/dept`, query, { responseType: 'blob' })
  }

  /**片区导出 */
  public exportByBigDept(query: any, reportSimpleCode: string) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/export/bigDept`, query, { responseType: 'blob' })
  }

  /**全院导出 */
  public exportByNd(query: any, reportSimpleCode: string) {
    return this.post(`/qcAnalysis/${reportSimpleCode}/export/nd`, query, { responseType: 'blob' })
  }
}

export const qcOneService = new QcOneService()
