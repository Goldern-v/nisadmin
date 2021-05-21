import BaseApiService from "src/services/api/BaseApiService";
import { fileDownload } from "src/utils/file/file";


class SatisfyInvestigationServices extends BaseApiService {
  /**
   * 获取满意度调查列表
   * @param year 年份
   * @param month 月份
   * @param wardCode 科室
   */
  public satisfiedInstanceList(params: {
    year: string,
    month: string,
    wardCode: string,
  }) {
    return this.post('/satisfiedInstance/getList', params)
  }

  /**
   * 获取满意度调查详情
   * @param id 满意度调查表id
   */
  public satisfiedInstanceDetail(id: string | number) {
    return this.get(`/satisfiedInstance/detail/${id}`)
  }

  /**
   * 满意度调查列表保存或更新
   * @param satisfiedInstance 基本信息
   * @param satisfiedDetail 调查人员列表
   */
  public satisfiedInstanceSaveOrUpdate(params: {
    satisfiedInstance: any,
    satisfiedDetail: any[]
  }) {
    return this.post('/satisfiedInstance/saveOrUpdate', params)
  }

  /**
   * 删除满意度调查
   * @param id 满意度调查表id
   */
  public satisfiedInstanceDelete(id: string) {
    return this.get(`/satisfiedInstance/delete/${id}`)
  }

  /**
   * 满意度调查列表导出
   * @param year 年份
   * @param month 月份
   * @param wardCode 科室
   */
  public exportInstance(params: {
    year: string,
    month: string,
    wardCode: string,
  }) {
    return this.post('/satisfiedInstance/exportInstance', params, {
      responseType: 'blob'
    })
      .then(res => fileDownload(res))
  }

  /**
   * 满意度调查详情导出
   * @param id 满意度调查表id
   */
  public exportDetail(id: string | number) {
    return this.get(`/satisfiedInstance/exportDetail/${id}`, {
      responseType: 'blob'
    })
      .then(res => fileDownload(res))
  }
}

export const satisfyInvestigationServices = new SatisfyInvestigationServices()