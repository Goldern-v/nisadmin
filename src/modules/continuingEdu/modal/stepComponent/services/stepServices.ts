import BaseApiService from "src/services/api/BaseApiService";
import { appStore, authStore } from "src/stores";
import qs from "qs";

let getPid = () => {
  return appStore.queryObj.id;
};

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
    return this.post(
      `/studyAndTrain/teachingPlanManage/upLoadQuestions/exam`,
      file
    );
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

  /***  wumin   */
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
}

export const stepServices = new StepServices();
