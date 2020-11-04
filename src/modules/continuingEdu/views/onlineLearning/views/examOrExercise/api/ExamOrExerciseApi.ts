import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class ExamOrExerciseApi extends BaseApiService {
  // 考试--开始考试/重考
  public async startExam(cetpId: any) {
    return this.post(
      `/studyAndTrain/examManage/startExam`,
      qs.stringify({ cetpId })
    );
  }

  // 考试--继续考试
  public async continueExam(cetpId: any, paperCode: any) {
    return this.post(
      `/studyAndTrain/examManage/continueExam`,
      qs.stringify({ cetpId, paperCode })
    );
  }

  // 考试--交卷
  public async handInExamPaper(obj: any) {
    //paperCode  questionList([])
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
  public async createExercisePaper(cetpId: any) {
    return this.post(
      `/studyAndTrain/exerciseManage/createExercisePaper`,
      qs.stringify({ cetpId })
    );
  }

  // 练习--继续练习
  public async getExerciseProcessInfo(cetpId: any) {
    return this.post(
      `/studyAndTrain/exerciseManage/getExerciseProcessInfo`,
      qs.stringify({ cetpId })
    );
  }

  // 练习--保存练习进程
  public async saveExerciseProcessInfo(obj: any) {
    //cetpId  questionList([])
    return this.post(
      `/studyAndTrain/exerciseManage/saveExerciseProcessInfo`,
      obj
    );
  }
  // 完成练习
  public async finishExercise(cetpId: any) {
    //cetpId  questionList([])
    return this.post(
      `/studyAndTrain/exerciseManage/finishExercise`,
      qs.stringify({ cetpId })
    );
  }
}
export const examOrExerciseApi = new ExamOrExerciseApi();
