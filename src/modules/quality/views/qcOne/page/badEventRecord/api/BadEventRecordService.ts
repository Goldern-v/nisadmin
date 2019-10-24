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

export default class BadEventRecordService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post('/qcBadEvent/findEvent', query)
  }

  /**新建编辑 */
  public saveOrUpdate(query: any) {
    return this.post('/qcWorkSchedule/saveOrUpdate', query)
  }

  /**编辑详情接口 */
  public toSaveOrUpdate(id: string) {
    return this.get(`/qcBadEvent/toSaveOrUpdate/${id}`)
  }

  /**详情接口 */
  public getDetail(id: string, wardCode: string) {
    return this.get(`/qcBadEvent/detail/${wardCode}/${id}`)
  }

  /**删除 */
  public delete(id: string) {
    return this.get(`/qcBadEvent/delete/${id}`)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }
}

export const badEventRecordService = new BadEventRecordService()