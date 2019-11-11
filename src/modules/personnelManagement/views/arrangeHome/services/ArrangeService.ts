import { authStore } from 'src/stores'
import BaseApiService from 'src/services/api/BaseApiService'
import { sheetViewModal } from '../viewModal/SheetViewModal'
import { selectViewModal } from '../viewModal/SelectViewModal'
import moment from 'moment'
import { PageObj } from 'src/modules/nurseFiles/view/statistics/config/getPageObj'
export default class ArrangeService extends BaseApiService {
  /** 获取排班信息 */
  public findCreateOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format('YYYY-MM-DD'),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format('YYYY-MM-DD')
    }
    return this.post(`/scheduling/findCreateOrUpdate`, obj)
  }
  /** 保存排班信息 */
  public saveOrUpdate(status: '0' | '1' | undefined) {
    let obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      setting: sheetViewModal.sheetTableData.map((item: any, index: number) => ({ ...item, status, sortValue: index })),
      remark: sheetViewModal.remark,
      deptCode: selectViewModal.params.deptCode,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format('YYYY-MM-DD'),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format('YYYY-MM-DD')
    }
    return this.post(`/scheduling/saveOrUpdate`, obj)
  }
  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode,
      status: true
    }
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj))
  }
  /** 获取排班班次套餐 */
  public getArrangeMeal(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode,
      status: true
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
    return this.post(`/schExpect/getByDeptCodeAndDatePC`, obj)
  }

  //复制排班
  public copyPrevSettingRange(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      ids: sheetViewModal.sheetTableData.map((item: any) => item.id),
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format('YYYY-MM-DD'),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format('YYYY-MM-DD'),
      deptCode: selectViewModal.params.deptCode
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
      status: '1'
    }
    return this.post(`/scheduling/saveOrUpdate`, obj)
  }
  //同步排班人员
  public findSysnNurse() {
    const postData = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format('YYYY-MM-DD'),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format('YYYY-MM-DD')
    }
    return this.post(`/scheduling/findSysnNurse`, postData)
  }

  //加减班查询
  public findBylist(obj: PageObj) {
    return this.post(`/schAddOrSub/findBylist`, obj)
  }

  //假期查询
  public schHolidaysWHFindBylist(obj: PageObj) {
    return this.post(`/schHolidaysWH/findBylist`, obj)
  }
  //假期新增
  public schHolidaysWHSaveOrUpdate(obj: any) {
    return this.post(`/schHolidaysWH/saveOrUpdate`, obj)
  }
  //假期删除
  public schHolidaysWHDelete(id: any) {
    return this.get(`/schHolidaysWH/delete/${id}`)
  }

  //新增保存班次
  public schShiftSettingSaveOrUpdate(obj: any) {
    return this.post(`/schShiftSetting/saveOrUpdate`, obj)
  }

  //结余数据列表
  public schHourInstanceGetByDeptCode(deptCode: any) {
    return this.get(`/schHourInstance/getByDeptCode/${deptCode}`)
  }
  //结余数据列表保存
  public schHourInstanceSaveOrUpdate(lists: any) {
    return this.post(`/schHourInstance/saveOrUpdate`, { lists })
  }

  //结余数据列表 新
  public schBalanceHourGetList(obj: PageObj) {
    return this.post(`/schBalanceHour/getList`, obj)
  }

  //新增编辑结余数据 新
  public schBalanceHourSaveOrUpdate(obj: any) {
    return this.post(`/schBalanceHour/saveOrUpdate`, obj)
  }
  //删除结余数据 新
  public schBalanceHourDelete(id: any) {
    return this.get(`/schBalanceHour/delete/${id}`)
  }
}

export const arrangeService = new ArrangeService()
