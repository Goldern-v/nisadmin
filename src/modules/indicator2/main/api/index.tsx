import BaseApiService from "src/services/api/BaseApiService";

export default class Index extends BaseApiService {
  //获取查房科室
  public getDeptList(nursingUnit: string) {
    return this.get(`/user/${nursingUnit}`);
  }

  //获取专科季度统计表
  public getDataBySpecial(params: { wardCode: string, year: string }) {
    return this.post(`/sensitiveIndicator/countSpecialByQuarter`, params);
  }

  //获取公共季度统计表
  public getDataByPublic(params: { wardCode: string, year: string }) {
    return this.post(`/sensitiveIndicator/countPublicByQuarter`, params);
  }

}
export const api = new Index();
