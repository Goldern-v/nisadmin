import BaseApiService from 'src/services/api/BaseApiService'

interface BaseQueryType {
  recordCode: string
  wardCode: string
}
export default class WardRegisterService extends BaseApiService {
  /** 列表 */
  public getPage(obj: any) {
    return this.post(`/qcRegisterMaster/getPage`, obj)
  }
  /** 保存 */
  public saveAndSignAll(obj: any) {
    return this.post(`/qcRegisterMaster/saveAndSignAll`, obj)
  }
  /** 接班人签名 */
  public auditAll(ids: any[]) {
    return this.post(`/qcRegisterMaster/auditAll`, {
      list: ids.map((id) => ({ id }))
    })
  }
  /** 配置项 */
  public getCurrentList(obj: BaseQueryType) {
    return this.post(`/qcRegisterItem/getCurrentList`, obj)
  }
  /** 配置保存 */
  public qcRegisterItemSaveOrUpdate(obj: any) {
    return this.post(`/qcRegisterItem/saveOrUpdate`, obj)
  }
  /** 班次列表 */
  public qcRegisterRangeGetList(obj: BaseQueryType) {
    return this.post(`/qcRegisterRange/getList`, obj)
  }
  /** 班次保存 */
  public qcRegisterRangeSaveOrUpdate(obj: any) {
    return this.post(`/qcRegisterRange/saveOrUpdate`, obj)
  }
  /** 获取时间段 */
  public qcRegisterItemGetRevisionList(obj: any) {
    return this.post(`/qcRegisterItem/getRevisionList`, obj)
  }
}

export const wardRegisterService = new WardRegisterService()
