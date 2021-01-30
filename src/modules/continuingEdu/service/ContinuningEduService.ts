import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class ContinuningEduService extends BaseApiService {
  /** 332.学习培训--基本信息--获取当前登录用户的角色信息 */
  public getMyRoles(
    roleDefinedSource?: number //角色定义来源：1来源于flow_role_user表，2来院于职务
  ) {
    return this.post('/studyAndTrain/basicInformation/role/getMyRoles', { roleDefinedSource: roleDefinedSource || 1 })
  }
}

export const continuningEduService = new ContinuningEduService()