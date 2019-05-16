import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
class StatisticsApi extends BaseApiService {
  // 首页 护理人员情况
  public async indexInfo (exportData: any = true) {
    let postData = {
      deptCode: exportData.deptCode,
      item: exportData.item
    }
    // let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/nursingUser`, postData)
  }
}

export default new StatisticsApi()
