import BaseApiService from "src/services/api/BaseApiService"

class LeaveStatisticsService extends BaseApiService {
  /**请假管理-请假统计 */
  public queryStatDatasGroupByDept(query: {
    queryBeginTime: string, //查询开始时间
    queryEndTime: string, //查询结束时间
  }) {
    return this.post('/leaveManage/queryStatDatasGroupByDept', query)
  }
}

export const leaveStatisticsService = new LeaveStatisticsService()