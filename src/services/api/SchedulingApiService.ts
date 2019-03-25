/**
 * @date: 2019-03-25
 * @author: laiweijun
 * @name: 护理管理系统-排班接口
 * @api: /schduling/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 1.新建排班
 * 2.对排班信息进行每周的新增或修改
 * 3.复制上周排班（json传参）
 * 4.导出护士排班
 * 5.护士按月份和排班类型统计（按时数）(按天数)
 * 6.护士排班统计（按班次）（非json传参）
 * 7.按护士节假日排班表
 * 8.按科室节假日排班表
 * 9.查找排班列表(和编辑时查找)（json传参）
 * 10.查询排班得时间列表
 * 11.科室按月份和排班类型统计（按时数）(按天数)
 * 12.科室排班统计（按班次）（非json传参）
 */

import BaseApiService from './BaseApiService'

export default class SchedulingApiService extends BaseApiService {
  // 1.新建排班
  public newSchedul (data: any) {
    const postData = {
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间
      endTime: data.endTime // endTime   结束时间
    }
    return this.post(`/schduling/findSaveOrUpdateTemplate`, postData)
  }

  // 2.对排班信息进行每周的新增或修改
  public update (data: any) {
    const postData = {
      userId: data.userId, // userId  护士ID
      workDate: data.workDate, // workDate 时间
      rangeId: data.rangeId, // rangeId   班次Id
      status: data.status, // status   0代表暂存，1代表发布
      thisWeekHour: data.thisWeekHour, // thisWeekHour   本周工时
      rangeName: data.rangeName, // rangeName   班次名字，这名字可修改得
      remark: data.remark // remark   备注
    }
    return this.post(`/schduling/saveOrUpdate`, postData)
  }

  // 3.复制上周排班（json传参）
  public copy (data: any) {
    const postData = {
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（直接传当前得时间就行）
      endTime: data.endTime // endTime   结束时间（直接传当前得时间就行）
    }
    return this.post(`/schduling/copyPrevSetting`, postData)
  }

  // 4.导出护士排班
  public export (data: any) {
    const postData = {
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/export`, postData)
  }

  // 5.护士按月份和排班类型统计（按时数）(按天数)
  public nurseStatisticWithDateByShiftType (data: any) {
    const postData = {
      shiftType: data.shiftType, // 排班类型
      hourOrNum: data.hourOrNum, // 是否按照工时
      status: data.status, // 是否导出 true\false
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/countShiftTypeUser`, postData)
  }

  // 6.护士排班统计（按班次）（非json传参）
  public nurseStatisticByDeptCode (data: any) {
    const postData = {
      ls: data.ls, // A班,P班,N班,休假,进修学习,其他
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/countUser`, this.stringify(postData))
  }

  // 7.按护士节假日排班表
  public nurseStatisticByHolidays (data: any) {
    const postData = {
      status: data.status, // 是否导出 true\false
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/countUserHolidays`, postData)
  }
  // 8.按科室节假日排班表
  public deptStatisticByHolidays (data: any) {
    const postData = {
      status: data.status, // 是否导出 true\false
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/CountDeptCodeHolidays`, postData)
  }
  // 9.查找排班列表(和编辑时查找)（json传参）
  public findShiftList (data: any) {
    const postData = {
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/findBylist`, postData)
  }
  // 10.查询排班得时间列表
  public findTimeList (data: any) {
    const postData = {
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/findByTime`, postData)
  }

  // 11.科室按月份和排班类型统计（按时数）(按天数)
  public deptStatisticWithDateByShiftType (data: any) {
    const postData = {
      shiftType: data.shiftType, // 排班类型
      hourOrNum: data.hourOrNum, // 是否按照工时
      status: data.status, // 是否导出 true\false
      deptCode: data.deptCode, // deptCode  科室编码
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/countShiftTypeDeptCode`, postData)
  }

  // 12.科室排班统计（按班次）（非json传参）
  public deptStatisticByDeptCode (data: any) {
    const postData = {
      ls: data.ls, // A班,P班,N班,休假,进修学习,其他
      stratTime: data.stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: data.endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    return this.post(`/schduling/countByDeptCode`, this.stringify(postData))
  }
}
