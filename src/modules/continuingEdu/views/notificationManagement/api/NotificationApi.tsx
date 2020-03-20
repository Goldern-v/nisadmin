import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class NotificationApi extends BaseApiService {
  //获取主页面数据
  public async getData(obj: any) {
    return this.post(`studyAndTrain/noticeManage/queryMainPageList`, obj);
  }

  //获取查询结果数据
  public async getResultData() {
    return this.post(`studyAndTrain/noticeManage/queryMainPageList`);
  }

  // 推送
  public async pushData() {}
}
export const notificationApi = new NotificationApi();
