import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class ModalService extends BaseApiService {
  /** 审核 */
  public auditeStatusNurse (type: string, obj: any) {
    return this.post(`/${type}/auditeStatusNurse`, this.stringify(obj))
  }
  /** 获取详情 */
  public getByIdAudite (type: string, id: string) {
    return this.get(`/${type}/getByIdAudite/${id}`)
  }
  // 基本信息获取详情
  public getByIdAuditeDis (type: string) {
    return this.get(`/${type}/getByEmpNoAudite/${appStore.queryObj.empNo}`)
  }
}

export const modalService = new ModalService()
