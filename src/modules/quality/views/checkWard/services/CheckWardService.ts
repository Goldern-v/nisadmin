import BaseApiService from 'src/services/api/BaseApiService'
export default class CheckWardService extends BaseApiService {
  public countNurseLeave(obj: any) {
    return this.post(`/nurseInformation/countNurseLeave`, obj)
  }
  public excelNurseLeave(obj: any) {
    return this.post(`/nurseInformation/excelNurseLeave`, obj, { responseType: 'blob' })
  }
}

export const checkWardService = new CheckWardService()
