import { authStore } from "./../../../stores/index";
import BaseApiService from "src/services/api/BaseApiService";

interface BaseQueryType {
  recordCode: string;
  wardCode: string;
}
export default class WardRegisterService extends BaseApiService {
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
  public saveAndSignAll(
    registerCode: string,
    blockId: any,
    itemDataList: any[],
    sign: boolean = false
  ) {
    return this.post(`/qcRegisterData/${registerCode}/saveAndSignAll`, {
      blockId,
      itemDataList,
      sign
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
    itemList: any[]
  ) {
    return this.post(`/qcRegisterItem/${registerCode}/saveOrUpdateWhole`, {
      blockId,
      itemList
    });
  }
  /** 获取 block 班次 */
  public getRangeConfigByBlockId(blockId: any) {
    return this.get(`/qcRegisterRange/getListByBlockId/${blockId}`);
  }
  /** 保存 block 配置项 */
  public saveOrUpdateRangeConfig(blockId: any, itemList: any[]) {
    return this.post(`/qcRegisterRange/saveOrUpdateWhole`, {
      blockId,
      itemList
    });
  }

  /** 交班签名 */
  public signAll(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/signAll`, {
      list
    });
  }
  /** 取消交班 */
  public cancelSign(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/cancelSign`, {
      list
    });
  }
  /** 审核签名 */
  public auditAll(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/auditAll`, {
      list
    });
  }
  /** 取消审核签名 */
  public cancelAudit(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/cancelAudit`, {
      list
    });
  }
  /** 核对者签名 */
  public checkAll(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/checkAll`, {
      list
    });
  }
  /** 取消核对签名 */
  public cancelCheck(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/cancelCheck`, {
      list
    });
  }

  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: authStore.selectedDeptCode,
      status: true
    };
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj));
  }

  /** 删除排班block */
  public qcRegisterBlockDelete(registerCode: any, blockId: any) {
    return this.get(`/qcRegisterBlock/${registerCode}/delete/${blockId}`);
  }

  /** 删除行 */
  public deleteAll(registerCode: string, list: { id: any }[]) {
    return this.post(`/qcRegisterData/${registerCode}/deleteAll`, {
      list
    });
  }
  /** 导出登记本 */
  public exportExcel(registerCode: string, obj: any) {
    return this.post(`/qcRegisterData/${registerCode}/export`, obj, {
      responseType: "blob"
    });
  }

  /** 导出全部科室登记本 */
  public exportAllWard(
    registerCode: string,
    startDate: string,
    endDate: string
  ) {
    return this.post(
      `/qcRegisterData/${registerCode}/exportAllWard`,
      {
        startDate,
        endDate
      }, {
      responseType: "blob"
    });
  }

  /** 提醒-保存 */
  public messageSaveOrUpdate(registerCode: string, obj: any) {
    return this.post(`/sign/qcRegister/${registerCode}/saveOrUpdate`, obj, {
      responseType: "blob"
    });
  }
}

export const wardRegisterService = new WardRegisterService();
