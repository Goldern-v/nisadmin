import BaseApiService from "src/services/api/BaseApiService"
import moment from 'moment'
import { appStore } from "src/stores";
class Api extends BaseApiService {
  // 获取列表
  getList(data: any) {
    const params = {
      ...data,
      beginDate: data.beginDate ? moment(data.beginDate).format('YYYY-MM-DD HH:mm') : '',
      endDate: data.endDate ? moment(data.endDate).format('YYYY-MM-DD HH:mm') : '',
    }
    return this.post(`/administrativeSearchRoom/getPage`, params)
  }

  // 获取详情
  getItem(id: string) {
    return this.get(`/administrativeSearchRoom/get/${id}`)
  }

  // 新增
  saveItem(params: Object) {
    return this.post(`/administrativeSearchRoom/save0rUpdate`, params)
  }

  // 审核
  auditItem(params: Object) {
    return this.post(`/form/searchRoom/master/handleNode`, params)
  }

  // 删除
  deleteitem(id: string) {
    return this.get(`/administrativeSearchRoom/delete/${id}`)
  }

  // 撤销
  cancelCommit(params: Object) {
    return this.post(`/form/searchRoom/master/cancelCommit`, params)
  }

  // 查询我创建的表格
  getPageByCreatorNo(data: any) {
    const params = {
      beginDate: '',
      endDate: '',
      formCodes: '',
      type: '',
      status: '',
      deptCodes: [],
      keyword: '',
      ...data
    }
    return this.post(`/form/searchRoom/master/getPageByCreatorNo`, params)
  }
  // 撤销提交贵州
  cancelCommitForGZ(params: Record<string, any>) {
    return this.post(`/form/searchRoom/master/cancelCommit`, params)
  }
  /**
   * 片区护长修改整改意见
   * @param params {
   * formId,
   * itemCode,
   * itemValue
   * }
   * @returns 
   */
  saveOpinion(params: Record<string, any>) {
    return this.post(`/form/searchRoom/master/saveOpinion`, params)
  }
}

export default new Api()
