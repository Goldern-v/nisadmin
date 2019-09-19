import BaseApiService from 'src/services/api/BaseApiService'

export default class StatisticsService extends BaseApiService {

  /** 统计查询 */
  public getTableData(type: string, obj: any) {
    return this.post(`/${type}/count`, obj)
  }
  /** 导出 */
  public exportExcel(type: string, obj: any) {
    return this.post(`/${type}/excel`, obj, { responseType: 'blob' })
  }
}

export const statisticsService = new StatisticsService()
