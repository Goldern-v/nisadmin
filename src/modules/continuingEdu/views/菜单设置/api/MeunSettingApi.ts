import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class MeunSettingApi extends BaseApiService {
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
}
export const meunSettingApi = new MeunSettingApi();
