import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class TrainingInfoReviewService extends BaseApiService {
  //获取信息
  public getBaseInfo(id: string) {
    return this.post('/studyAndTrain/teachingPlanManage/viewSummaryInfo', qs.stringify({ id }))
  }

  //获取考卷信息 
  public previewPaper(cetpId: string) {
    return this.post('/studyAndTrain/teachingPlanManage/previewPaper', qs.stringify({ cetpId }))
  }

  //获取审核信息
  public getAuditInfo(cetpId: string) {
    return this.post('/studyAndTrain/auditManage/getFlowTaskHisByCetpId', qs.stringify({ cetpId }))
  }
}

export const trainingInfoReviewService = new TrainingInfoReviewService()