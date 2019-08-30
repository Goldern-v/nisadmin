import { authStore } from 'src/stores'
import BaseApiService from 'src/services/api/BaseApiService'
import { sheetViewModal } from '../viewModal/SheetViewModal'
import { selectViewModal } from '../viewModal/SelectViewModal'
export default class ArrangeService extends BaseApiService {
  /** 获取排班信息 */
  public findCreateOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.startTime,
      endTime: selectViewModal.endTime,
      deptCode: authStore.selectedDeptCode
    }
    return this.post(`/scheduling/findCreateOrUpdate`, obj)
  }
  /** 保存排班信息 */
  public saveOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.startTime,
      endTime: selectViewModal.endTime,
      setting: sheetViewModal.sheetTableData,
      deptCode: authStore.selectedDeptCode
    }
    return this.post(`/scheduling/saveOrUpdate`, obj)
  }
  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: authStore.selectedDeptCode
    }
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj))
  }
  /** 获取排班班次套餐 */
  public getArrangeMeal(obj?: any) {
    obj = {
      deptCode: authStore.selectedDeptCode
    }
    return this.post(`schMealSetting/getByDeptCode`, this.stringify(obj))
  }
  /** 获取符号列表 */
  public getSchSymbol(obj?: any) {
    obj = {
      // deptCode: authStore.selectedDeptCode
    }
    return this.post(`/schSymbol/listByDeptCode`, obj)
  }
}

export const arrangeService = new ArrangeService()
