import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class MeunSettingApi extends BaseApiService {
  // 获取所有角色
  public async getAllRoles() {
    return this.get(`/studyAndTrain/menuManage/getAllRoles`);
  }

  // 查询菜单树
  public async getGetData() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`);
  }

  // 判断是否有教学计划
  public async whetherPlan(id: any) {
    id;
    return this.post(
      `/studyAndTrain/menuManage/isExistedTeachingPlans`,
      qs.stringify({ id })
    );
  }

  // 删除
  public async del(id: any) {
    id;
    return this.post(
      `/studyAndTrain/menuManage/deleteMenuItem`,
      qs.stringify({ id })
    );
  }

  // 添加一级菜单
  public async saveFirst(obj: any) {
    return this.post(`/studyAndTrain/menuManage/addMenuItem/1`, obj);
  }
  // 修改一级菜单
  public async updateFirst(obj: any) {
    return this.post(`/studyAndTrain/menuManage/updateMenuItem/1`, obj);
  }

  // 添加二级菜单
  public async saveSecond(obj: any) {
    //name sort
    return this.post(`/studyAndTrain/menuManage/addMenuItem/2`, obj);
  }
  // 修改二级菜单
  public async updateSecond(obj: any) {
    // id name sort
    return this.post(`/studyAndTrain/menuManage/updateMenuItem/2`, obj);
  }
}
export const meunSettingApi = new MeunSettingApi();
