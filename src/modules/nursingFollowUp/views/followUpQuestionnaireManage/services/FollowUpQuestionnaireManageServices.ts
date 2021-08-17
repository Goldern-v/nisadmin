import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'
import { PageOptions } from 'src/components/BaseTable'


export default class FollowUpQuestionnaireManageServices extends BaseApiService {
  //获取科室单元
  public async getDeptList() {
    return this.post(`/briefMission/getBriefMissionDept`);
  }
  //查询调查问卷分页
  public visitTemplate(obj: PageOptions | any) {
    return this.post(`/visit/visitTemplate/queryPageList`, obj)
  }
  //获取病种列表
  public getAllList() {
    return this.get(`/visit/visitDiseaseType/getAllList`)
  }

}

export const followUpQuestionnaireManageServices = new FollowUpQuestionnaireManageServices()