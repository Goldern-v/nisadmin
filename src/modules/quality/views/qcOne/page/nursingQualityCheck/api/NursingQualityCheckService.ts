import BaseApiService from 'src/services/api/BaseApiService'
// import qs from 'qs'

export default class NursingQualityCheckService extends BaseApiService {
  /**列表接口 */
  public getPage(query: any) {
    return this.post('/qcWardCheck/getPage', query)
  }

  /**新建编辑 */
  public saveOrUpdate(query: any) {
    return this.post('/qcWardCheck/saveOrUpdate', query)
  }

  /**详情接口 */
  public getDetail(id: string) {
    return this.get(`/qcWardCheck/getDetail/${id}`)
  }

  /**删除 */
  public delete(id: string) {
    return this.get(`/qcWardCheck/delete/${id}`)
  }

  /**获取字典 */
  public getDict(query: { groupCode: string, dictCode: string }) {
    return this.get(`/dictTable/getList/${query.groupCode}/${query.dictCode}`)
  }

  /**获取二级字典 */
  public getDict2(query: { groupCode: string, dictCode: string, templateCode: string }) {
    const { groupCode, dictCode, templateCode } = query
    return this.get(`/dictTable/getList/${groupCode}/${dictCode}/${templateCode}`)
  }

  /**创建某一天记录 */
  public createByDate(recordDate: string, wardCode: string) {
    return this.post('/qcWardCheck/createByDate', { recordDate, wardCode })
  }

  /**获取某天记录创建某一天记录 */
  public getListByDate(recordDate: string, wardCode: string) {
    return this.post('/qcWardCheck/getListByDate', { recordDate, wardCode })
  }

  /**保存或修改 */
  public saveOrUpdateByDate(params: { recordDate: string, wardCode: string, wardCheckList: any[] }) {
    return this.post('/qcWardCheck/saveOrUpdateByDate', params)
  }

  /**获取科室某天值班人员 */
  // public getRangeByDate(recordDate: string, wardCode: string) {
  //   return this.get(`/qcWardCheck/getRangeByDate/${wardCode}/${recordDate}`)
  // }

  /**获取科室班次 */
  public getRangeByDeptCode(deptCode: string) {
    return this.post('/schShiftSetting/getByDeptCode', {
      deptCode,
      status: true
    })
  }
  // /schShiftSetting/getByDeptCode

  /**获取科室某天值班人员 */
  public getNurse(query: any) {
    return this.post('/schShiftSetting/getListByDate', {
      wardCode: query.wardCode,
      startDate: query.reportDate,
      endDate: query.reportDate
    })
  }
}

export const nursingQualityCheckService = new NursingQualityCheckService()