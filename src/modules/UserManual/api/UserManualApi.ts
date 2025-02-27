import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class UserManualApi extends BaseApiService {
  // 查询每条目录对应内容
  public async getData(obj: any) {
    return this.post(`/userManual/getList`, obj);
  }
  // 保存
  public async upload(obj: any) {
    return this.post(`/userManual/upload`, obj);
  }
  // 修改
  public async update(obj: any) {
    return this.post(`/userManual/update`, obj);
  }
  // 删除
  public async delete(id: any) {
    return this.get(`/userManual/delete/${id}`);
  }
  // 下载
  public async getFileContent(id: any) {
    return this.post(`/userManual/getFileContent`, qs.stringify({ id }), {
      responseType: "blob"
    });
  }
  // 查询目录列表
  public async setGetData() {
    return this.post(`/userManualSet/getList`);
  }
}
export const userManualApi = new UserManualApi();
