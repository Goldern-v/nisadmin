/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-排班人员设置
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 1.排班人员设置新增（非json传参）
 * 2.查找排班人员
 */

import BaseApiService from './BaseApiService'

export default class ScheduleUserApiService extends BaseApiService {
  // 1.排班人员设置新增（非json传参）
  public async save (data: any) {
    const postData = {
      userList: data // 是否勾选 data = [ { id:'' , rangeShow:'' } ]
    }
    return this.post(`/schShiftUser/save`, postData)
  }

  // 2.查找排班人员
  public async getByDeptCode (deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }
}
