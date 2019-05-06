import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
class StatisticsApi extends BaseApiService {
  // 护士排班表
  public async postNurseScheduling (exportData: any = '') {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/export`, trancePostData)
  }
  // 获取按班次自定义的名称
  public async postName () {
    let postData = {
      deptCode: authStore.selectedDeptCode
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/schShiftSetting/getByDeptCode`, trancePostData)
  }
  // 护士排班统计（按班次）
  public async postNurseByShiftView (showType: any, data: any) {
    if (showType === '按班次大类') {
      showType = 'shift_type'
    } else if (showType === '自定义班次') {
      showType = 'name'
    }
    let postData = {
      type: showType,
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      ls: data
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/countUser`, trancePostData)
  }
  // 护士白班统计（按月份）  classShow不同
  // 护士夜班统计（按月份）
  // 护士休假统计（按月份）
  public async postNurseByMonth (classShow: string, showType: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = 'A班'
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
    return this.post(`/scheduling/countShiftTypeUser`, trancePostData)
  }

  // 护士节假日排班表
  public async postNurseHolidaySchedule (exportData: any = true) {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/countUserHolidays`, trancePostData)
  }
  // 科室排班统计（按班次）
  public async postDepartmentByShiftView (showType: string, data: any) {
    if (showType === '按班次大类') {
      showType = 'shift_type'
    } else if (showType === '自定义班次') {
      showType = 'name'
    }
    let postData = {
      type: showType,
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      ls: data
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/countByDeptCode`, trancePostData)
  }
  // 科室白班统计（按月份）
  // 科室夜班统计（按月份）
  // 科室休假统计（按月份）
  public async postDepartmentByMonth (classShow: any, showType: any, exportData: any = true) {
    if (classShow === '白班') {
      classShow = 'A班'
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
    return this.post(`/scheduling/countShiftTypeUser`, trancePostData)
  }

  // 科室节假日排班表
  public async postDepartmentHolidaySchedule (exportData: any = true) {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      status: exportData
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/scheduling/countDeptCodeHolidays`, trancePostData)
  }
}

export default new StatisticsApi()
