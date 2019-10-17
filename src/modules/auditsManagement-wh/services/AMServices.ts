import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'

export default class AMServices extends BaseApiService {
  /** 待审核列表 */
  public pendingPage(current?: number, pageSize?: number, showType?: string, keyword?: string) {
    let deptCodes
    if (statisticsViewModal.selectedDeptCode.length == 1 && statisticsViewModal.selectedDeptCode[0] == '全部') {
      deptCodes = statisticsViewModal
        .getDict('全部科室')
        .map((item: any) => item.code)
        .filter((item: any) => item != '全部')
    } else {
      deptCodes = statisticsViewModal.selectedDeptCode
    }

    let obj = {
      pageIndex: current || 0,
      pageSize: pageSize || 10,
      type: showType,
      keyword,
      // wardCode: authStore.selectedDeptCode,
      deptCodes: deptCodes
    }
    return this.post(`/flow/task/pendingPage`, obj)
  }
  /** 已审核列表 */
  public solvedPage(current?: number, pageSize?: number, showType?: string, keyword?: string, selectedDate?: any) {
    let deptCodes
    if (statisticsViewModal.selectedDeptCode.length == 1 && statisticsViewModal.selectedDeptCode[0] == '全部') {
      deptCodes = statisticsViewModal
        .getDict('全部科室')
        .map((item: any) => item.code)
        .filter((item: any) => item != '全部')
    } else {
      deptCodes = statisticsViewModal.selectedDeptCode
    }

    let obj: any = {
      pageIndex: current || 0,
      pageSize: pageSize || 10,
      type: showType,
      keyword,
      // wardCode: authStore.selectedDeptCode,
      deptCodes: deptCodes
    }
    if (selectedDate) {
      obj.startDate = selectedDate[0] ? selectedDate[0].format('YYYY-MM-DD') : ''
      obj.endDate = selectedDate[1] ? selectedDate[1].format('YYYY-MM-DD') : ''
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
