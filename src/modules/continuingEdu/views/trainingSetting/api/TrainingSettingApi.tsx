import BaseApiService from "src/services/api/BaseApiService";
import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";

export default class TrainingSettingApi extends BaseApiService {
  // 获取表单对应字段（用于前期查看字段）
  public async field(formCode: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/queryFormItemsByFormCode`,
      qs.stringify({ formCode })
    );
  }

  // 获取表单列表
  public async getFormList(obj: any) {
    return this.post(`/studyAndTrain/qualiAccessManage/queryFormPageList`, obj);
  }

  //获取表单基本信息
  public async getAutoGenerateItems(obj: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/getAutoGenerateItems`,
      obj
    );
  }

  // 保存
  public async saveForm(actionType: 1 | 2 | undefined, data: any) {
    //actionType(1保存为草稿；2提交审核)
    let obj = {
      formCode: formApplyModal.getFormCode,
      actionType,
      ...data
    };
    return this.post(
      `/studyAndTrain/qualiAccessManage/saveOrUpdateFormContent`,
      obj
    );
  }

  // 获取修改回显数据
  public async formData(id: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/queryFormContent`,
      qs.stringify({ id })
    );
  }

  // 表单删除
  public async deleteForm(id: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/deleteForm`,
      qs.stringify({ id })
    );
  }

  // 表单撤回
  public async revokeForm(id: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/recallForm`,
      qs.stringify({ id })
    );
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }

  // 获取导师
  public getAllEmpName(empName?: any) {
    let obj: any = {
      empName,
      pageIndex: 1,
      pageSize: 100
    };
    return this.post(`studyAndTrain/basicInformation/user/getPage`, obj);
  }

  // 获取审核列表
  public getReviewList(type: any, obj: any) {
    return this.post(`/studyAndTrain/qualiAccessManage/${type}`, obj);
  }

  // 获取审核流程
  public getFlowTaskHisByCetpId(formId: any) {
    return this.post(
      `/studyAndTrain/qualiAccessManage/getFlowTaskHisByCetpId`,
      qs.stringify({ formId })
    );
  }

  //审核保存
  public auditForm(obj: any) {
    return this.post(`/studyAndTrain/qualiAccessManage/auditForm`, obj);
  }
}
export const trainingSettingApi = new TrainingSettingApi();
