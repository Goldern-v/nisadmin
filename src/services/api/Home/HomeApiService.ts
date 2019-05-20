/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理质量管理首页
 * @api: /indexInfo/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.床位情况
 * 1.今日任务
 * 2.患者分布
 * 3.患者情况
 * 4.执行单情况
 * 5.护理人员情况
 * 6.病区流转情况
 */

import BaseApiService from '../BaseApiService'

export default class HomeApiServices extends BaseApiService {
  // 0.床位情况
  public async bedInfo (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/bedInfo`, postData)
  }

  // 1.今日任务
  public async todayTask (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/todayTask`, postData)
  }

  // 2.患者分布
  public async patientdistribute (data: any) {
    const postData = {
      type: data.type, // 分布方式：1=来源，2=费别， 3=性别
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/patientdistribute`, postData)
  }

  // 3.患者情况
  public async patientCondition (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/patientCondition`, postData)
  }

  // 4.执行单情况
  public async executeStatus (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/executeStatus`, postData)
  }

  // 5.护理人员情况
  public async nursingUser (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/nursingUser`, postData)
  }

  // 6.病区流转情况
  public async wardFlow (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime // string 必须参数 结束时间
    }
    return this.post(`/indexInfo/wardFlow`, postData)
  }
}

// const postData = {
//   deptCode: data.deptCode, // string 必须参数 科室编码
//   shiftType: data.shiftType, // string 必须参数 所属类别
//   startTime: data.startTime, // string 必须参数 开始时间
//   endTime: data.endTime, // string 必须参数 结束时间
//   effectiveTime: data.effectiveTime, // string 必须参数 标准工时
//   nameColor: data.nameColor, // string 必须参数 班次颜色
//   status: data.status // Boolean 必须参数 启用状态 true或者false
// }
