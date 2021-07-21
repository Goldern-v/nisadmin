import BaseApiService from 'src/services/api/BaseApiService'

class QcDghlService extends BaseApiService {
  /**
   * QCC.4.01、质控汇总：单个质控单汇总
   * @param params 
   * @returns 
   */
  public individualCountDetail(params: {
    wardCode: string,
    qcCode: string,
    beginDate: string,
    endDate: string,
  }) {
    return this.post('/qcCount/individualCountDetail', params)
  }

  /**
   * 获取质控表单类型列表
   * @param query
   */
  public formTemplateList(query: { level: number, templateName: string }) {
    return this.post(`/qcItem/template/findList`, query)
  }
}

export const qcDghlService = new QcDghlService()