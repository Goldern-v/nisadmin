import BaseApiService from '../BaseApiService'
import qs from 'qs'

export default class HomeApiServices extends BaseApiService {
  // 0.删除健康宣教类别字典
  public async deteleHealthy (data: any) {
    const getData = {
      id: data.id, // number 健康宣教类别字典
    }
    return this.get(`/briefMissionType/delete/${getData.id}`)
  }

  // 1.获取健康宣教类别字典
  public async getHealthyList () {
    return this.get(`/briefMissionType/getBriefMissionType`)
  }

  // 2.保存或修改健康宣教类别字典
  public async preservationHealthy (data: any) {
    const postData = {list: [{
      type: data.type, // 健康宣教类别字典
      messageType: data.messageType,
      messageTypeName: data.messageTypeName
    }]}
    return this.post(`/briefMissionType/saveOrUpdateBriefMissionType`, postData)
  }

  // 3.删除自动推送事件类型
  public async deteleAutomatic (data: any) {
    const getData = {
      serialNo: data.serialNo, // 自动推送事件类型id
    }
    return this.get(`/educationSettingEvent/delete/${getData.serialNo}`)
  }

  // 4.获取自动推送事件类型列表
  public async getAutomatic (data: any) {
    const postData = {
      pageSize: data.pageSize,
      pageIndex: data.pageIndex,
      wardCode: data.wardCode, // string 必须参数 科室编码
    }
    return this.post(`/educationSettingEvent/getEducationSettingEventList`, qs.stringify(postData))
  }

  // 5.保存自动推送事件类型
  public async preservationAutomatic (data: any) {
    const postData = {
      serialNo: data.serialNo, // string 非必须参数
      wardCode: data.wardCode, // string 必须参数
      educationId: data.educationId, // string 必须参数
      educationName: data.educationName, // string 必须参数
      patientEvent: data.patientEvent, // string 必须参数
      createDateTime: data.createDateTime, // string 非必须参数
      operator: data.operator, // string 必须参数
      messageType: data.messageType // string 必须参数
    }
    return this.post(`/educationSettingEvent/saveOrUpdate`, postData)
  }

  // 6.获取事件类型列表（下拉列表）
  public async getEventType () {
    return this.get(`/briefMission/getEducationEventDict`)
  }

  // 7.获取推送类型列表（下拉列表）
  public async getPushType () {
    return this.get(`/briefMission/getEducationMessageDict`)
  }

  // 8.删除自动推送手术类型
  public async detelePushType1 (data: any) {
    const getData = {
      serialNo: data.serialNo, // 自动推送事件类型id
    }
    return this.get(`/educationSettingOperation/delete/${getData.serialNo}`)
  }

  // 9.保存自动推送手术类型
  public async preservationPushType1 (data: any) {
    const postData = {
      serialNo: data.serialNo, // string 非必须参数
      wardCode: data.wardCode, // string 非必须参数
      educationId: data.educationId, // string 非必须参数
      educationName: data.educationName, // string 非必须参数
      operationTiming:data.operationTiming,// string 非必须参数(手术时机)
      createDateTime: data.createDateTime, // string 非必须参数
      operator: data.operator, // string 非必须参数
      operation: data.operation, // string 非必须参数
      messageType: data.messageType // string 非必须参数
    }
    return this.post(`/educationSettingOperation/saveOrUpdate`, postData)
  }

  // 10.自动推送手术类型列表
  public async getPushList1 (data: any) {
    const postData = {
      pageSize: data.pageSize,
      pageIndex: data.pageIndex,
      wardCode: data.wardCode, // string 必须参数 科室编码
    }
    return this.post(`/educationSettingOperation/getEducationSettingOperationList`, qs.stringify(postData))
  }

  // 11.删除自动推送医嘱类型
  public async detelePushType2 (data: any) {
    const getData = {
      serialNo: data.serialNo, // 自动推送事件类型id
    }
    return this.get(`/educationSettingOrder/delete/${getData.serialNo}`)
  }

  // 12.保存自动推送医嘱类型
  public async preservationPushType2 (data: any) {
    const postData = {
      serialNo: data.serialNo, // string 非必须参数
      wardCode: data.wardCode, // string 必须参数
      educationId: data.educationId, // string 必须参数
      educationName: data.educationName, // string 必须参数
      orderText: data.orderText, // string 必须参数
      createDateTime: data.createDateTime, // string 非必须参数
      operator: data.operator, // string 必须参数
      messageType: data.messageType // string 必须参数
    }
    return this.post(`/educationSettingOrder/saveOrUpdate`, postData)
  }

  // 13.自动推送医嘱类型列表)
  public async getPushList2 (data: any) {
    const postData = {
      pageSize: data.pageSize,
      pageIndex: data.pageIndex,
      wardCode: data.wardCode, // string 必须参数 科室编码
    }
    return this.post(`/educationSettingOrder/getEducationSettingOrderList`, qs.stringify(postData))
  }

  // 14.获取宣教字典列表
  public async getBriefMission (data: any) {
    const postData = {
      deptCode: data.wardCode, // string 非必须参数
      type: data.messageType, // string 必须参数
      name: data.educationName, // string 必须参数
    }
    return this.post(`/briefMission/getBriefMission`, postData)
  }
}
