import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class SetUserManualApi extends BaseApiService {
  // 查询
  public async setGetData() {
    return this.post(`/userManualSet/getList`);
  }
  // 删除
  public async setDel(id: any) {
    return this.get(`/userManualSet/delete/${id}`);
  }
  // 添加修改
  public async saveOrUpdate(obj: any) {
    /**type--目录名称  path  orderNo isShow */
    return this.post(`/userManualSet/saveOrUpdate`, obj);
  }
}
export const setUserManualApi = new SetUserManualApi();
