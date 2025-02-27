import BaseApiService from '../BaseApiService'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

export default class StatisticApiServices extends BaseApiService {
  // 护士排班统计（按班次）

  public async postNurseByShiftView (data: any) {
    let postData = {
      deptCode: statisticViewModel.deptCode,
      startTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
      ls: data.ls
    }
    return this.post(`/scheduling/countUser`, postData)
  }

  // 2.查找排班人员
  public async getShiftListById (id: string) {
    return this.get(`/schShiftSetting/getById/${id}`)
  }

  // 3.班次设置删除
  public async delete (id: string) {
    return this.get(`/schShiftSetting/delById/${id}`)
  }

  // 4.班次设置新增或更新(JSON传参)
  public async save (data: any) {
    const postData = {
      name: data.name, // 	Long 必须参数 班次名称
      deptCode: data.deptCode, // string 必须参数 科室编码
      shiftType: data.shiftType, // string 必须参数 所属类别
      startTime: data.startTime, // string 必须参数 开始时间
      endTime: data.endTime, // string 必须参数 结束时间
      effectiveTime: data.effectiveTime, // string 必须参数 标准工时
      nameColor: data.nameColor, // string 必须参数 班次颜色
      status: data.status // Boolean 必须参数 启用状态 true或者false
    }
    return this.post(`/schShiftSetting/saveOrUpdate`, postData)
  }
}
