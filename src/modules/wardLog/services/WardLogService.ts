import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
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
    return this.post(`/InpatientAreaLog/info/export`, data)
  }
}

export const wardLogService = new WardLogService()
