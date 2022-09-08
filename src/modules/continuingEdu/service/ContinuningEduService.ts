import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export interface getDetailByModuleCodeIn extends Record<string, any> {
  moduleCode: string
}

export interface settingList {
  moduleCode: string
  nodeCode: string
  settingValue: string
  settingValueName: string
  settingType: string
  auditType: string
  rollBackType: string
}
export interface configList {
  moduleCode: string
  nodeCode: string
  sortNum: number,
  settingList: settingList[]
}
export interface saveAuditSettingsIn extends getDetailByModuleCodeIn {
  configList: configList
}
export default class ContinuningEduService extends BaseApiService {
  /** 332.学习培训--基本信息--获取当前登录用户的角色信息 */
  public getMyRoles(
    roleDefinedSource?: number //角色定义来源：1来源于flow_role_user表，2来院于职务
  ) {
    return this.post('/studyAndTrain/basicInformation/role/getMyRoles', { roleDefinedSource: roleDefinedSource || 1 })
  }

  /* 获取模块 by 江滨 */
  /**
   * 审核管理
   * @returns 
   */
  public getModuleList() {
    return this.get('/audit/settings/getModuleList')
  }

  /**
   * 更具模块名获取可设置的模块流程化 
   * @returns 
   */
  public getDetailByModuleCode(params: getDetailByModuleCodeIn) {
    return this.get(`/api/audit/settings/getDetailByModuleCode?${JSON.stringify(params)}`)
  }
  /**
   * 保存审核
   * @returns 
   */
  public saveAuditSettings(data: saveAuditSettingsIn) {
    return this.post(`/audit/settings/saveAuditSettings`, data)
  }
}

export const continuningEduService = new ContinuningEduService()