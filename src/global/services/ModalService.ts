import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class ModalService extends BaseApiService {
  /** 审核 */
  public auditeStatusNurse(type: string, obj: any) {
    return this.post(`/${type}/auditeStatusNurse`, this.stringify(obj))
  }
  /** 获取详情 */
  public getByIdAudite(type: string, id: any) {
    if (appStore.selfNurseFile)
      return this.get(`/${type}/getById/${id}`)
    else
      return this.get(`/${type}/getByIdAudite/${id}`)
  }
  // 基本信息获取详情
  public getByIdAuditeDis(type: string, empNo: any) {
    if (appStore.selfNurseFile)
      return this.get(`/${type}/getByEmpNo/${empNo}`)
    else
      return this.get(`/${type}/getByEmpNoAudite/${empNo}`)
  }
  // 审核通过与否
  public auditeNurseFileIndex(type: string, obj: any) {
    return this.post(`/${type}/auditeStatusNurse`, this.stringify(obj))
  }
  // /nurseAttachment/auditeStatusNurse
  // 批量审核
  public auditeList(obj: any) {
    return this.post(`/auditeNurseFileIndex/auditeList`, obj)
  }
  // 个人审核界面批量审核-江门妇幼护士长手册
  public auditeListJM(obj: any) {
    return this.post(`/nurseManualJM/batchAuditedPersonal`, obj)
  }
  // 批量审核-南医三
  public auditeListNys(obj: any) {
    return this.post(`/auditeNurseFileIndexNys/auditeList`, obj)
  }
}

export const modalService = new ModalService()
