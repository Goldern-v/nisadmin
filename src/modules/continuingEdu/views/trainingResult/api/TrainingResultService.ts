
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

  /** 查看结果列表 */
  public queryToScoreDetailList(query: any) {
    return this.post(`/studyAndTrain/scoreManage/queryToScoreDetailList`, query)
  }

  /** 修改成绩有效状态 */
  public updateGradesValid(query: any) {
    return this.post(`/studyAndTrain/teachingPlanManage/updateValidStatusOfAchievement`, query)
  }

  /** 发布成绩 */
  public publishGrades(cetpId: string) {
    return this.post(`/studyAndTrain/teachingPlanManage/publishResults`, qs.stringify({ cetpId }))
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

  /**查看个人考卷 */
  public reviewExamPaper(cetpId: string | number, empNo: string | number) {
    return this
      .post(`/studyAndTrain/teachingPlanManage/reviewExamPaper`,
        { cetpId, empNo })
  }

  /**保存问答题评分 */
  public saveScores(params: any) {
    return this.post(`/studyAndTrain/examManage/saveScoresForShortQuestions`,
      params)
  }

  /**实操-获取指定考生的评分信息 */
  public reviewScoreItemsByCetpId(params: any) {
    return this.post(`/studyAndTrain/practiseManage/reviewScoreItemsByCetpId`,
      qs.stringify(params))
  }

  /**实操-上传成绩 */
  public uploadScores(params: any) {
    return this.post(`/studyAndTrain/practiseManage/uploadScores`,
      params)
  }

  /**实操-上传成绩 */
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`)
  }
}

export const trainingResultService = new TrainingResultService()