import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'

export default class FollowUpPatientsManageServices extends BaseApiService {
  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }

  public visitPatientData(obj: PageOptions | any) {
    return this.post(`/visit/visitPatientData/queryPageList`, obj)
  }

  public visitTeam(obj: PageOptions | any) {
    return this.post(`/visit/visitTeam/queryPageList`, obj)
  }

  public visitDiseaseType(obj: PageOptions | any) {
    return this.post(`/visit/visitDiseaseType/queryPageList`, obj)
  }

}

export const followUpPatientsManageServices = new FollowUpPatientsManageServices()