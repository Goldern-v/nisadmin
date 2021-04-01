import BaseApiService from "src/services/api/BaseApiService";

export default class TypeManagementApi extends BaseApiService {
  /** 查询 */
  public getMenuTree() {
    return this.get(`/studyAndTrain/teachingTypeManage/getMenuTree`);
  }

  /** 获取菜单树 */
  public getMenuSelect() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`);
  }

  // 类型管理--添加
  public async addTypeData(obj: any) {
    return this.post(`/studyAndTrain/menuManage/addMenuItem/3`, obj);
  }
}

export const typeManagementApi = new TypeManagementApi();
