import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import { appStore } from "src/stores";

export default class FormPageService extends BaseApiService {
  /** 根据科室获取科室人员 */
  public async getUsers(code: any) {
    return this.get(`/dept/users/${code}`)
  }
}

export const formPageService = new FormPageService()
