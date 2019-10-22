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

  /** 人力资源 */
  public qcHrAllocationGetPage(obj: PageObj) {
    return this.post(`/qcHrAllocation/getPage`, obj)
  }
}

export const qcOneService = new QcOneService()
