import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingRulesApiService extends BaseApiService {
  public getList(query: any) {
    return this.post(`/deptShareFile/getList`, query);
  }
  public upload(form: any) {
    return this.post(`/deptShareFile/upload`, form);
  }
  public update(params: any) {
    return this.post(`/deptShareFile/update`, params);
  }
  public delete(id: any) {
    return this.get(`/deptShareFile/delete/${id}`);
  }
  public getFileContent(id: any) {
    return this.post('/deptShareFile/getFileContent', qs.stringify({ id }), { responseType: 'blob' })
  }
  public getCatalog(params: any) {
    return this.post('/deptShareFile/getAllCatalog', qs.stringify(params))
  }
  public saveOrUpdateCatalog(params: any) {
    return this.post('/deptShareFile/saveOrUpdateCatalog', params)
  }
  public deleteCatalog(id: any) {
    return this.get(`/deptShareFile/deleteCatalog/${id}`)
  }
}