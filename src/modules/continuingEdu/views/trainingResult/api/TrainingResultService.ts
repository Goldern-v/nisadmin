import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
import { appStore } from "src/stores";

const viewResultsURL =
  appStore.HOSPITAL_ID == "wh"
    ? `/studyAndTrain/teachingPlanManage/viewResults`
    : `studyAndTrain/teachingPlanManage/hj/queryExamResultDetailsByPage`;

export default class TrainingResultService extends BaseApiService {
  /**获取概要信息 */
  public getInfo(id: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/viewSummaryInfo`,
      qs.stringify({ id })
    );
  }
  /** 查看结果列表 */
  public getTableData(query: any) {
    return this.post(`${viewResultsURL}`, query);
  }

  /** 查看结果列表 */
  public queryToScoreDetailList(query: any) {
    return this.post(`/studyAndTrain/scoreManage/queryScoreDetailList `, query);
  }

  /** 修改成绩有效状态 */
  public updateGradesValid(query: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/updateValidStatusOfAchievement`,
      query
    );
  }

  /** 发布成绩 */
  public publishGrades(cetpId: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/publishResults`,
      qs.stringify({ cetpId })
    );
  }

  /** 获取片区病区数据 */
  public getBigDeptMentTree() {
    return this.post(`/studyAndTrain/teachingPlanManage/getBigDeptMentTree`);
  }
  /** 获取职称信息 */
  public getAllTitles() {
    return this.post(`/studyAndTrain/teachingPlanManage/getAllTitles`);
  }

  /**获取一二级菜单信息 */
  public getMenuChain(cetpId: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/getMenuChainByCetpId`,
      qs.stringify({ cetpId })
    );
  }

  /**查看个人考卷 */
  public reviewExamPaper(cetpId: string | number, empNo: string | number) {
    return this.post(`/studyAndTrain/teachingPlanManage/reviewExamPaper`, {
      cetpId,
      empNo
    });
  }

  /**查看个人调查问卷 */
  public viewQuestionnaireResult(
    cetpId: string | number,
    empNo: string | number
  ) {
    return this.post(
      `/studyAndTrain/trainManage/viewQuestionnaireResult`,
      qs.stringify({ cetpId, empNo })
    );
  }

  /**保存问答题评分 */
  public saveScores(params: any) {
    return this.post(
      `/studyAndTrain/examManage/saveScoresForShortQuestions`,
      params
    );
  }

  /**实操-获取指定考生的评分信息 */
  public reviewScoreItemsByCetpId(params: any) {
    return this.post(
      `/studyAndTrain/practiseManage/reviewScoreItemsByCetpId`,
      qs.stringify(params)
    );
  }

  /**实操-上传成绩 */
  public uploadScores(params: any) {
    return this.post(`/studyAndTrain/practiseManage/uploadScores`, params);
  }

  /**实操-上传成绩 */
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }

  /**查看结果-导出签到信息 */
  public exportSignInInfo(cetpId: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportSignInInfo`,
      qs.stringify({ cetpId }),
      { responseType: "blob" }
    );
  }

  /**查看结果-导出出勤率统计信息 */
  public exportAttendanceRateStatInfo(cetpId: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportAttendanceRateStatInfo`,
      qs.stringify({ cetpId }),
      { responseType: "blob" }
    );
  }

  /**查看结果-导出出勤率统计信息 实践类型 获取现场图片*/
  public getPicturesByPage(query: any) {
    return this.post(
      "/studyAndTrain/socialPractiseManage/getPicturesByPage",
      query
    );
  }

  /**查看结果-获取实践聊天记录*/
  public getChatRecordPageList(query: any) {
    return this.post(
      "/studyAndTrain/socialPractiseManage/getChatRecordPageList",
      query
    );
  }

  /**查看结果-获取实践聊天总结*/
  public getSummaryContent(cetpId: string) {
    return this.post(
      "/studyAndTrain/socialPractiseManage/getSummaryContent",
      qs.stringify({ cetpId })
    );
  }

  /**导出 */
  public exportResults(cetpId: string) {
    return this.post(
      "/studyAndTrain/teachingPlanManage/exportResults",
      {
        cetpId
      },
      { responseType: "blob" }
    );
  }

  /**查看结果-导出出勤率统计信息 培训类型 获取现场图片*/
  public trainManagePictures(query: any) {
    return this.post("/studyAndTrain/trainManage/getPicturesByPage", query);
  }

  // 考试--查看我的答卷
  public async reviewMyExamPaper(cetpId: any) {
    let obj: any = {
      cetpId
    };
    return this.post(`/studyAndTrain/examManage/reviewMyExamPaper`, obj);
  }
}

export const trainingResultService = new TrainingResultService();
