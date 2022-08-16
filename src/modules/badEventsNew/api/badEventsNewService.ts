import qs from 'qs'
import BaseApiService from 'src/services/api/BaseApiService'

export interface dateIn {
  dateBegin: string,
  dateEnd: string
}
export interface revokeIn {
  empNo: string,
  password: string
  id: string,
  noPass: boolean,
  nodeCode: string,
  operateType: 'withdraw',
}
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
  // 护理单元(新)
  public async nursingUnit() {
    return this.get('user/nursingUnit')
  }
  //不良事件统计数据
  public async badEventTotal(params: any) {
    return this.post(`/badEventM/badEventTotal`, params);
  }
  //不良事件统计导出
  public async badEventTotalExport(params: any) {
    return this.post(`/badEventM/badEventTotal/export`, params, { responseType: 'blob' });
  }
  //不良事件发生率
  public async badEventHappenPercent(params: any) {
    return this.post(`/badEventM/badEventHappenPercent`, params);
  }
  //不良事件发生率导出
  public async badEventHappenPercentExport(params: any) {
    return this.post(`/badEventM/badEventHappenPercent/export`, params, { responseType: 'blob' });
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

    // const { pageIndex, pageSize, eventType, wardCode } = query
    return this.post('/badEvent/getWaitHandler', query)
  }

  //我已处理
  public getMyHandler(query: {
    pageIndex: number,
    pageSize: number,
    eventType: string,
    wardCode: number | string,
    [p: string]: any
  }) {

    // const { pageIndex, pageSize, eventType, wardCode } = query
    return this.post('/badEvent/getMyHandler', query)
  }

  /**
   * 获取我已处理列表(新)-2021-7-9
   */
  public getPageByMyHandled(query: {
    wardCode: string,
    beginDate: string,
    endDate: string,
    formCodes: string[],
    pageIndex: number,
    pageNumber: number,
  }) {
    return this.post('/form/badEventMaster/master/getPageByMyHandled', query)
  }


  /**
   * 获取待我处理列表(新)-2021-7-9
   */
  public getPageCanHandle(query: {
    wardCode: string,
    beginDate: string,
    endDate: string,
    formCodes: string[],
    pageIndex: number,
    pageNumber: number,
  }) {
    return this.post('/form/badEventMaster/master/getPageCanHandle', query)
  }

  /**
   * 获取不良事件详情(新)-2021-7-9
   */
  public getBadEventMaster(id: number | string) {
    return this.get(`/form/badEventMaster/master/get/${id}`)
  }

  /**
   * 审核不良事件(新)-2021-7-9
   * @param params 
   */
  public auditBadEventMaster(params: {
    nodeCode: string | number,
    id: string | number,
    expand: string,
    noPass: boolean,
    empNo: string,
    password: string,
    handleContent: string,
  }) {
    return this.post('/form/badEventMaster/master/handleNode', params)
  }

  /**
   * 保存修改不良事件(新)-2021-7-9
   */
  public badEventMasterSave(params: {
    master: any,
    itemDataMap: any,
    commit: boolean,
  }) {
    return this.post('/form/badEventMaster/master/save', params)
  }
  /**
   * 获取不良事件列表（聊城使用）
   */
  public getPage(params:{
    wardCode: string,
    beginDate: string,
    endDate: string,
    formCodes: string[],
    [p: string]:any,
    pageIndex: number,
    pageNumber: number,
  }) {
    return this.post('/form/badEventMaster/master/getPage',params)
  }

  /**
   * 修改审核意见
   */
  public updateOpinion(data:any) {
    return this.post('/form/badEventMaster/master/updateOpinion',data)
  }

  /**
   * 获取护士长意见模板（杏坛）
   */
   public getCommentList() {
    return this.get('/badEventAuditTemplate/getList')
    
  }

  /**
   * 新增或修改护士长意见模板（杏坛）
   */
   public saveOrUpdateApi(body:any) {
    return this.post('/badEventAuditTemplate/saveOrUpdate',body)
    
  }

  /**
   * 新增或修改护士长意见模板（杏坛）
   */
     public deleteById(id:any) {
      return this.get(`/badEventAuditTemplate/deleteById/${id}`)
      
  }
  
  //不良事件统计数据(新版)
  public async badEventStat(params: any) {
    return this.post(`/badEventReport/badEventStat`, params);
  }
  
  //不良事件统计导出（新版）
  public async exportBadEventStat(params: any) {
    return this.post(`/badEventReport/exportBadEventStat`, params, { responseType: 'blob' });
  }

  //不良事件类型列表
  public async getBadEventTypeList() {
   return this.get(`/badEventReport/getBadEventType`);
  }

  // 获取不良事件统计
  public async getBeSummaryYc(params: dateIn) {
   return this.post(`/badEventReport/getBeSummaryYc`,params);
  }
  // 不良事件统计导出
  public async exportBeSummaryYc(params: dateIn) {
   return this.post(`/badEventReport/exportBeSummaryYc`,params, { responseType: 'blob' });
  }
  // 不良事件登记汇总
  public async getBeRegistrationSummaryYc(params: dateIn) {
   return this.post(`/badEventReport/getBeRegistrationSummaryYc`,params);
  }
  // 不良事件汇总表导出
  public async exportBeRegistrationSummaryYc(params: dateIn) {
   return this.post(`/badEventReport/exportBeRegistrationSummaryYc`,params, { responseType: 'blob' });
  }
  /**
   * 撤销流程 by贵州
   * @param params 
   * @returns
   */
  public async handleRevoke(params: revokeIn) {
    return await this.post(`/form/badEventMaster/common/operateBadEvent`, params)
  }
  /**
   * 删除不良事件
   * @param id 唯一值
   * @returns 
   */
  public async deleteBE(id: string) {
    return await this.post(`form/badEventMaster/master/delete`, { id })
  }
}

export const badEventsNewService = new BadEventsNewService()
