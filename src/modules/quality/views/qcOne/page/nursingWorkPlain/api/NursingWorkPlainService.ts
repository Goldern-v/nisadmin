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
  public getDict(query: { wardCode: string, dictCode: string }) {
    const { wardCode, dictCode } = query
    return this.get(`/wardDict/getList/${wardCode}/${dictCode}`);
  }

  /**修改字典 */
  public saveOrUpdateDict(params: any) {
    return this.post(`/wardDict/saveOrUpdate`, params);
  }

  /**删除字典 */
  public deleteDict(query: any) {
    return this.post(`/wardDict/delete`, query);
  }

  /**导出 */
  public exportData(query: any) {
    return this.post('/qcFlReport/export/workSchedule', query, { responseType: 'blob' })
  }
}

export const nursingWorkPlainService = new NursingWorkPlainService()