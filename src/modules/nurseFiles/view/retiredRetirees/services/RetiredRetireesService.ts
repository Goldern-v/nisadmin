import BaseApiService from 'src/services/api/BaseApiService'
export default class RetiredRetireesService extends BaseApiService {
  public countNurseLeave(obj: any) {
    return this.post(`/nurseInformation/countNurseLeave`, obj)
  }
  public excelNurseLeave(obj: any) {
    return this.post(`/nurseInformation/excelNurseLeave`, obj, { responseType: 'blob' })
  }
}

export const retiredRetireesService = new RetiredRetireesService()
