import BaseApiService from "src/services/api/BaseApiService";
export default class ArrangStatisticsService extends BaseApiService {
  public countUserAll(obj: any,responseType?:any) {
    return this.post(`/scheduling/countUserAll`, this.stringify(obj),responseType);
  }
  public schNightHourExport(obj: any,responseType?:any) {
    return this.post(`/schNightHour/export`, this.stringify(obj),responseType);
  }
}

export const arrangStatisticsService = new ArrangStatisticsService();
