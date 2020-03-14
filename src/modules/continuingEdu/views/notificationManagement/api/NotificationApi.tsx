import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class NotificationApi extends BaseApiService {
  // 查询
  public async getData(obj: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/queryPageList`, obj);
  }
}
export const notificationApi = new NotificationApi();
