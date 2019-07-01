import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingRulesApiService extends BaseApiService {
  public async getList(query: any) {
    return this.post('/nursingInstitution/getList', query);
  }

  public async upload(formData: any) {
    return this.post('/nursingInstitution/upload', formData);
  }

  public async download(query: any) {
    return this.post('/nursingInstitution/getFileContent', qs.stringify(query), { responseType: 'blob' });
  }

  public async deleteFile(query: any) {
    return this.post('/nursingInstitution/delete', qs.stringify(query));
  }

  public async getType() {
    return this.get('/nursingInstitution/getTypeDict');
  }
}