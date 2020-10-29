import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class ExamOrExerciseApi extends BaseApiService {
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

  // 考试--开始考试/重考
  public async startExam(cetpId: any) {
    return this.post(
      `/studyAndTrain/examManage/startExam`,
      qs.stringify({ cetpId })
    );
  }
}
export const examOrExerciseApi = new ExamOrExerciseApi();
