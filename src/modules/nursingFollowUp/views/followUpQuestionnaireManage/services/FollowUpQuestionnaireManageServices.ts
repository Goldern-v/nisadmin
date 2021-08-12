import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'
import { PageOptions } from 'src/components/BaseTable'


export default class FollowUpQuestionnaireManageServices extends BaseApiService {
  //获取科室单元
  public async getDeptList() {
    return this.post(`/briefMission/getBriefMissionDept`);
  }

  public findLog(obj: PageOptions | any) {
    return this.post(`/InpatientAreaLog/findLog`, obj)
  }

}

export const followUpQuestionnaireManageServices = new FollowUpQuestionnaireManageServices()