import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingRulesApiService extends BaseApiService {
  public getList(query: any) {
    return this.post(`/flatManageSetting/getPageList`, qs.stringify(query));
  }
  public upload(form: any) {
    return this.post(`/flatManageSetting/saveSetting`, form);
  }
  public update(params: any) {
    return this.post(`/flatManageSetting/updateManageType`, qs.stringify(params));
  }
  public delete(id: string) {
    return this.post(`/flatManageSetting/deleteById`, qs.stringify({ id }));
  }
  public getFileContent(id: any) {
    return this.post('/flatManageSetting/getFile', qs.stringify({ id }))
  }
}