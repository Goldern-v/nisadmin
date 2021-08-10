import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'

export default class FollowUpQuestionnaireManageServices extends BaseApiService {
  //获取科室单元
  public async getDeptList() {
    return this.post(`/briefMission/getBriefMissionDept`);
  }

}

export const followUpQuestionnaireManageServices = new FollowUpQuestionnaireManageServices()