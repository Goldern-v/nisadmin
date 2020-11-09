import BaseApiService from "src/services/api/BaseApiService";

export default class Index extends BaseApiService {
  //获取查房科室
  public getNursingUnit(nursingUnit: any) {
    return this.get(`/user/${nursingUnit}`);
  }

  //查询数据
  public getData(obj: any) {
    return this.post(`/nursingQuality/countAll`, obj);
  }

  //导出
  public exportData() {}
}
export const api = new Index();
