import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import qs from 'qs'
import { appStore } from 'src/stores'
class StatisticsApi extends BaseApiService {
  // 护士排班表
  public async postNurseScheduling(exportData: any = true) {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    // let postData = {
    //   deptCode: Data.deptCode,
    //   startTime: Data.startTime,
    //   endTime: Data.endTime,
    //   status: exportData
    // }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/User`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/User`, trancePostData)
    }
  }
  // 获取按班次自定义的名称
  public async postName() {
    let postData = {
      deptCode: authStore.selectedDeptCode
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/schShiftSetting/getByDeptCode`, trancePostData)
  }
  // 班次大类接口的数据
  public async dictInfo(data: any = { code: 'sch_range_shift_type' }) {
    // let trancePostData = this.stringify(postData)
    let postData = {
      code: data.code
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/dept/dictInfo`, trancePostData)
  }

  // 护士排班统计（按班次）
  public async postNurseByShiftView(showType: any, data: any, exportData: any = true) {
    if (showType === '按班次大类') {
      showType = 'shift_type'
    } else if (showType === '自定义班次') {
      showType = 'range_name'
    }
    let postData = {
      type: showType,
      deptCode: authStore.selectedDeptCode === '全院' ? '' : authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      ls: data,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countUser`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countUser`, trancePostData)
    }
  }
  // 护士白班统计（按月份）  classShow不同
  // 护士夜班统计（按月份）
  // 护士休假统计（按月份）
  public async postNurseByMonth(classShow: string, showType: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = ['whyx'].includes(appStore.HOSPITAL_ID)? '白班' : 'A班'
    } else if (classShow === '夜班') {
      classShow = 'P班'
    } else if (classShow === '休假') {
      classShow = '休假'
    }
    if (showType === '按时数') {
      showType = true
    } else if (showType === '按次数') {
      showType = false
    }

    let postData = {
      shiftType: classShow,
      deptCode: authStore.selectedDeptCode,
      hourOrNum: showType,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countShiftTypeUser`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countShiftTypeUser`, trancePostData)
    }
  }

  // 护士节假日排班表
  public async postNurseHolidaySchedule(exportData: any = true) {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countUserHolidays`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countUserHolidays`, trancePostData)
    }
  }
  // 科室排班统计（按班次）
  public async postDepartmentByShiftView(data: any, statusRadio: string = '1', toExport: any = false, ) {
    let postData = {
      ...data,
      status: !toExport
    }
    let trancePostData = this.stringify(postData)
    if (statusRadio === '1') {
      if (toExport) {
        return this.post(`/scheduling/countByDeptCode`, trancePostData, { responseType: 'blob' })
      } else {
        return this.post(`/scheduling/countByDeptCode`, trancePostData)
      }
    } else {
      if (toExport) {
        return this.post(`/scheduling/countByDeptCodeLc`, trancePostData, { responseType: 'blob' })
      } else {
        return this.post(`/scheduling/countByDeptCodeLc`, trancePostData)
      }
    }
  }
  // 科室白班统计（按月份）
  // 科室夜班统计（按月份）
  // 科室休假统计（按月份）
  public async postDepartmentByMonth(classShow: any, showType: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = ['whyx'].includes(appStore.HOSPITAL_ID) ? '白班' : 'A班'
    } else if (classShow === '夜班') {
      classShow = 'P班'
    } else if (classShow === '休假') {
      classShow = '休假'
    } else {
      return classShow
    }
    if (showType === '按时数') {
      showType = true
    } else if (showType === '按次数') {
      showType = false
    }
    let postData = {
      shiftType: classShow,
      // deptCode: authStore.selectedDeptCode,
      hourOrNum: showType,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countShiftTypeDeptCode`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countShiftTypeDeptCode`, trancePostData)
    }
  }

  // 科室白班统计（按季度）
  // 科室夜班统计（按季度）
  // 科室休假统计（按季度）
  public async postDepartmentByQuarter(classShow: any, showType: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = ['whyx'].includes(appStore.HOSPITAL_ID)? '白班' : 'A班'
    } else if (classShow === '夜班') {
      classShow = 'P班'
    } else if (classShow === '休假') {
      classShow = '休假'
    } else {
      return classShow
    }
    if (showType === '按时数') {
      showType = true
    } else if (showType === '按次数') {
      showType = false
    }
    let postData = {
      shiftType: classShow,
      // deptCode: authStore.selectedDeptCode,
      hourOrNum: showType,
      month: statisticViewModel.startDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countShiftTypeDeptCodeByQuarter`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countShiftTypeDeptCodeByQuarter`, trancePostData)
    }
  }

  // 测试1
  public async postNurseByMonthttt(classShow: string, showType: any, getDeptCode: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = ['whyx'].includes(appStore.HOSPITAL_ID)? '白班' : 'A班'
    } else if (classShow === '夜班') {
      classShow = 'P班'
    } else if (classShow === '休假') {
      classShow = '休假'
    }
    if (showType === '按时数') {
      showType = true
    } else if (showType === '按次数') {
      showType = false
    }

    let postData = {
      shiftType: classShow,
      deptCode: getDeptCode,
      // deptCode: authStore.selectedDeptCode,
      hourOrNum: showType,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/countShiftTypeUser`, trancePostData)
  }
  // 科室节假日排班表
  public async postDepartmentHolidaySchedule(exportData: any = true) {
    let postData = {
      // deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    if (exportData === false) {
      return this.post(`/scheduling/countDeptCodeHolidays`, trancePostData, { responseType: 'blob' })
    } else {
      return this.post(`/scheduling/countDeptCodeHolidays`, trancePostData)
    }
  }
  // 护士节假日排班表
  public async getTotalUser() {
    return this.get(`/total/totalUser`)
  }
  // 护士节假日排班表 -- 聊城
  public async getTotalUserForLC(type: any = 0) {
    return this.post(`/total/totalUserForLC`, { type })
  }
  //// 患者查询统计模块
  // 住院病人认知情况统计表 查询
  public async patientStatistics(exportData: any = true) {
    let cacheStart = exportData.startDate + ` 00:00:00`
    let cacheEnd = exportData.endDate + ` 00:00:00`

    let postData = {
      // startDate: cacheStart,
      // endDate: cacheEnd,
      startDate: '2019-3-13 00:00:00',
      endDate: '2019-3-14 00:00:00',
      deptCode: exportData.deptCode,
      type: exportData.type
    }
    // let trancePostData = this.stringify(postData)
    return this.post(`/patientStatistics/getList`, postData)
  }

  public async patientStatisticsExcel(exportData: any = true) {
    let cacheStart = exportData.startDate + ` 00:00:00`
    let cacheEnd = exportData.endDate + ` 00:00:00`

    let postData = {
      // startDate: cacheStart,
      // endDate: cacheEnd,
      // startDate: '2019-3-13 00:00:00',
      // endDate: '2019-3-14 00:00:00',
      // deptCode: exportData.deptCode,
      // type: exportData.type,
      // status: false

      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: false
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/patientStatistics/exportExcel`, trancePostData, { responseType: 'blob' })
  }

  // 统计学历
  public countEducation(query: any) {
    return this.post('/countInformation/countEducation', query)
  }

  // 统计性别
  public countSex(query: any) {
    return this.post('/countInformation/countSex', query)
  }

  // 统计工作年限
  public countEntryDate(query: any) {
    return this.post('/countInformation/countEntryDate', query)
  }

  // 统计在职状态
  public countStatus(query: any) {
    return this.post('/countInformation/countStatus', query)
  }

  // 护士离职原因统计
  public countLeaveRemark(query: any) {
    return this.post('/countInformation/countLeaveRemark', query)
  }

  /** 护士初始学历分布 */
  public countInitialEducation(query: any) {
    return this.post('/countInformation/countInitialEducation', query)
  }

  /** 统计职称 */
  public countTitle(query: any) {
    return this.post('/countInformation/countTitle', query)
  }

  /** 发热患者统计 */
  public countFeverPatient(query: any) {
    return this.post('/vitalSign/getOutside', query)
  }
  // 未发热患者
  public countNoFeverPatient(query: any) {
    return this.post('/vitalSign/getFeverNo', query)
  }
  // 现有专业技术资格
  // 现有专业技术资格级别
  // 现任专业技术职务
  // 现任专业技术职务级别
  public countProfessional(query: Record<string,any>) {
    return this.post('/countInformation/countProfessional', query)

  }
}

let statisticsApi = new StatisticsApi()

export default statisticsApi

export { statisticsApi }
