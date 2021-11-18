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
    if (['gzsrm'].includes(appStore.HOSPITAL_ID)) {
      return this.post(`/form/searchRoom/master/getPageByUserDept`, params)
    } else {
      return this.post(`/form/searchRoom/master/getPage`, params)
    }

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

  // 删除
  deleteitem(params: Object) {
    return this.post(`/form/searchRoom/master/delete`, params)
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

}

export default new Api()
