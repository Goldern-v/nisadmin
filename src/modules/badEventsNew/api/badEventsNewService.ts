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
  public async getEvetTypetList(str?: any) {
    return this.post(`/dept/dictInfo`, qs.stringify({ code: 'badEvent_eventType' }));
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
  //不良事件统计数据
  public async badEventTotal(params: any) {
    return this.post(`/badEventM/badEventTotal`, params);
  }
  //不良事件统计导出
  public async badEventTotalExport(params: any) {
    return this.post(`/badEventM/badEventTotal/export`, params);
  }
  //不良事件发生率
  public async badEventHappenPercent(params: any) {
    return this.post(`/badEventM/badEventHappenPercent`, params);
  }
  //不良事件发生率导出
  public async badEventHappenPercentExport(params: any) {
    return this.post(`/badEventM/badEventHappenPercent/export`, params);
  }
  //获取病人信息
  public async getPatientInfo(patientId: string | number, visitId: string | number) {
    return this.get(`/patient/info/${patientId}/${visitId}`)
  }

  //待我处理
  public getWaitHandler(query: {
    pageIndex: number,
    pageSize: number,
    eventType: string,
    wardCode: number | string,
    [p: string]: any
  }) {

    const { pageIndex, pageSize, eventType, wardCode } = query
    return this.post('/badEvent/getWaitHandler', {
      pageIndex, pageSize, eventType, wardCode
    })
  }

  //我已处理
  public getMyHandler(query: {
    pageIndex: number,
    pageSize: number,
    eventType: string,
    wardCode: number | string,
    [p: string]: any
  }) {

    const { pageIndex, pageSize, eventType, wardCode } = query
    return this.post('/badEvent/getMyHandler', {
      pageIndex, pageSize, eventType, wardCode
    })
  }
}

export const badEventsNewService = new BadEventsNewService()
