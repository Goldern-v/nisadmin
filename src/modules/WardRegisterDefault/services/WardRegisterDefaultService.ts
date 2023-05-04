import { authStore } from "../../../stores/index";
import BaseApiService from "src/services/api/BaseApiService";

interface BaseQueryType {
  recordCode: string;
  wardCode: string;
}
export default class WardRegisterDefaultService extends BaseApiService {
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

  /** 获取登记本统计 */
  public statisticsItem(registerCode: string, obj: any) {
    return this.post(`/qcRegisterItem/${registerCode}/statisticsItem`, obj);
  }

  // 贵州-特殊处理 QCRG_GSY_09  QCRG_GSY_10  QCRG_GSY_11 全院情况
  public getPageGZSRM(registerCode: string, obj: any) {
    return this.post(`/qcRegisterData/${registerCode}/getAll`, obj);
  }

  /** 保存 block 数据 */
  public saveAndSignAll(
    registerCode: string,
    blockId: any,
    itemDataList: any[],
    sign: boolean = false,
    dataMap?: any
  ) {
    return this.post(`/qcRegisterData/${registerCode}/saveAndSignAll`, {
      blockId,
      itemDataList,
      sign,
      dataMap
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

  /**提醒：获取整表提醒 */
  public getBlockMsgList(registerCode: string, blockId: string) {
    const formType = 'qcRegister'
    return this.get(`/sign/${formType}/${registerCode}/list/${blockId}`)
  }

  /**提醒：根据字段批量保存或者修改 */
  public saveBlockMsgList(list: any[], registerCode: string | number) {
    const formType = 'qcRegister'
    return this.post(`/sign/${formType}/${registerCode}/saveOrUpdateWholeByField`, { list })
  }

  /**提醒：删除 */
  public deleteMsgItem(id: string | number, registerCode: string | number) {
    const formType = 'qcRegister'

    return this.post(`/sign/${formType}/${registerCode}/delete`, { id })
  }
  /**获取模板列表 */
  public getRegisterList() {
    return this.get(`qcRegisterBlock/QCR_0001/getTemplateList`)
  }
  /**获取菜单 */
  public getMenu() {
    return this.get('menu/getMenuList/SYS_MENU_002')
  }
  /**根据科室获取菜单 */
  public getMenuByDeptCode() {
    return this.get('qcRegisterBlock/getListByDept')
  }
}

export const wardRegisterDefaultService = new WardRegisterDefaultService();
