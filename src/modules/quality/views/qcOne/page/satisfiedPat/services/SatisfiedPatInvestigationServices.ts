import BaseApiService from "src/services/api/BaseApiService";
import { fileDownload } from "src/utils/file/file";


class SatisfiedPatInvestigationServices extends BaseApiService {
  /**
   * 获取满意度调查列表
   * @param year 年份
   * @param month 月份
   * @param wardCode 科室
   */
  public satisfiedPatList(params: {
    year: string,
    month: string,
    wardCode: string,
  }) {
    return this.post('/satisfiedPat/getList', params)
  }

  /**
   * 获取满意度调查详情
   * @param id 满意度调查表id
   */
  public satisfiedPatDetail(id: string | number) {
    return this.get(`/satisfiedPat/detail/${id}`)
  }

  /**
   * 满意度调查列表保存或更新
   * @param satisfiedPat 基本信息
   * @param satisfiedPatDetail 调查人员列表
   */
  public satisfiedPatSaveOrUpdate(params: {
    satisfiedPat: any,
    satisfiedPatDetail: any[]
  }) {
    return this.post('/satisfiedPat/saveOrUpdate', params)
  }

  /**
   * 删除满意度调查
   * @param id 满意度调查表id
   */
  public satisfiedPatDelete(id: string) {
    return this.get(`/satisfiedPat/delete/${id}`)
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
    return this.post('/satisfiedPat/exportInstance', params, {
      responseType: 'blob'
    })
      .then(res => fileDownload(res))
  }

  /**
   * 满意度调查详情导出
   * @param id 满意度调查表id
   */
  public exportDetail(id: string | number) {
    return this.get(`/satisfiedPat/exportDetail/${id}`, {
      responseType: 'blob'
    })
      .then(res => fileDownload(res))
  }

  /**
   * 保存填写的调查表内容
   * @param params.detailId 人员对应的id
   * @param content 表单内容
   * @param score 分数
   */
  public submitForm(params: {
    detailId: number | string,
    content: string,
    score: number,
  }) {
    return this.post('/satisfiedPat/submitForm', params)
  }
}

export const satisfiedPatInvestigationServices = new SatisfiedPatInvestigationServices()