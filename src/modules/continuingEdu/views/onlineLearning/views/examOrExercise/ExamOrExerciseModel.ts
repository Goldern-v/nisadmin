import { action, observable, computed } from "mobx";
import { trainingInfoReviewService } from "src/modules/continuingEdu/views/trainingInfoReview/api/TrainingInfoReviewService";
import { appStore } from "src/stores";
import { message } from "antd";
import { examOrExerciseApi } from "./api/ExamOrExerciseApi";

class ExamOrExerciseModel {
  @observable examInfo = {} as any; //考试信息
  @observable examLoading = false; // 考试loading
  @observable exerciseInfo = [] as any; //练习信息
  @observable exerciseLoading = false; // 练习loading

  // 初始化页面数据
  @action public init() {
    this.clean();
    if (appStore.queryObj.name === "考试") {
      this.getExamInfo(appStore.queryObj.id);
    } else {
      this.getExerciseInfo(appStore.queryObj.id);
    }
  }

  // 数据清空
  @action public clean() {
    this.examInfo = {};
    this.exerciseInfo = [];
  }

  // 获取考试信息
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

  // 获取练习信息
  @action public getExerciseInfo(id: string | any) {
    if (!id) {
      message.error("缺少详情ID");
      return;
    }
    this.exerciseLoading = true;
    examOrExerciseApi.createExercisePaper(id, appStore.queryObj.status).then(
      res => {
        this.exerciseLoading = false;
        if (res.data) this.exerciseInfo = res.data;

        this.exerciseInfo.map((item: any) => {
          if (item.questionType === 1 || item.questionType === 2) {
            if (appStore.queryObj.status) {
              item.isSelected = item.questionType === 1 ? "" : [];
            } else {
              item.answersList.map((asItem: any) => (asItem.isSelected = 0));
            }
          }
        });
      },
      () => (this.exerciseLoading = false)
    );
  }
}

export const examOrExerciseModel = new ExamOrExerciseModel();
