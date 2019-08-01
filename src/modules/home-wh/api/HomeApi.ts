import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
class StatisticsApi extends BaseApiService {
  // 0.床位情况
  public async bedInfo (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/bedInfo`, trancePostData)
  }

  // 1.今日任务
  public async todayTask (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/todayTask`, trancePostData)
  }

  // 9.患者分布
  public async patientdistribute (data: any) {
    // let typeGet
    if (data.type === '按地区') {
      data.type = '1'
    } else if (data.type === '按费别') {
      data.type = '2'
    } else if (data.type === '按性别') {
      data.type = '3'
    }
    let postData = {
      type: data.type, // 分布方式：1=来源，2=费别， 3=性别
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/patientdistribute`, trancePostData)
  }

  // 3.患者情况
  public async patientCondition (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/patientCondition`, trancePostData)
  }

  // 4.执行单情况
  public async executeStatus (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/executeStatus`, trancePostData)
  }

  // // 5.护理人员情况
  // public async nursingUser (data: any) {
  //   const postData = {
  //     wardCode: data.wardCode, // string 必须参数 科室编码
  //     startDate: data.startTime, // string 必须参数 开始时间
  //     endDate: data.endTime // string 必须参数 结束时间
  //   }
  //   return this.post(`/indexInfo/nursingUser`, postData)
  // }
  // 5首页 护理人员情况
  public async indexInfo (exportData: any) {
    if (exportData.item === '按职称') {
      exportData.item = 'title'
    } else if (exportData.item === '按层级') {
      exportData.item = 'job'
    } else if (exportData.item === '按工龄') {
      exportData.item = 'workingYears'
    } else {
    }
    let postData = {
      deptCode: exportData.deptCode,
      item: exportData.item
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/nursingUser`, trancePostData)
  }
  // 6.病区流转情况
  public async wardFlow (data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime, // string 必须参数 结束时间
      type: data.type
    }
    let trancePostData = this.stringify(postData)
    return this.post(`/indexInfo/wardFlow`, trancePostData)
  }
}

export default new StatisticsApi()
