import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class FlatManageProblemService extends BaseApiService {
  /**问题列表 */
  public getList(query: any) {
    return this.post(`/flatManageInstance/getPageList`, query);
  }
  /**管理类型列表 */
  public getTypeList(query: any) {
    return this.post(`/flatManageInstance/getMangeTypeList`, qs.stringify(query));
  }
  /**审核质量问题 */
  public audit(id: string, remark?: string) {
    return this.post(`/flatManageInstance/audit`, qs.stringify({ id, remark: remark || '' }))
  }
  /**获取护士列表 */
  public getNurses(query: any) {
    return this.post('/educon/eduMasterData/getByFormCodePC', qs.stringify(query));
  }
  /**修改新建扁平管理问题 */
  public saveOrUpdate(params: any) {
    return this.post('/flatManageInstance/saveOrUpdate', params);
  }
  /**删除扁平管理问题 */
  public delete(id: string) {
    return this.get(`/flatManageInstance/delete/${id}`);
  }
}

export const flatManageProblemService = new FlatManageProblemService()