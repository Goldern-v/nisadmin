import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class AllMenusApi extends BaseApiService {
  // 查询
  public async queryPageList(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/queryPageList/allMenus`,
      obj
    );
  }

  // 导出
  public exportMainData(obj?: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportPageList/allMenus`,
      obj,
      {
        responseType: "blob"
      }
    );
  }

  // 类型管理--根据pId查询
  public async getTypeData(pId: any) {
    return this.post(
      `/studyAndTrain/menuManage/getMenuListByPId`,
      qs.stringify({ pId })
    );
  }

  // 获取人员
  public getAllEmpName(empName?: any) {
    let obj: any = {
      empName,
      pageIndex: 1,
      pageSize: 100
    };
    return this.post(`studyAndTrain/basicInformation/user/getPage`, obj);
  }
}
export const allMenusApi = new AllMenusApi();
