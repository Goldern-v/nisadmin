/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-排班班次设置
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.排班班次设置新增
 * 1.查找班次设置列表
 * 2.查找班次设置列表
 * 3.班次设置删除
 * 4.班次设置新增或更新(JSON传参)
 */

import BaseApiService from '../BaseApiService'

export default class ScheduleShiftApiService extends BaseApiService {
  // 0.排班班次设置新增
  public async saveAll (data: any) {
    const postData = {
      ranges: data // 是否勾选 data = [ { id:'' , rangeShow:'' } ]
    }
    return this.post(`/schShiftSetting/updateStatus`, postData)
  }
  // 1.查找班次设置列表
  public async getShiftListByCode (deptCode: string, status: string) {
    // deptCode - 科室编码
    // status - 启用状态 true或者false
    const postData = {
      deptCode: deptCode
      // status: ''
    }
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(postData))
  }

  // 1.查找班次设置列表
  public async getShiftListByCodeWithStatus (deptCode: string, status: string) {
    // deptCode - 科室编码
    // status - 启用状态 true或者false
    return this.get(`/schShiftSetting/getByDeptCode/${deptCode}/${status}`)
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
      id: data.id, // 	Long 必须参数 班次名称
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
