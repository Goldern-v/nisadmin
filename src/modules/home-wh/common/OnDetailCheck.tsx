import { appStore } from "src/stores/index";
import { message } from "antd";
import HomeApi from "src/modules/home-wh/api/HomeApi.ts";
import { examOrExerciseApi } from "src/modules/continuingEdu/views/onlineLearning/views/examOrExercise/api/ExamOrExerciseApi";
import { onlineLearningReviewModel } from "src/modules/continuingEdu/views/onlineLearning/views/onlineLearningReview/OnlineLearningReviewModel";

export default function OnDetailCheck(item: any) {
  HomeApi.readNotification(item.id)
    .then((res: any) => {
      if (res.code === "200") {
        switch (item.noticeType) {
          case 1:
            let taskRole: any =
              item.taskRoleCode == 1
                ? `/onlineLearningReview?id=${item.cetpId}&onlineLearningName=考试`
                : `/onlineLearningReview?id=${item.cetpId}&taskRoleCode=true`;
            appStore.history.push(taskRole);
            break;
          case 2:
            examOrExerciseApi
              .reviewMyScores(item.cetpId)
              .then((res: any) => {
                if (res.code === "200") {
                  onlineLearningReviewModel.examScore = res.data || [];
                  appStore.history.push(`/examScore?id=${item.cetpId}`);
                } else {
                  message.error(`${res.desc}`);
                }
              })
              .catch(err => {});
            break;
          default:
            break;
        }
      } else {
        message.error(`${res.desc}`);
      }
    })
    .catch(err => {});
}
