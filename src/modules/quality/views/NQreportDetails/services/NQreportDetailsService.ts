import { param } from 'jquery';
import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
export default class BadEventReportService extends BaseApiService {
  /* 保存接口 */
  public saveReport(params:any){
    return this.post(`/qcReport925/saveQcReport`,params);
  }

  /* 删除报告  */
  public deleteReport(id: any) {
    let params = {
      reportId: id
    }
    return this.post(`/qcReport925/deleteQcReport`, params)
  }

  /** 获取报告 */
  public getReport(params: any) {
    return this.post('/qcReport925/getQcReportDetail', params)
  }

  /** 获取 护理质量管理存在的主要问题*/
  public getQcProblemList(params: any) {
    return this.get(`/qcReport925/getQcProblemList?${qs.stringify(params)}`,)
  }
  /** 获取 删除附件*/
  public getFilesDelete(id: any) {
    return this.get(`/qcReport925/delete/${id}`,)
  }
  /** 保存 报告*/
  public saveQcReport(params: any) {
    return this.post(`/qcReport925/saveQcReport`,params)
  }

  /** 保存 报告*/
  public getQcReport(id: any) {
    return this.get(`/qcReport925/getQcReport/${id}`)
  }

}

export const badEventReportService = new BadEventReportService()
