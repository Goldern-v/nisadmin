import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class OnlineLearningApi extends BaseApiService {
  // 主列表查询
  public async queryPageList(obj: any) {
    return this.post(`/studyAndTrain/onlineLearn/pc/queryPageList`, obj);
  }

  // 统计任务数
  public async getTaskCount() {
    return this.post(`/studyAndTrain/onlineLearn/pc/getTaskCount`);
  }
}
export const onlineLearningApi = new OnlineLearningApi();
