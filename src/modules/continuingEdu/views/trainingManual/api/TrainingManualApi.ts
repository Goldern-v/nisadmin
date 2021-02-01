import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class TrainingManualApi extends BaseApiService {
  // 我的培训清单（首页主列表）--查询
  public async queryMyTrainingListByList(nurseHierarchy: any) {
    return this.post(
      `/studyAndTrain/trainManualManage/queryMyTrainingListByList/${nurseHierarchy}`
    );
  }

  // 各层级培训清单--查询
  public async queryTrainingListByList(nurseHierarchy: any) {
    return this.post(
      `/studyAndTrain/trainManualManage/queryTrainingListByList`,
      { nurseHierarchy }
    );
  }

  // 获取培训项目树--弹窗级联
  public async getTrainingItemsTree() {
    return this.get(`/studyAndTrain/trainManualManage/getTrainingItemsTree`);
  }

  // id查询培训清单项目信息--修改数据回显
  public async queryTrainingListRecordById(id: any) {
    return this.post(
      `/studyAndTrain/trainManualManage/queryTrainingListRecordById`,
      { id }
    );
  }

  // 删除培训清单
  public async deleteTrainingListRecord(id: any) {
    return this.post(
      `/studyAndTrain/trainManualManage/deleteTrainingListRecord`,
      { id }
    );
  }

  // 新增或保存培训清单记录
  public async addOrUpdateTrainingListRecord(obj: any) {
    return this.post(
      `/studyAndTrain/trainManualManage/addOrUpdateTrainingListRecord`,
      obj
    );
  }
}
export const trainingManualApi = new TrainingManualApi();
