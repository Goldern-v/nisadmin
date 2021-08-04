import BaseApiService from "src/services/api/BaseApiService";
import { fileDownload } from "src/utils/file/file";

export default class NightChargingReportJmfyService extends BaseApiService {
  /**删除 */
  public delete(id: string | number) {
    return this.get(`/schNightTotalModel/delete/${id}`);
  }

  /**查询一值夜班详情 */
  public getListOne(query: {
    id: string | number,
    deptCode: string,
    startDate: string,
    endDate: string
  }) {
    return this.post('/schNightTotalContentJm/getListOne', query)
  }

  /**保存一直夜班 */
  public saveListOne(params: {
    schNightTotalModel: any,
    list1: any,
    list2: any,
  }) {
    return this.post('/schNightTotalContentJm/saveOrUpdateOne', params)
  }

  /**导出一值夜班费 */
  public excelListOne(params: {
    schNightTotalModel: any,
    list1: any,
    list2: any,
  }) {
    return this.post('/schNightTotalContentJm/excelOne', params, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }

  /**查询突然回院 */
  public getListTwo(query: {
    id: string | number,
    deptCode: string,
    startDate: string,
    endDate: string
  }) {
    return this.post('/schNightTotalContentJm/getListTwo', query)
  }

  /**保存突然回院 */
  public saveListTwo(params: {
    schNightTotalModel: any,
    list1: any,
    list2: any,
  }) {
    return this.post('/schNightTotalContentJm/saveOrUpdateTwo', params)
  }

  /**导出突发回院详情 */
  public excelListTwo(params: {
    schNightTotalModel: any,
    list1: any,
    list2: any,
  }) {
    return this.post('/schNightTotalContentJm/excelTwo', params, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }
}

export const nightChargingReportJmfyService = new NightChargingReportJmfyService()

