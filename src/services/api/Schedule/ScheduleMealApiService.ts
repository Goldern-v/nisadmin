/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-排班班次套餐设置
 * @api: /schMealUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.排班班次套餐设置新增
 * 1.查找班次套餐设置列表
 * 2.查找班次套餐设置列表
 * 3.班次套餐设置删除
 * 4.班次套餐设置新增或更新(JSON传参)
 */

import BaseApiService from '../BaseApiService'

export default class ScheduleMealApiService extends BaseApiService {
  // 0.排班班次套餐设置新增
  public async saveAll (data: any) {
    const postData = {
      schMealSettings: data // 是否勾选 data = [ { id:'' , rangeShow:'' } ]
    }
    return this.post(`/schMealSetting/updateStatus`, postData)
  }
  // 1.查找班次套餐设置列表
  public async getMealListByCode (deptCode: string, status: string) {
    // deptCode - 科室编码
    // status - 启用状态 true或者false
    const postData = {
      deptCode: deptCode
      // status: ''
    }
    return this.post(`/schMealSetting/getByDeptCode`, this.stringify(postData))
  }

  // 1.查找班次套餐设置列表
  public async getMealListByCodeWithStatus (deptCode: string, status: string) {
    // deptCode - 科室编码
    // status - 启用状态 true或者false
    return this.get(`/schMealSetting/getByDeptCode/${deptCode}/${status}`)
  }

  // 2.查找排班人员
  public async getMealListById (id: string) {
    return this.get(`/schMealSetting/getById/${id}`)
  }

  // 3.班次套餐设置删除
  public async delete (id: string) {
    return this.get(`/schMealSetting/delById/${id}`)
  }

  // 4.班次套餐设置新增或更新(JSON传参)
  public async save (data: any) {
    const postData = {
      id: data.id, // 	Long 必须参数 班次套餐id
      name: data.name, // 	Long 必须参数 班次套餐名称
      deptCode: data.deptCode, // string 必须参数 科室编码
      monday: data.monday, // string 必须参数 星期
      tuesday: data.tuesday, // string 必须参数 星期
      wednesday: data.wednesday, // string 必须参数 星期
      thursday: data.thursday, // string 必须参数 星期
      friday: data.friday, // string 必须参数 星期
      saturday: data.saturday, // string 必须参数 星期
      sunday: data.sunday, // string 必须参数 星期
      status: data.status, // Boolean 必须参数 启用状态 true或者false
      mondaySymbol: data.mondaySymbol, 
      tuesdaySymbol: data.tuesdaySymbol, 
      wednesdaySymbol: data.wednesdaySymbol,  
      thursdaySymbol: data.thursdaySymbol, 
      fridaySymbol: data.fridaySymbol,  
      saturdaySymbol: data.saturdaySymbol,  
      sundaySymbol: data.sundaySymbol, 
    }
    return this.post(`/schMealSetting/saveOrUpdate`, postData)
  }
  // 5.武汉班次查询是否责护
  public async check (id: string) {
    return this.get(`/schShiftSetting/check/${id}`)
  }
  // 6.武汉班次套餐查询是否责护
  public async checkMeal (id: string) {
    return this.get(`/schShiftSetting/checkMeal/${id}`)
  }
}
