import BaseApiService from 'src/services/api/BaseApiService'
export default class PersonelSecondServices extends BaseApiService {
  // 人员借出列表
  public getByDeptCode(deptCode: string) {
    return this.post(`/schDeptTransferWH/getByDeptCode/${deptCode}`)
  }
}

export const personelSecondServices = new PersonelSecondServices()
