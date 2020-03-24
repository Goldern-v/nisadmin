import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class NotificationApi extends BaseApiService {
  //获取主页面数据
  public async getData(obj: any) {
    return this.post(`studyAndTrain/noticeManage/queryMainPageList`, obj);
  }

  //获取查询结果数据
  public async getResultData(obj: any) {
    return this.post(`studyAndTrain/noticeManage/queryResultPageList`, obj);
  }

  // 获取是否已读信息
  public async getReadMsgTaskList(cetpId: any) {
    return this.post(
      `studyAndTrain/noticeManage/getReadMsgTaskList`,
      qs.stringify({ cetpId })
    );
  }

  // 推送
  //   {
  //     "cetpId":508,
  //      "empNos":["6503","6504"]
  //  }
  public async pushData(obj: any) {
    return this.post(`studyAndTrain/noticeManage/sendMessage`, obj);
  }
}
export const notificationApi = new NotificationApi();
