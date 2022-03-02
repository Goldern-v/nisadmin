import BaseApiService from "src/services/api/BaseApiService"
import moment from 'moment'
import { appStore } from "src/stores";
class Api extends BaseApiService {
  // 获取列表
  getList(data: any) {
    const params = {
      ...data,
      startDate: data.startDate ? moment(data.startDate).format('YYYY-MM-DD') : '',
      endDate: data.endDate ? moment(data.endDate).format('YYYY-MM-DD') : '',
    }
    return this.post(`/safetyCheck/getPageList`, params)
  }

  // 获取详情
  getItem(id: string) {
    return this.post(`/safetyCheck/getById`, {id})
  }

  // 新增
  saveItem(params: Object) {
    return this.post(`/safetyCheck/saveOrUpdate`, params)
  }

  // 审核
  auditItem(params: Object) {
    return this.post(`/form/searchRoom/master/handleNode`, params)
  }

  // 删除
  deleteitem(id: Object) {
    return this.post(`/safetyCheck/deleteById`, id)
  }
  // 获取片区
  getAreaList() {
    return this.get(`/safetyCheck/getAreaList`)
  }

  // 根据片区获取科室
  getDeptListByArea(params: Object) {
    return this.post(`/safetyCheck/getDeptListByArea`, params)
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
