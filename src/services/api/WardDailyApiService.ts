/**
 * @date: 2019-03-25
 * @author: laiweijun
 * @name: 护理管理系统-护理单元日报
 * @api: /wardDaily/
 * @description:
 * 接口包含以下内容:
 * 1.根据护理单元获取科室编码和名称
 */

import BaseApiService from './BaseApiService'

export default class WardDailyApiService extends BaseApiService {
  // 1.根据护理单元获取科室编码和名称
  public getDeptWithWardcode (deptCode: string) {
    return this.post(`/wardDaily/getDeptWithWardcode/${deptCode}`)
  }
}
