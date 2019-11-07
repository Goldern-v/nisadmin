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
}

export const wardLogService = new WardLogService()
