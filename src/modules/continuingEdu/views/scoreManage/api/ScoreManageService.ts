
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'


export default class ScoreManageService extends BaseApiService {
  /** 获取我已评分列表 */
  public queryAuditedPageList(query: any) {
    return this.post(`/studyAndTrain/auditManage/queryAuditedPageList`, query)
  }

  /** 获取待我评分列表 */
  public queryToAuditPageList(query: any) {
    return this.post(`/studyAndTrain/scoreManage/queryToScorePageListt`, query)
  }

  /** 获取菜单树 */
  public getMenuTree() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`)
  }

  /** 批量评分 */
  public auditEduPlan(params: any) {
    return this.post(`/studyAndTrain/auditManage/batchAuditTeachingPlan`, params)
  }
}

export const scoreManageService = new ScoreManageService()