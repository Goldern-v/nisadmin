import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'
export default class  FollowUpGroupStatisticalServices extends BaseApiService {
  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  //获取随访小组分页信息
  public queryPageList(obj: PageOptions | any) {
    return this.post(`/visit/visitPlan/queryPageList`, obj)
  }
  //获取全部随访小组列表
  public getUserListByWardCode(obj: PageOptions | any) {
    return this.post(`/visit/visitPlan/getUserListByWardCode`, obj)
  }
  //分配随访小组
  public setVisitTeam(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/setVisitTeam`, obj)
  }
  //获取通过id删除小组
  public delete(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/delete`, obj)
  }
  //随访数统计(折线图)
  public getNumberStatistics(obj: PageOptions | any) {
    return this.post(`/visit/visitPlan/getNumberStatistics`, obj)
  }
  //随访数统计(柱形图)
  public getSituationStatistics(obj: PageOptions | any) {
    return this.post(`/visit/visitPlan/getSituationStatistics`, obj)
  }
  //随访数统计(柱形图)
  public getSituationStatisticsList(obj: PageOptions | any) {
    return this.post(`/visit/visitPlan/getSituationStatisticsList`, obj)
  }
}

export const followUpGroupStatisticalServices = new FollowUpGroupStatisticalServices()