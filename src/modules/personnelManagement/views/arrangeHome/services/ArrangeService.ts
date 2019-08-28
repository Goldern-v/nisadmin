import { authStore } from 'src/stores'
import BaseApiService from 'src/services/api/BaseApiService'
export default class ArrangeService extends BaseApiService {
  /** 获取排班信息 */
  public findCreateOrUpdate(obj?: any) {
    obj = {
      startTime: '2019-07-22',
      endTime: '2019-08-22',
      deptCode: authStore.selectedDeptCode
    }
    return this.post(`/scheduling/findCreateOrUpdate`, obj)
  }
}

export const arrangeService = new ArrangeService()
