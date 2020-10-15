import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class OnlineLearningReviewApi extends BaseApiService {
  // 完成任务
  public async finishTask(obj: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/finishTask`, obj);
  }

  // 读取附件
  public async readAttachment(attachmentId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/readAttachment`,
      qs.stringify({ attachmentId })
    );
  }
}
export const onlineLearningReviewApi = new OnlineLearningReviewApi();
