import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class MainPageApi extends BaseApiService {
  /** 主列表页--查询 */ 
  public async getMainData(obj: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/queryPageList`, obj);
  }

  /** 主列表页--导出 */ 
  public exportMainData(obj?: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/exportPageList`, obj, {
      responseType: "blob"
    });
  }

  /** 主列表页--删除*/ 
  public async delMainData(id: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/recycleTeachingPlan`,
      qs.stringify({ id })
    );
  }

  /** 主列表页--撤销 */ 
  public async revokeMainData(id: any, remark?: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/recallTeachingPlan`,
      qs.stringify({ id, remark })
    );
  }

  /** 类型管理--根据pId查询 */ 
  public async getTypeData(pId: any) {
    return this.post(
      `/studyAndTrain/menuManage/getMenuListByPId`,
      qs.stringify({ pId })
    );
  }

  /** 类型管理--添加 */ 
  public async addTypeData(obj: any) {
    return this.post(`/studyAndTrain/menuManage/addMenuItem/3`, obj);
  }

  /** 类型管理--修改 */ 
  public async updateTypeData(obj: any) {
    return this.post(`/studyAndTrain/menuManage/updateMenuItem/3`, obj);
  }

  /** 类型管理--删除 */ 
  public async delTypeData(id: any) {
    return this.post(
      `/studyAndTrain/menuManage/deleteMenuItem`,
      qs.stringify({ id })
    );
  }

  /** 主菜单复制功能 */ 
  public async copyTeachingPlan(id: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/copyTeachingPlan`,
      qs.stringify({ id })
    );
  }

  /** 获取培训项目树--弹窗级联 */ 
  public async getTrainingItemsTree() {
    return this.get(`/studyAndTrain/trainManualManage/getTrainingItemsTree`);
  }

  /** 厚街类型管理新增修改单独接口 */ 
  public async updateTypeDataHJ(obj: any) {
    return this.post(
      `/studyAndTrain/menuManage/hj/addOrUpdateThreeLevelMenuItem`,
      obj
    );
  }
}
export const mainPageApi = new MainPageApi();
