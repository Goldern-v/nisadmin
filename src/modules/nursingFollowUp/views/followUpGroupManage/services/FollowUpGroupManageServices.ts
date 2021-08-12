import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'

import qs from 'qs'
import { appStore, authStore } from 'src/stores'
export default class  FollowUpGroupManageServices extends BaseApiService {

  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }

  public findLog(obj: PageOptions | any) {
    return this.post(`/InpatientAreaLog/findLog`, obj)
  }
}

export const followUpGroupManageServices = new FollowUpGroupManageServices()