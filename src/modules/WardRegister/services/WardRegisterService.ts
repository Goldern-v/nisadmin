import BaseApiService from 'src/services/api/BaseApiService'
export default class WardRegisterService extends BaseApiService {
  /** 列表 */
  public getPage(obj: any) {
    return this.post(`/qcRegisterMaster/getPage`, obj)
  }
  /** 保存 */
  public saveAndSignAll(obj: any) {
    return this.post(`/qcRegisterMaster/saveAndSignAll`, obj)
  }
  /** 配置项 */
  public getCurrentList(obj: { recordCode: string; wardCode: string }) {
    return this.post(`/qcRegisterItem/getCurrentList`, obj)
  }
  /** 配置保存 */
  public qcRegisterItemSaveOrUpdate(obj: any) {
    return this.post(`/qcRegisterItem/saveOrUpdate`, obj)
  }
}

export const wardRegisterService = new WardRegisterService()
