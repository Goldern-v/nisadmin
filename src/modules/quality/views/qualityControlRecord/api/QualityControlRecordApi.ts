import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
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
    return this.post(`/qcItem/template/findList`, query)
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
}

export const qualityControlRecordApi = new QualityControlRecordApi()
