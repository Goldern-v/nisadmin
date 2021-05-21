import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import { fileDownload } from 'src/utils/file/file'
export default class WardLogService extends BaseApiService {
  public findLog(obj: PageOptions | any) {
    return this.post(`/InpatientAreaLog/findLog`, obj)
  }
  public findTemplates() {
    return this.get(`/InpatientAreaLog/findTemplates`)
  }
  /** 获取详情 */
  public getDetail(instanceId: string) {
    return this.get(`/InpatientAreaLog/getDetail/${instanceId}`)
  }
  /** 新建记录时获取模板详情 */
  public templateDetail(templateId: string) {
    return this.post(`/InpatientAreaLog/addRecord`, { templateId })
  }
  /** 添加或修改病区记录 */
  public saveRecord(params: any) {
    return this.post(`/InpatientAreaLog/send/saveRecord`, params)
  }
  /** 删除病区记录 */
  public deleteRecord(instanceId: any) {
    return this.get(`/InpatientAreaLog/deleteRecord/${instanceId}`)
  }
  /** 导出详情excel */
  public exportDetail(data: any) {
    return this.post(`/InpatientAreaLog/info/export`, data, { responseType: 'blob' })
  }


  /** 根据查询条件导出列表页excel */
  public allExcel(params: any) {
    return this.post(`/InpatientAreaLog/allExcel`, params, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }

  /** 导出详情excel */
  public exportDetailList(data: any) {
    return this.post(`/InpatientAreaLog/countExcel`, data, { responseType: 'blob' })
  }
}

export const wardLogService = new WardLogService()
