
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'


export default class AuditEduPlantService extends BaseApiService {
  /** 获取我已审核列表 */
  public queryAuditedPageList(query: any) {
    return this.post(`/studyAndTrain/auditManage/queryAuditedPageList`, query)
  }

  /** 获取待我审核列表 */
  public queryToAuditPageList(query: any) {
    return this.post(`/studyAndTrain/auditManage/queryToAuditPageList`, query)
  }

  /** 获取菜单树 */
  public getMenuTree() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`)
  }

  /** 批量审核 */
  public auditEduPlan(params: any) {
    return this.post(`/studyAndTrain/auditManage/batchAuditTeachingPlan`, params)
  }
}

export const auditEduPlantService = new AuditEduPlantService()