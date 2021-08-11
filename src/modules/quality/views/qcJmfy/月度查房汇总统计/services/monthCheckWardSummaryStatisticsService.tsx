
import BaseApiService from 'src/services/api/BaseApiService'

class MonthCheckWardSummaryStatisticsService extends BaseApiService {
  public queryFormItemData(query: {
    formCode: string,
    scoreItemCode: string,
    beginTime: string,
    endTime: string,
    wardCode: string,
  }) {
    return this.post('/form/searchRoom/master/monthlyStatistics', query)
  }
}

export const monthCheckWardSummaryStatisticsService = new MonthCheckWardSummaryStatisticsService()