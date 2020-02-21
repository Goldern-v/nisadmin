import { PageOptions } from 'src/components/BaseTable'
import BaseApiService from 'src/services/api/BaseApiService'


export default class InfectedAreasCountService extends BaseApiService {
  /** 汇总列表 */
  public getCount(query?: any) {
    return this.post('/personInfoRegister/getCountList', query)
  }

  /** 详情列表 */
  public getDetail(query?: any) {
    return this.post('/personInfoRegister/getPageForDetail', query)
  }

  /** 详情表导出 */
  public detailExport(query?: any) {
    return this.post('/personInfoRegister/getPageForDetail/export', {}, { responseType: 'blob' })
  }

  /** 汇总表导出 */
  public countExport(query?: any) {
    return this.post('/personInfoRegister/getCountList/export', {}, { responseType: 'blob' })
  }

  /** 获取医疗队列表 */
  public getCompanyList(query?: any) {
    return this.get('/personInfoRegister/companyDict')
  }
}

export const infectedAreasCountService = new InfectedAreasCountService()