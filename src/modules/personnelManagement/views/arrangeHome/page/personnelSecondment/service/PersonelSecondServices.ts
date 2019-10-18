import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'

interface SaveObj {
  empNo: string
  startDate: string
  deptCode: string
  deptName: string
  empNoTransferTo: string
  empNameTransferTo: string
  deptNameTransferTo: string
  deptCodeTransferTo: string
  detailTransferTo: string
}

interface PageObj extends PageOptions {
  deptCode: string
}

export default class PersonelSecondServices extends BaseApiService {
  // 人员借出列表
  // public getByDeptCode(deptCode: string) {
  //   return this.get(`/schDeptTransferWH/getByDeptCode/${deptCode}`)
  // }

  public getByDeptCode(pageObj: PageObj) {
    return this.post(`/schDeptTransferWH/getByDeptCode`, pageObj)
  }
  // 护士列表
  public getNursingByDeptCode(deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }
  // 借出护士保存
  public saveOrUpdate(saveObj: SaveObj) {
    return this.post(`/schDeptTransferWH/saveOrUpdate`, saveObj)
  }
}

export const personelSecondServices = new PersonelSecondServices()
