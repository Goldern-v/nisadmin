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
    examOrExerciseApi.startExam(id, appStore.queryObj.paperCode).then(
      res => {
        this.examLoading = false;
        if (res.data) this.examInfo = res.data;
        this.examInfo.questionList.map((item: any) => {
          if (item.questionType === 1 || item.questionType === 2) {
            item.isSelected = item.questionType === 1 ? "" : [];
            item.answersList.map((asItem: any) => (asItem.isSelected = 0));
          } else {
            item.answerContent = "";
          }
        });
      },
      () => (this.examLoading = false)
    );
  }
}

export const examOrExerciseModel = new ExamOrExerciseModel();
