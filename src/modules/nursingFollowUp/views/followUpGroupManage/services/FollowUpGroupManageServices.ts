import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'

import qs from 'qs'
import { appStore, authStore } from 'src/stores'
export default class  FollowUpGroupManageServices extends BaseApiService {

  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  //获取随访小组分页信息
  public queryNursePageList(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/queryNursePageList`, obj)
  }
  //获取全部随访小组列表
  public visitTeam() {
    return this.get(`/visit/visitTeam/getAllList`)
  }
  //获取通过id删除小组
  public delete(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/delete`, obj)
  }
  //添加小组
  public saveOrUpdate(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/saveOrUpdate`, obj)
  }
}

export const followUpGroupManageServices = new FollowUpGroupManageServices()