import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
export default class UserManualApi extends BaseApiService{
  // 查询
  public async getData (obj: any) {
    // type	fileName	pageIndex	pageSize
    return this.post(`/userManual/getList`,obj)
  }

  // 保存、修改
  public async saveData (obj: any) {
    // file	fileName	type
    return this.post(`/userManual/upload`,obj)
  }

  // 保存、修改
  public async deleteData (id: string) {
    // file	fileName	type
    return this.post(`/userManual/upload/${id}`)
  }
  

}
export const userManualApi = new UserManualApi()

