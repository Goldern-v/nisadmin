import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class VideoInsertionApi extends BaseApiService {
  // 查询（各视频附件插题数）
  public async getAllVideoList(taskCode: any, cetpId?: any) {
    return this.post(
      `/studyAndTrain/videoInsertion/task/getQuestionStatInfoByTaskCode`,
      qs.stringify({ taskCode, cetpId })
    );
  }

  // 获取插入题目列表
  public async getQuestionPageList(obj: any) {
    /** taskCode attachmentId pageIndex pageSize*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/queryQuestionPageList`,
      obj
    );
  }

  //查看试卷
  public async getAllQuestionList(obj: any) {
    /** taskCode attachmentId*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/queryAllQuestionList`,
      obj
    );
  }

  //保存插入时间
  public async saveBroadcastPoint(obj: any) {
    /** taskCode attachmentId broadCastPoint*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/saveBroadcastPoint`,
      obj
    );
  }

  //保存题目
  public async saveOrUpdateQuestion(obj: any) {
    /** id taskCode attachmentId broadCastPoint questionCategory（choiceQuestion、fillingQuestion、shortQuestion）questionContent answerContent*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/saveOrUpdateQuestion`,
      obj
    );
  }

  //删除题目
  public async deleteQuestion(obj: any) {
    /** taskCode attachmentId*/
    return this.post(`/studyAndTrain/videoInsertion/task/deleteQuestion`, obj);
  }

  //删除附件视频所有题目
  public async deleteAllQuestions(obj: any) {
    /** taskCode attachmentId*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/deleteAllQuestions`,
      obj
    );
  }
}
export const videoInsertionApi = new VideoInsertionApi();
