import { authStore } from 'src/stores'
import BaseApiService from 'src/services/api/BaseApiService'
import { sheetViewModal } from '../viewModal/SheetViewModal'
import { selectViewModal } from '../viewModal/SelectViewModal'
export default class ArrangeService extends BaseApiService {
  /** 获取排班信息 */
  public findCreateOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group
    }
    return this.post(`/scheduling/findCreateOrUpdate`, obj)
  }
  /** 保存排班信息 */
  public saveOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      setting: sheetViewModal.sheetTableData,
      remark: sheetViewModal.remark,
      deptCode: selectViewModal.params.deptCode
    }
    return this.post(`/scheduling/saveOrUpdate`, obj)
  }
  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode
    }
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj))
  }
  /** 获取排班班次套餐 */
  public getArrangeMeal(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode
    }
    return this.post(`schMealSetting/getByDeptCode`, this.stringify(obj))
  }
  /** 获取符号列表 */
  public getSchSymbol(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode
    }
    return this.post(`/schSymbol/listByDeptCode`, obj)
  }
  // 按科室查找人员分组列表
  public getByDeptCode(obj: any) {
    obj = {
      deptCode: obj.deptCode // number
    }
    return this.get(`/schSettingNurseGroup/getByDeptCode/${obj.deptCode}`)
  }
  // 导出护士排班
  public async export(data: any) {
    const postData = {
      deptCode: selectViewModal.params.deptCode, // deptCode  科室编码
      startTime: selectViewModal.params.startTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: selectViewModal.params.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/scheduling/export`, postData, { responseType: 'blob' })
  }

  // 获取期望排班
  public getByDeptCodeAndDate(obj?: any) {
    obj = {
      startDate: selectViewModal.params.startTime,
      endDate: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode
    }
    return this.post(`/schExpect/getByDeptCodeAndDate`, obj)
  }

  //复制排班
  public copyPrevSettingRange(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      ids: sheetViewModal.sheetTableData.map((item: any) => item.id)
    }
    return this.post(`/scheduling/copyPrevSettingRange`, obj)
  }

  //推送排班
  public push(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      setting: sheetViewModal.sheetTableData,
      remark: sheetViewModal.remark,
      deptCode: selectViewModal.params.deptCode,
      status: "1"
    }
    return this.post(`/scheduling/saveOrUpdate`, obj)
  }
  
}

export const arrangeService = new ArrangeService()
