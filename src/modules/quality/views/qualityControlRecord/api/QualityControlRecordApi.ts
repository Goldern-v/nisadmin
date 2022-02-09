import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
import { IRespose } from 'src/configs/api'
export interface NurseQuery {
  deptCode?: string /** 部门编码 */
  empNo?: string /** 员工工号 */
  education: string /** 学历 */
  title: string /** 职称 */
  currentLevel: string /** 能级、层级 */
  post: string /**  当前页数  */
  pageIndex: number /**  职务  */
  pageSize: number /**   每页页数 */
  empName: string /**   每页页数 */
}

/**
 * 审核人列表
 */
export interface IUserCode {
  code: string,//code
  name: string,//姓名
}

/**
 * 字典：获取某节点审核人列表
 */
export interface IAppointUserCode{
  qcCode?: string, //质控code
  wardCode?: string, //科室code
  appointUserCode?: string,//指定人类型编码
}

export interface judgePowerYXIn extends Record<string, any> {
  nodeCode?: string,
  chainCode?: string,
  empNo?: string
}

export default class QualityControlRecordApi extends BaseApiService {
  // 获取护士列表
  public async getByFormCodePC(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === '全部') {
        obj[key] = ''
      }
    })
    return this.post(`/auditeNurseList/getByFormCodePC`, this.stringify(obj))
  }
  // 质控表单字典
  public async dictTemplate() {
    return this.get(`/qcItem/dict/template`)
  }
  // 字典：质控表流程状态
  public async dictChainNode() {
    return this.get(`/qcItem/dict/chainNode`)
  }
  // 质控记录单列表
  public async instanceGetPageByCondition(getData: any) {
    return this.post(`/qcItem/instance/getPageByCondition`, getData)
  }
  //质控记录单列表实例详情
  public async qcItemInstanceGet(id: string) {
    return this.get(`/qcItem/instance/get/${id}`)
  }
  //质控记录单处理
  public handleNode(obj: any) {
    if (appStore.HOSPITAL_ID == 'whyx') {
      return this.handleNodeYX(obj)
    }
    return this.post(`/qcItem/instance/handleNode`, obj)
  }
  //本人可查看质控科室
  public qcWardCodeList() {
    return this.get(`/qcItem/dict/qcWardCodeList`)
  }
  /** 本人可以看质控组 */
  public qcRoleCodeSelf() {
    return this.get('/qcItem/dict/qcRoleCodeSelf')
  }
  /** 选项措施数据 */
  public getMeasureList(qcMasterId: string) {
    return this.get(`/qcItem/dict/getMeasureList/${qcMasterId}`)
  }
  /**获取质控表单类型列表 */
  public formTemplateList(query: { level: number, templateName: string }) {
     // by 亚心
     const obj = { 4: '护理部职能督导' }
     let other: any = {}
     if (obj[query.level]) {
       other.level = obj[query.level]
     }
     return this.post(`/qcItem/template/findList`, { ...query, ...other })
  }
  /**获取质控表单模板详情 */
  public formTemplateDetail(qcCode: string | number) {
    return this.get(`/qcItem/template/detail/${qcCode}`)
  }
  /**获取质控表单关联科室 */
  public formTemplateDeptList(qcCode: string | number) {
    return this.get(`/qcItem/template/dept/${qcCode}`)
  }
  /**保存评价单实例 */
  public formSave(params: any) {
    return this.post('/qcItem/instance/save', params)
  }
  /**获取质控人员 */
  public getUserByRoles(roleCodes: any[]) {
    return this.post('/user/getUserByRoles', { roleCodes })
  }
  /**获取管床护士 */
  public getBedNurseList(deptCode: string) {
    return this.get(`/auditeNurseListWH/getByFormCode/` + deptCode)
  }
  /**删除评价单 */
  public formDelete(id: string) {
    return this.post(`/qcItem/instance/delete`, { id })
  }

  /**撤销评价单 */
  public revokeHandleForNode(params: any) {
    return this.post(`/qcItem/instance/revokeHandleForNode`, params)
  }

  /**质控详情导出 */
  public exportQcItemDetail(id: string) {
    if (appStore.HOSPITAL_ID == 'whyx') {
      return this.exportQcItemDetailYX(id)
    }
    return this.get(`/qcItem/instance/export/${id}`, { responseType: 'blob' })
  }

  /**质控详情批量导出 */
  public exportList(list: any[]) {
    if (appStore.HOSPITAL_ID == 'whyx') {
      return this.exportListYX(list)
    }
    return this.post(`/qcItem/instance/exportList`, { list }, { responseType: 'blob' })
  }

  /** 质控详情全部导出*/
  public exportAll(exportParams: any) {
    return this.post(`/qcItem/instance/exportListByCondition`, exportParams, { responseType: 'blob' })
  }

  /**
   * 字典：获取某节点审核人列表
   */
  // public async getListByAppointUserCode(qcCode: string, wardCode: string, appointUserCode: string) {
  public async getListByAppointUserCode(parmas:IAppointUserCode) {
    // let srcUrl="/qcItem/dict/getListByAppointUserCode";
    if(["gzsrm"].includes(appStore.HOSPITAL_ID)){
      return this.get(`/qcItem/dict/getHeadNurseUserList`)
    }else {
      return this.post(`/qcItem/dict/getListByAppointUserCode`, parmas)
    }
    // return this.post(`/qcItem/dict/getListByAppointUserCode`, parmas)
  }
  /**
   * 我创建的（贵州）
   * 待我处理的（贵州）
   * @param data 
   * @returns 
   */
  public async getPageByNewNoType(readWay:number=-3,data: any) {
    console.log(readWay)
    console.log("readWay")
    switch(readWay.toString()){
      case '-3':
        //我创建的（贵州）
        return this.post(`/qcItem/instance/getPageByCreatorNo`, data);
      case '-4':
        //待我处理的（贵州）
        return this.post(`/qcItem/instance/getPageCanHandle`, data);
      case '-5':
        //我已处理的（贵州）
        return this.post(`/qcItem/instance/getPageByMyHandled`, data);
      default:
        //我创建的（贵州）
        return this.post(`/qcItem/instance/getPageByCreatorNo`, data);
    }
    //return this.post(`/qcItem/instance/getPageByCreatorNo`, data)
  }
  /**
   * 获取质控需要定制化处理的表单code数组 （贵州）
   */
  public async getFilterQcCodeList() {
    return this.get(`/qcItem/getQcCodeList`)
  }

  /**撤销评价单 */
  public revokeHandleForNodeForSat(params: any) {
    return this.post(`/qcItem/instance/revokeHandleForNodeForSat`, params)
  }

  /**
   * 获取质控表单模板详情 by亚心
   */
  public formTemplateDetailYX(qcCode: string | number) {
    return this.get(`/yxQcItem/template/detail/${qcCode}`)
  }
  /**
   * 保存评价单实例 by亚心
   */
  public formSaveYX(params: any) {
    return this.post('/yxQcItem/instance/save', params)
  }
  /**
   * 质控记录单列表实例详情 by亚心
   */
  public async qcItemInstanceGetYX(id: string) {
    return this.get(`/yxQcItem/instance/get/${id}`)
  }
  /**
   * 质控记录单处理 by亚心
   */
  public handleNodeYX(obj: any) {
    return this.post(`/yxQcItem/instance/handleNode`, obj)
  }
  /**
   * 查看是否有审核权限 by亚心
   * @param obj 
   * @returns 
   */
  public judgePowerYX(obj: judgePowerYXIn) {
    return this.post(`/yxQcItem/instance/judgePower`, obj)
  }
  /**
   * 质控详情导出 by亚心
   */
  public exportQcItemDetailYX(id: string) {
    return this.get(`/yxQcItem/instance/export/${id}`, { responseType: 'blob' })
  }
  /**质控详情批量导出 by亚心 */
  public exportListYX(list: any[]) {
    return this.post(`/yxQcItem/instance/exportList`, { list }, { responseType: 'blob' })
  }
  /**质控获取状态 by亚心 */
  public dictChainNodeYX(num: number) {
    return this.get(`/qcItem/dict/chainNodeForYX/${num}`)
  }
}

export const qualityControlRecordApi = new QualityControlRecordApi()
