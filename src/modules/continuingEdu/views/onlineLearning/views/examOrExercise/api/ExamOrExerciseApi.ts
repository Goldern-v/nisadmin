import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class ExamOrExerciseApi extends BaseApiService {
  // 考试--开始考试/重考
  public async startExam(cetpId: any, paperCode?: any) {
    return this.post(
      paperCode
        ? `/studyAndTrain/examManage/continueExam`
        : `/studyAndTrain/examManage/startExam`,
      qs.stringify({ cetpId, paperCode })
    );
  }
  // 考试--交卷
  public async handInExamPaper(obj: any) {
    return this.post(`/studyAndTrain/examManage/handInExamPaper`, obj);
  }
  // 考试--查看我的成绩
  public async reviewMyScores(cetpId: any) {
    let obj: any = {
      cetpId
    };
    return this.post(`/studyAndTrain/examManage/reviewMyScores`, obj);
  }
  // 考试--查看我的答卷
  public async reviewMyExamPaper(cetpId: any) {
    let obj: any = {
      cetpId
    };
    return this.post(`/studyAndTrain/examManage/reviewMyExamPaper`, obj);
  }

  // 练习--开始练习或重新练习
  public async createExercisePaper(cetpId: any, status?: string) {
    return this.post(
      status
        ? `/studyAndTrain/exerciseManage/createExercisePaper`
        : `/studyAndTrain/exerciseManage/getExerciseProcessInfo`,
      qs.stringify({ cetpId })
    );
  }
  // 练习--保存练习进程
  public async saveExerciseProcessInfo(obj: any, status: boolean) {
    return this.post(
      status
        ? `/studyAndTrain/exerciseManage/finishExercise`
        : `/studyAndTrain/exerciseManage/saveExerciseProcessInfo`,
      obj
    );
  }
}
export const examOrExerciseApi = new ExamOrExerciseApi();
