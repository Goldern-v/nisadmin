import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class MeunSettingApi extends BaseApiService {
  // 查询菜单树
  public async getData() {
    return this.get(`/studyAndTrain/menuManage/getMenuTreeByAuthorization`);
  }
  public async getGetData() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`);
  }

  // 菜单树权限
  public async queyMenuAuthInfo() {
    return this.get(`/studyAndTrain/teachingPlanManage/queyMenuAuthInfo`);
  }

  // 判断是否有教学计划
  public async whetherPlan(id: any) {
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
    return this.post(`/studyAndTrain/menuManage/addMenuItems/2`, obj);
  }
  // 修改二级菜单
  public async updateSecond(obj: any) {
    // id name sort
    return this.post(`/studyAndTrain/menuManage/updateMenuItem/2`, obj);
  }

  // 获取所有角色信息
  public async getAllRoles() {
    return this.get(`/studyAndTrain/menuManage/getAllRoles`);
  }

  // 根据pId获取子菜单列表
  public async getChildrenMeun(pId: any) {
    return this.post(
      `studyAndTrain/menuManage/getMenuListByPId`,
      qs.stringify({ pId })
    );
  }
}
export const meunSettingApi = new MeunSettingApi();
