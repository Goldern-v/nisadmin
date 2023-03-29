/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-排班人员设置
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 1.排班人员设置新增
 * 2.查找排班人员
 */

import BaseApiService from '../BaseApiService'

export default class ScheduleUserApiService extends BaseApiService {
  // 1.排班人员设置新增
  public async save(data: any) {
    const postData = {
      userList: data // 是否勾选 data = [ { id:'' , rangeShow:'' } ]
    }
    return this.post(`/schShiftUser/save`, postData)
  }

  // 2.查找排班人员
  public async getByDeptCode(deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }

  // 排班人员新增或者修改
  public async saveOrUpdate(obj: any) {
    return this.post(`/schShiftUser/saveOrUpdate`, obj)
  }
  // 排班人员删除
  public async delete(id: any) {
    return this.get(`/schShiftUser/delete/${id}`)
  }
  // 脱教设置
  public async setResignation(data: any) {
    return this.post(`schShiftUser/setResignation`,data)
  }
  //获取导师列表
  public async getTotur(code: string) {
    return this.get(`/dept/users/${code}`)
  }
  //设置导师
  public async setTotur(data: any) {
    return this.post('/schShiftUser/setTutor',data)
  }
  //同步排班人员
  public async findSyncNurse(data: any) {
    return this.post('/scheduling/findSyncNurse', data)
  }
}
