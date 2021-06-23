import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getList(params: {}) {
    return this.post(`/form/searchRoom/master/getPage`, params)
  }

  // 获取详情
  getItem(id: string) {
    return this.get(`/form/searchRoom/master/get/${id}`)
  }

  // 保存
  saveItem(params: Object) {
    return this.post(`/form/searchRoom/master/save`, params)
  }

  // 审核
  auditItem(params: Object) {
    return this.post(`/form/searchRoom/master/handleNode`, params)
  }



}

export default new Api()
