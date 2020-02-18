import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class TrainingInfoReviewService extends BaseApiService {
  public getBaseInfo(id: string) {
    return this.post('/studyAndTrain/teachingPlanManage/viewSummaryInfo', qs.stringify({ id }))
  }
}

export const trainingInfoReviewService = new TrainingInfoReviewService()