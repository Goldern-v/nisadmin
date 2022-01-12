import BaseApiService from "src/services/api/BaseApiService";

export default class NursingDataApi extends BaseApiService {
  //获取查房科室
  public getNursingUnit(nursingUnit: any) {
    return this.get(`/user/${nursingUnit}`);
  }

  //查询数据
  public getData(obj: any) {
    return this.post(`/nursingQuality/countAll`, obj);
  }

  //导出
  public exportData(exportParams: any) {
    return this.post(`/nursingQuality/export`, exportParams, { responseType: 'blob' })
  }
}
export const nursingDataApi = new NursingDataApi();
