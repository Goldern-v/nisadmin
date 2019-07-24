import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class AMServices extends BaseApiService {
  /** 待审核列表 */
  public pendingPage(current?: number, pageSize?: number) {
    let obj = {
      pageIndex: current || 0,
      pageSize: pageSize || 10
    }
    return this.post(`/flow/task/pendingPage`, obj)
  }
  /** 已审核列表 */
  public solvedPage(current?: number, pageSize?: number) {
    let obj = {
      pageIndex: current || 0,
      pageSize: pageSize || 10
    }
    return this.post(`/flow/task/solvedPage`, obj)
  }
}

export const aMServices = new AMServices()
