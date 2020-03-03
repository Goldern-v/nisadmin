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

  /** 新建教学计划 */
  public addTeachingPlanInfoStudy(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/addTeachingPlanInfo/study`,
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
}

export const stepServices = new StepServices();
