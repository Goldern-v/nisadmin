/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-共用接口
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.获取护理单元列表
 */

import BaseApiService from './BaseApiService'

export default class CommonApiService extends BaseApiService {
  // 0.获取护理单元列表
  public async getUintList () {
    return this.get(`/user/nursingUnit`)
  }
  public async uploadFile (obj: any) {
    const trancePostData = new FormData()
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        trancePostData.append(key, obj[key])
      }
    }
    return this.post(`/file/uploadNurse`, trancePostData)
  }
}
