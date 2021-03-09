import BaseApiService from "src/services/api/BaseApiService";
import { appStore, authStore } from "src/stores";
import qs from "qs";

let getPid = () => {
  return appStore.queryObj.id;
};

const uploadUrl =
  appStore.HOSPITAL_ID == "hj"
    ? "hj/editRunTime/upLoadQuestions/exam"
    : "upLoadQuestions/exam";

export default class StepServices extends BaseApiService {
  /** 获取教学类型列表 */
  public getMenuListByPId() {
    return this.post(
      `/studyAndTrain/menuManage/getMenuListByPId`,
      qs.stringify({
        pId: getPid()
      })
    );
  }

  /** 新建教学计划 学习 */
  public addTeachingPlanInfoStudy(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/study`,
      obj
    );
  }

  /** 新建教学计划  培训*/
  public addTeachingPlanInfoTrain(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/train`,
      obj
    );
  }
  /** 新建教学计划  考试*/
  public addTeachingPlanInfoExam(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/exam`,
      obj
    );
  }
  /** 新建教学计划  练习*/
  public addTeachingPlanInfoExercise(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/exercise`,
      obj
    );
  }
  /** 新建教学计划  实操*/
  public addTeachingPlanInfoPractise(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/practise`,
      obj
    );
  }

  /** 新建教学计划 演练 */
  public addTeachingPlanInfoWalkthrough(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/walkthrough`,
      obj
    );
  }

  /** 新建教学计划 实践 */
  public addTeachingPlanInfoSocialpractise(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/socialpractise`,
      obj
    );
  }

  /** 上传附件 */
  public uploadAttachment(obj: any, onUploadProgress?: any) {
    return this.post(`/file/uploadAttachment/studyAndTrain`, obj, {
      onUploadProgress: onUploadProgress
    });
  }

  /** 生成任务处理码 */
  public generateTaskCode() {
    return this.post(`/studyAndTrain/teachingPlanManage/generateTaskCode`);
  }

  /** 教学计划-查看信息 */
  public getCompleteInfo(id: Number) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/getCompleteInfo`,
      qs.stringify({
        id
      })
    );
  }
  /** 下载题目上传模板-考试  有问答题*/
  public downLoadQueUploadTemplateWithShortQues() {
    return this.get(
      `/studyAndTrain/examManage/downLoadQueUploadTemplateWithShortQues`,
      {
        responseType: "blob"
      }
    );
  }
  /** 下载题目上传模板-考试 无问答题*/
  public downLoadQueUploadTemplateWithoutShortQues() {
    return this.get(
      `/studyAndTrain/examManage/downLoadQueUploadTemplateWithoutShortQues`,
      {
        responseType: "blob"
      }
    );
  }
  /** 上传题目-考试 */
  public upLoadQuestionsExam(file: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/${uploadUrl}`, file);
  }

  /** 下载题目上传模板-练习*/
  public downLoadQueUploadTemplate() {
    return this.get(`/studyAndTrain/exerciseManage/downLoadQueUploadTemplate`, {
      responseType: "blob"
    });
  }
  /** 上传题目-练习 */
  public upLoadQuestionsExercise(file: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/upLoadQuestions/exercise`,
      file
    );
  }

  /***.题库管理--查询初始化数据 */
  public queryQuestionsByPage(obj: any) {
    // "bankType" questionType" keyWord" questionLabelIdList pageSize pageIndex
    return this.post(
      `/studyAndTrain/questionBankManage/exam/queryQuestionsByPage`,
      obj
    );
  }

  /***.题库管理--标签下拉框 */
  public searchLabels(obj: any) {
    //keyWord pageSize pageIndex
    return this.post(
      `/studyAndTrain/questionBankManage/exam/searchLabels`,
      obj
    );
  }

  /***.题库管理--预览 */
  public previewPaper(obj: any) {
    //questionIdList（问题id []）
    return this.post(
      `/studyAndTrain/questionBankManage/exam/previewPaper`,
      obj
    );
  }

  /***.题库管理--保存 */
  public saveQuestionsToTeachingPlanTask(obj: any) {
    //questionIdList（问题id []）
    return this.post(
      `/studyAndTrain/questionBankManage/exam/saveQuestionsToTeachingPlanTask`,
      obj
    );
  }

  /**下载问卷模板-----培训 */
  public downLoadQueUploadTemplatePX() {
    return this.get(
      `/studyAndTrain/trainManage/downLoadTrainQuestionnaireTemplate`,
      {
        responseType: "blob"
      }
    );
  }

  /** 上传问卷---培训 */
  public upLoadQuestionsPX(file: any) {
    return this.post(
      `studyAndTrain/teachingPlanManage/upLoadQuestionnaire`,
      file
    );
  }

  // 查询（各视频附件插题数）
  public async getAllVideoList(obj: any) {
    return this.post(
      `/studyAndTrain/videoInsertion/task/getQuestionStatInfoByTaskCode`,
      obj
    );
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }

  /** 厚街考试特殊处理（多套试卷 添加题目题库修改） */
  //新建试卷
  public addExamPaper(taskCode: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/editRunTime/addExamPaper`,
      qs.stringify({ taskCode })
    );
  }
  // 删除试卷
  public deleteExamPaper(taskCode: string, pertId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/editRunTime/deleteExamPaper`,
      qs.stringify({ taskCode, pertId })
    );
  }
  // 获取所有试卷的统计信息
  public getStatInfoOfAllEditRunTimeExamPapers(taskCode: any, cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/editRunTime/getStatInfoOfAllEditRunTimeExamPapers`,
      qs.stringify({ taskCode, cetpId })
    );
  }

  /** 南医三小组成员设置 */
  //获取我的所有小组
  public getMyGroups() {
    return this.get(
      `/studyAndTrain/teachingPlanManage/personGroupManage/getMyGroups`
    );
  }

  //通过id获取小组成员
  public getAllPersonsOfGroup(id: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/personGroupManage/getAllPersonsOfGroup`,
      { id }
    );
  }

  //通过id获取小组完整信息
  public getCompleteInfoOfGroup(id: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/personGroupManage/getCompleteInfoOfGroup`,
      { id }
    );
  }

  //保存小组
  public saveOrUpdateGroup(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/personGroupManage/saveOrUpdateGroup`,
      obj
    );
  }

  //删除小组
  public deleteGroup(id: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/personGroupManage/deleteGroup`,
      { id }
    );
  }
}

export const stepServices = new StepServices();
