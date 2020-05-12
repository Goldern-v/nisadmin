import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class NursingDataApi extends BaseApiService {
  //获取查房科室
  public getNursingUnit() {
    return this.get(`/user/nursingUnit`);
  }

  //查询数据
  public getData() {}

  //导出
  public exportData() {}
}
export const nursingDataApi = new NursingDataApi();
