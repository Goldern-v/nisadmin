import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs';

export default class QcCheckContentSettingService extends BaseApiService {
  public getList(wardCode: string) {
    return this.get(`/wardDict/getList/${wardCode}/qc_ward_check_content`);
  }
  public saveOrUpdate(params: any) {
    return this.post(`/wardDict/saveOrUpdate`, params);
  }
  public delete(query: any) {
    return this.post(`/wardDict/delete`, query);
  }
}

export const qcCheckContentSettingService = new QcCheckContentSettingService()