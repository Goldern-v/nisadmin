import { action, observable, computed } from "mobx";
import { trainingInfoReviewService } from "src/modules/continuingEdu/views/trainingInfoReview/api/TrainingInfoReviewService";
import { appStore } from "src/stores";
import { message } from "antd";

class OnlineLearningReviewModel {
  @observable baseInfo = {} as any;
  @observable baseLoading = false;
  @observable examScore = {} as any;

  @action
  public init() {
    this.clean();
    this.getBaseInfo(appStore.queryObj.id);
  }

  @action
  public clean() {
    this.baseInfo = {};
  }

  @action
  public async getBaseInfo(id: string | any) {
    if (!id) {
      message.error("缺少详情ID");
      return;
    }
    this.baseLoading = true;
    try {
      const res = await trainingInfoReviewService.getBaseInfo(id, 1)
      if (res.data) this.baseInfo = res.data;
      this.baseLoading = false
    } catch (e) {
      this.baseLoading = false
    }
  }
}

export const onlineLearningReviewModel = new OnlineLearningReviewModel();
