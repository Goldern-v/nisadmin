
import BaseApiService from "src/services/api/BaseApiService"
import qs from 'qs'

export default class TrainingResultService extends BaseApiService {
  /**获取概要信息 */
  public getInfo(id: string) {
    return this.post(`/studyAndTrain/teachingPlanManage/viewSummaryInfo`, qs.stringify({ id }))
  }
  /** 查看结果列表 */
  public getTableData(query: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/viewResults`, query)
  }

  /** 修改成绩有效状态 */
  public updateGradesValid(query: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/updateValidStatusOfAchievement`, query)
  }

  /** 发布成绩 */
  public publishGrades(query: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/publishResults`, query)
  }

  /** 获取片区病区数据 */
  public getBigDeptMentTree() {
    return this.post(`/studyAndTrain/teachingPlanManage/getBigDeptMentTree`)
  }
  /** 获取职称信息 */
  public getAllTitles() {
    return this.post(`/studyAndTrain/teachingPlanManage/getAllTitles`)
  }

  /**获取一二级菜单信息 */
  public getMenuChain(cetpId: string) {
    return this
      .post(`/studyAndTrain/teachingPlanManage/getMenuChainByCetpId`,
        qs.stringify({ cetpId }))
  }
}

export const trainingResultService = new TrainingResultService()