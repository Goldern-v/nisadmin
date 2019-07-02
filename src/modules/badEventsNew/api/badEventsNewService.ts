import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class BadEventsNewService extends BaseApiService {
  //不良事件列表
  public async getList(query: any) {
    return this.post('/badEvent/findBadEventList', query);
  }
  //不良事件详情
  public async getDetail(id: any) {
    return this.get(`/badEvent/findBadEventDetailById/${id}`);
  }
  //不良事件类型列表
  public async getEvetTypetList(wardCode?: any) {
    return this.get(`/badEvent/findBadEventTemplateByWardCode/${wardCode}`);
  }
  //不良事件详情操作时间线
  public async getTimeline(id: any) {
    return this.get(`/badEvent/getStreamByInstanceId/${id}`);
  }
  //检查用户名和密码
  public async checkUser(query: any) {
    return this.post(`/form/checkUser`, query);
  }
  //不良事件审核
  public async aduit(params: any) {
    return this.post(`/badEvent/aduit`, params);
  }
  //获取全部科室单元
  public async getDeptList(types?: string) {
    return this.post(`/badEventDept/getByTypeList`, qs.stringify({ type: types || '1,2' }));
  }
}

