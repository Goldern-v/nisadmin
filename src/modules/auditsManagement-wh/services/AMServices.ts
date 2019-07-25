import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class AMServices extends BaseApiService {
  /** 待审核列表 */
  public pendingPage(current?: number, pageSize?: number, showType?: string, keyword?: string) {
    let obj = {
      pageIndex: current || 0,
      pageSize: pageSize || 10,
      type: showType,
      keyword,
      wardCode: authStore.selectedDeptCode
    }
    return this.post(`/flow/task/pendingPage`, obj)
  }
  /** 已审核列表 */
  public solvedPage(current?: number, pageSize?: number, showType?: string, keyword?: string) {
    let obj = {
      pageIndex: current || 0,
      pageSize: pageSize || 10,
      type: showType,
      keyword,
      wardCode: authStore.selectedDeptCode
    }
    return this.post(`/flow/task/solvedPage`, obj)
  }

  /** 按照人员批量审核 */
  public auditeList(obj: any) {
    return this.post(`/auditeNurseFileIndexWH/findNurseFileAudited`, obj)
  }
  /** 批量审核质控表 */
  public batchHandleNode(obj: any) {
    return this.post(`/qcItem/instance/batchHandleNode`, obj)
  }
}

export const aMServices = new AMServices()
