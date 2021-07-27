
import BaseApiService from 'src/services/api/BaseApiService'

class MonthCheckWardSummaryStatisticsService extends BaseApiService {
  public queryFormItemData(query: {
    formCode: string,
    itemCode: string,
    year: string,
    month: string,
    wardCode: string,
  }) {
    return this.post('/form/item/data/queryFormItemData', query)
  }
}

export const monthCheckWardSummaryStatisticsService = new MonthCheckWardSummaryStatisticsService()