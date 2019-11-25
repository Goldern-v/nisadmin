import BaseApiService from "src/services/api/BaseApiService";
export default class ArrangStatisticsService extends BaseApiService {
  public countUserAll(obj: any) {
    return this.post(`/scheduling/countUserAll`, this.stringify(obj));
  }
}

export const arrangStatisticsService = new ArrangStatisticsService();
