import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class NursingChargesApi extends BaseApiService {
  //获取全部科室单元
  public async getDeptList() {
    return this.get(`/user/nursingUnit/all`);
  }

  //获取质控指标字典
  public getIndicatorDict() {
    return this.get("/qc/indicators/getIndicatorDict");
  }

  //获取质控指标
  public getRate(obj: any) {
    return this.post(`/qc/indicators/getRate`, obj);
  }

  //导出
  public exportRate(obj: any) {
    return this.post(`/qc/indicators/exportRate`, obj, {
      responseType: "blob"
    });
  }
}
export const nursingChargesApi = new NursingChargesApi();
