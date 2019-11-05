import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  status: string,
  pageIndex: number,
  pageSize: number
}
export default class CheckWardReportListService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/srReport/getPage', query)
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post('/srReport/createReport', query)
  }

  /**删除 */
  public delete(id: string) {
    return this.post(`/srReport/delete/${id}`)
  }

  /**发布报告 */
  public publish(id: string) {
    return this.post(`/srReport/publish/${id}`)
  }

  /**撤销发布报告 */
  public cancelPublish(id: string) {
    return this.post(`/srReport/revoke/${id}`)
  }
}

export const checkWardReportListService = new CheckWardReportListService()