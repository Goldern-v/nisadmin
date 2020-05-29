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
}
export const trainingSettingApi = new TrainingSettingApi();
