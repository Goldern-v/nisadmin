import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class AMServices extends BaseApiService {
  /** 审核列表 */
  public auditeStatusNurse (status: string, pageIndex: number) {
    let obj = {
      status,
      deptCode: authStore.selectedDeptCode,
      // empNo: authStore.user && authStore!.user!.empNo,
      pageIndex,
      pageSize: 10
    }
    return this.post(`/auditeNurseFileIndex/findListAuditePC`, this.stringify(obj))
  }
}

export const aMServices = new AMServices()
