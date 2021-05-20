import qs from "qs";
import BaseApiService from "src/services/api/BaseApiService";

export default class WorkloadApi extends BaseApiService {
  // 查询服务之星
  public async queryPageListFwzx(obj: any) {
    return this.post(
      `/studyAndTrain/serviceStar/queryPageList`,
      obj
    );
  }
  // 查询技术能手
  public async queryPageListJsns(obj: any) {
    return this.post(
      `/studyAndTrain/technicalExperts/queryPageList`,
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
      `/studyAndTrain/serviceStar/saveOrUpdate`,
      obj
    );
  }
  // 保存技术能手
  public async saveOrUpdateJsns(obj: any) {
    return this.post(
      `/studyAndTrain/technicalExperts/saveOrUpdate`,
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
    return this.get(
      `/studyAndTrain/serviceStar/delete/${id}`
    );
  }
  // 删除技术能手
  public async deleteInfoJsns(id: any) {
    return this.get(
      `/studyAndTrain/technicalExperts/delete/${id}`
    );
  }
  // 删除工作量统计
  public async deleteInfoGzltj(id: any) {
    return this.get(
      `/delete333/${id}`
    );
  }

  // 导出
  public exportPageList(query: any, type: string) {
    let url = ((type: string) => {
      switch (type) {
        case '2':
          return `/studyAndTrain/technicalExperts/exportPageList`
        case '3':
          return `/studyAndTrain/serviceStar/exportPage3333`
        default:
          return `/studyAndTrain/serviceStar/exportPageList`
      }
    })(type)

    return this.post(
      url,
      query,
      {
        responseType: "blob"
      }
    );
  }
}
export const workloadApi = new WorkloadApi();
