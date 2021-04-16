import BaseApiService from "src/services/api/BaseApiService";

class Api extends BaseApiService {
  // 获取列表
  getList(params?: any) {
    return this.post(`/schMealSettingHd/listByDeptCodeAndStatus`, params);
  }

  // 获取
  getItem(id: string) {
    return this.post(`/schMealSettingHd/listByDeptCodeAndStatus`, id);
  }

  // 新增 && 获取
  updateItem(id: string) {
    return this.post(`/schMealSettingHd/listByDeptCodeAndStatus`, id);
  }

  // 删除
  deleteItem(id: string) {
    return this.post(`/schMealSettingHd/listByDeptCodeAndStatus`, id);
  }

}

export default new Api()
