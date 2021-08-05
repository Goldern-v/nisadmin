
import BaseApiService from 'src/services/api/BaseApiService'

class MonthCheckWardSummaryStatisticsService extends BaseApiService {
  public queryFormItemData(query: {
    formCode: string,
    year: string,
    month: string,
  }) {
    return this.post('/form/searchRoom/master/query', query)
  }
}

export const monthCheckWardSummaryStatisticsService = new MonthCheckWardSummaryStatisticsService()