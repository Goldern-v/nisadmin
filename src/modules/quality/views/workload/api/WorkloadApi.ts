import qs from "qs";
import BaseApiService from "src/services/api/BaseApiService";

export default class WorkloadApi extends BaseApiService {
  // 查询服务之星
  public async queryPageListFwzx(obj: any) {
    return this.post(
      `/query111`,
      obj
    );
  }
  // 查询技术能手
  public async queryPageListJsns(obj: any) {
    return this.post(
      `/query222`,
      obj
    );
  }
  // 查询工作量统计
  public async queryPageListGzltj(obj: any) {
    return this.post(
      `/query333`,
      obj
    );
  }

  // 保存服务之星
  public async saveOrUpdateFwzx(obj: any) {
    return this.post(
      `/save111`,
      obj
    );
  }
  // 保存技术能手
  public async saveOrUpdateJsns(obj: any) {
    return this.post(
      `/save222`,
      obj
    );
  }
  // 保存工作量统计
  public async saveOrUpdateGzltj(obj: any) {
    return this.post(
      `/save333`,
      obj
    );
  }

  // 删除服务之星
  public async deleteInfoFwzx(id: any) {
    return this.post(
      `/delete111`,
      { id }
    );
  }
  // 删除技术能手
  public async deleteInfoJsns(id: any) {
    return this.post(
      `/delete222`,
      { id }
    );
  }
  // 删除工作量统计
  public async deleteInfoGzltj(id: any) {
    return this.post(
      `/delete333`,
      { id }
    );
  }

  // 导出
  public exportPageList(obj?: any) {
    return this.post(
      `/export`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
}
export const workloadApi = new WorkloadApi();
