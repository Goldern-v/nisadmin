import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class ModalService extends BaseApiService {
  /** 审核 */
  public auditeStatusNurse(type: string, obj: any) {
    return this.post(`/${type}/auditeStatusNurse`, this.stringify(obj))
  }
  /** 获取详情 */
  public getByIdAudite(type: string, id: any, empNo: any) {
    if (empNo == authStore!.user!.empNo) {
      return this.get(`/${type}/getById/${id}`)
    } else {
      return this.get(`/${type}/getByIdAudite/${id}`)
    }
  }
  // 基本信息获取详情
  public getByIdAuditeDis(type: string, empNo: any) {
    if (empNo == authStore!.user!.empNo) {
      return this.get(`/${type}/findByEmpNo/${empNo}`)
    } else {
      return this.get(`/${type}/findByEmpNoSubmit/${empNo}`)
    }
  }
  // 审核通过与否
  public auditeNurseFileIndex(type: string, obj: any) {
    return this.post(`/${type}/auditeStatusNurse`, this.stringify(obj))
  }
  // /nurseAttachment/auditeStatusNurse
  // 批量审核
  public auditeList(obj: any) {
    return this.post(`/auditeNurseFileIndexWH/auditeList`, obj)
  }
}

export const modalService = new ModalService()
