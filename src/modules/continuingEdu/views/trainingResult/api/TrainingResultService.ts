import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
import { appStore } from "src/stores";
import { stepViewModal } from "../../../modal/stepComponent/StepViewModal";

export default class TrainingResultService extends BaseApiService {
  /**获取概要信息 */
  public getInfo(id: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/viewSummaryInfo`,
      qs.stringify({ id })
    );
  }

  /** 查看结果列表 */
  public getTableData(query: any, viewResultsUrlName?: any) {
    return this.post(
      viewResultsUrlName
        ? `studyAndTrain/teachingPlanManage/hj/${viewResultsUrlName}`
        : `/studyAndTrain/teachingPlanManage/viewResults`,
      query
    );
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

  /**导出 */
  public handleExport(params: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportReviewExamPaper`,
      params,
      { responseType: 'blob' }
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
  /**杏坛医院-查看结果-导出签到信息 */
  public exportSignInInfoXingtan(cetpId: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportSignInXinTanInfo`,
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
  public exportResults(cetpId: string, urlName?: any) {
    return this.post(
      urlName
        ? `studyAndTrain/teachingPlanManage/hj/${urlName}`
        : "/studyAndTrain/teachingPlanManage/exportResults",
      {
        cetpId
      },
      { responseType: "blob" }
    );
  }

  /** 上传图片 */
  public uploadImg(cetpId: string, file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return this.post(`/studyAndTrain/trainManage/uploadPictures/${cetpId}`, formData);
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

  // 厚街补考--获取参与人
  public async getParticipants(obj: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/getParticipants`, obj);
  }

  // 厚街补考--添加保存补考
  public async addResitExam(obj: any) {
    return this.post(`/studyAndTrain/examManage/addResitExam`, obj);
  }

  // 南医三成绩显示隐藏
  public async displayOrHideScores(obj: any) {
    return this.post(`/studyAndTrain/examManage/displayOrHideScores`, obj);
  }

  // 武汉亚心培训实施记录界面--获取信息
  public async getTrainImplementationByCetpId(cetpId: string) {
    return this.post(`/studyAndTrain/teachingPlanManage/getTrainImplementationByCetpId`,qs.stringify({ cetpId }))
  }

  // 武汉亚心培训实施记录界面--获取培训科室
  public async getUintList() {
    return this.get(`/user/nursingUnit`);
  }

  // 武汉亚心培训实施记录界面--保存接口
  public async saveOrUpdateTrainImplementation(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/saveOrUpdateTrainImplementation`,
      obj
    );
  }
}

export const trainingResultService = new TrainingResultService();
