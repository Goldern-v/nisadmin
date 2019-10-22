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
}

export const qcOneService = new QcOneService()
