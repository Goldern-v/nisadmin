import BaseApiService from "src/services/api/BaseApiService";

interface BaseQueryType {
  recordCode: string;
  wardCode: string;
}
export default class WardRegisterService extends BaseApiService {
  /** 接班人签名 */
  public auditAll(ids: any[]) {
    return this.post(`/qcRegisterMaster/auditAll`, {
      list: ids.map(id => ({ id }))
    });
  }
  /** 配置项 */
  public getCurrentList(obj: BaseQueryType) {
    return this.post(`/qcRegisterItem/getCurrentList`, obj);
  }
  /** 配置保存 */
  public qcRegisterItemSaveOrUpdate(obj: any) {
    return this.post(`/qcRegisterItem/saveOrUpdate`, obj);
  }
  /** 班次列表 */
  public qcRegisterRangeGetList(obj: BaseQueryType) {
    return this.post(`/qcRegisterRange/getList`, obj);
  }
  /** 班次保存 */
  public qcRegisterRangeSaveOrUpdate(obj: any) {
    return this.post(`/qcRegisterRange/saveOrUpdate`, obj);
  }
  /** 获取时间段 */
  public qcRegisterItemGetRevisionList(obj: any) {
    return this.post(`/qcRegisterItem/getRevisionList`, obj);
  }

  /** new */

  /** 获取时间段 */
  public qcRegisterBlockGetList(registerCode: string, wardCode: string) {
    return this.get(`/qcRegisterBlock/${registerCode}/getList/${wardCode}`);
  }
  /** 创建 */
  public qcRegisterBlockCreate(registerCode: string, wardCode: string) {
    return this.get(`/qcRegisterBlock/${registerCode}/create/${wardCode}`);
  }
  /** 获取block详情 */
  public getPage(registerCode: string, obj: any) {
    return this.post(`/qcRegisterData/${registerCode}/getPage`, obj);
  }
  /** 保存 block 数据 */
  public saveAndSignAll(registerCode: string, blockId: any, list: any[]) {
    return this.post(`/qcRegisterData/${registerCode}/saveAndSignAll`, {
      blockId,
      list
    });
  }
  /** 获取 block 配置项 */
  public getItemConfigByBlockId(registerCode: string, blockId: any) {
    return this.get(
      `/qcRegisterItem/${registerCode}/getListByBlockId/${blockId}`
    );
  }
  /** 保存 block 配置项 */
  public saveOrUpdateItemConfig(
    registerCode: string,
    blockId: any,
    list: any[]
  ) {
    return this.post(`/qcRegisterItem/${registerCode}/saveOrUpdateWhole`, {
      blockId,
      list
    });
  }
  /** 获取 block 班次 */
  public getRangeConfigByBlockId(blockId: any) {
    return this.get(`/qcRegisterRange/getListByBlockId/${blockId}`);
  }
  /** 保存 block 配置项 */
  public saveOrUpdateRangeConfig(blockId: any, list: any[]) {
    return this.post(`/qcRegisterRange/saveOrUpdateWhole`, {
      blockId,
      list
    });
  }
}

export const wardRegisterService = new WardRegisterService();
