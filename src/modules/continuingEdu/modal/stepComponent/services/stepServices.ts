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

  /** 上传附件 */
  public uploadAttachment(obj: any) {
    return this.post(`/file/uploadAttachment/studyAndTrain`, obj);
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
}

export const stepServices = new StepServices();
