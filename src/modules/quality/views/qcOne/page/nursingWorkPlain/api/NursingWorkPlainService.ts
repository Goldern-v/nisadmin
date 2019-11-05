import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export interface ListQuery {
  wardCode: string,
  year: string,
  month: string,
  type: string,
  pageIndex: number,
  pageSize: number
}

export default class NursingWorkPlainService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcWorkSchedule/getPage', query)
  }

  /**新建编辑 */
  public saveOrUpdate(query: any) {
    return this.post('/qcWorkSchedule/saveOrUpdate', query)
  }

  /**删除 */
  public delete(query: any) {
    return this.post('/qcWorkSchedule/delete', query)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }

  /**导出 */
  public exportData(query: { wardCode: string, year: string, month: string }) {
    return this.post('/qcFlReport/export/workSchedule', query, { responseType: 'blob' })
  }
}

export const nursingWorkPlainService = new NursingWorkPlainService()