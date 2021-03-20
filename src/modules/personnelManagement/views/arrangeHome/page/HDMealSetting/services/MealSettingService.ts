import BaseApiService from "src/services/api/BaseApiService";

export default class MealSettingService extends BaseApiService {
  // 获取所有社区列表
  public listByDeptCodeAndStatus(deptCode: any, status: any) {
    return this.post(`/schMealSettingHd/listByDeptCodeAndStatus`, {
      deptCode,
      status
    });
  }

  //添加新套餐
  public saveOrUpdate(obj: any) {
    return this.post(`/schMealSettingHd/saveOrUpdate`, obj);
  }

  // 删除记录
  public delete(id: any) {
    return this.get(`/schMealSettingHd/delById/${id}`);
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }
}

export const mealSettingService = new MealSettingService();
