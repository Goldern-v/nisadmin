import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingRulesApiService extends BaseApiService {
  public getList(query: any) {
    return this.post(`/FlatManageSetting/selectByDept`, qs.stringify(query));
  }
  public upload(form: any) {
    return this.post(`/FlatManageSetting/saveAndUpload`, form);
  }
  public update(params: any) {
    return this.post(`/FlatManageSetting/updateManageType`, qs.stringify(params));
  }
  public delete(id: string) {
    return this.post(`/FlatManageSetting/deleteById`, qs.stringify({ id }));
  }
  public getFileContent(id: any) {
    return this.post('/FlatManageSetting/getFile', qs.stringify({ id }))
  }
}