import BaseApiService from 'src/services/api/BaseApiService'
export default class WardRegisterService extends BaseApiService {
  public getList(obj: { recordCode: string; wardCode: string }) {
    return this.post(`/qcRegisterRange/getList`, obj)
  }
}

export const wardRegisterService = new WardRegisterService()
