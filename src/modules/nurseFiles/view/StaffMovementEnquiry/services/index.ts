import BaseApiService from 'src/services/api/BaseApiService'
export default class RetiredRetireesService extends BaseApiService {
  public nurseTransferQuery(obj: any) {
    return this.post(`/nurseTransfer/query`, obj)
  }
  public excelNurseLeave(obj: any) {
    return this.post(`/nurseInformation/excelNurseLeave`, obj, { responseType: 'blob' })
  }
}

export const retiredRetireesService = new RetiredRetireesService()
