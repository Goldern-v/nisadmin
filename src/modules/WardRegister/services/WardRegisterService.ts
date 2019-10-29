import BaseApiService from 'src/services/api/BaseApiService'
export default class WardRegisterService extends BaseApiService {
  public getPage(obj: any) {
    return this.post(`/qcRegisterMaster/getPage`, obj)
  }
}

export const wardRegisterService = new WardRegisterService()
