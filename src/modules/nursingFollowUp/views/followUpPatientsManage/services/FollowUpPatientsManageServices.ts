import BaseApiService from 'src/services/api/BaseApiService'
export default class FollowUpPatientsManageServices extends BaseApiService {
  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
}

export const followUpPatientsManageServices = new FollowUpPatientsManageServices()