import { action, observable, computed } from "mobx";
import { trainingInfoReviewService } from "src/modules/continuingEdu/views/trainingInfoReview/api/TrainingInfoReviewService";
import { appStore } from "src/stores";
import { message } from "antd";
import { examOrExerciseApi } from "./api/ExamOrExerciseApi";

class ExamOrExerciseModel {
  @observable examInfo = {} as any;
  @observable examLoading = false;

  @action public init() {
    this.clean();
    this.getExamInfo(appStore.queryObj.id);
  }

  @action public clean() {
    this.examInfo = {};
  }

  @action public getExamInfo(id: string | any) {
    if (!id) {
      message.error("缺少详情ID");
      return;
    }
    this.examLoading = true;
    examOrExerciseApi.startExam(id).then(
      res => {
        this.examLoading = false;
        if (res.data) this.examInfo = res.data;
      },
      () => (this.examLoading = false)
    );
  }
}

export const examOrExerciseModel = new ExamOrExerciseModel();
