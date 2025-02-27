import qs from 'qs'
import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'

export default class FollowUpPatientsManageServices extends BaseApiService {
  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  //获取随访患者分页信息
  public visitPatientData(obj: PageOptions | any) {
    return this.post(`/visit/visitPatientData/queryPageList`, obj)
  }
  //获取全部随访小组列表
  public visitTeam(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/getAllList`, obj)
  }
  //获取全部病种列表
  public visitDiseaseType() {
    return this.get(`/visit/visitDiseaseType/getAllList`)
  }
  //通过病种id获得随访周期
  public getByPeriodsListByDiseaseTypeId(obj: PageOptions | any) {
    return this.post(`/visit/visitPatientData/getByPeriodsListByDiseaseTypeId`, obj)
  }
  //分配随访小组
  public allotVisitTeam(obj: PageOptions | any) {
    return this.post(`/visit/visitPatientData/allotVisitTeam`, obj)
  }
  /**
   * 根据科室返回诊断列表
   * @param obj 
   * @returns 
   */
  public getDictItemValueList(obj: any) {
    return this.get(`/dict/common/getDictItemValueList?${qs.stringify(obj)}`, )
  }
}

export const followUpPatientsManageServices = new FollowUpPatientsManageServices()