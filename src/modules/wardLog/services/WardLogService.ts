import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
export default class WardLogService extends BaseApiService {
  public inpatientAreaLogSelectLog(obj: PageOptions | any) {
    return this.post(`/InpatientAreaLog/selectLog`, obj)
  }
}

export const wardLogService = new WardLogService()
