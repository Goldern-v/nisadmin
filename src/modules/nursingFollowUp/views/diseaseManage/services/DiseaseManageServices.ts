import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'

export default class DiseaseManageServices extends BaseApiService {
  // 获取全部科室列表 
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  //获取病种列表 -（分页查询）
  public visitDiseaseType(obj: PageOptions | any) {
    return this.post(`/visit/visitDiseaseType/queryPageList`, obj)
  }
  //获取全部病种列表
  public getAllList(obj: PageOptions | any) {
    return this.post(`/visit/visitTemplate/getAllList`, obj)
  }
  //保存或更新病种
  public saveOrUpdate(obj: PageOptions | any) {
    return this.post(`/visit/visitDiseaseType/saveOrUpdate`, obj)
  }
  //通过ID删除病种
  public delete(obj: PageOptions | any) {
    return this.post(`/visit/visitDiseaseType/delete`, obj)
  }
}

export const diseaseManageServices = new DiseaseManageServices()