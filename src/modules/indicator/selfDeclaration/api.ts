import BaseApiService from "src/services/api/BaseApiService"
import moment from 'moment'
import { message } from "antd";

class Api extends BaseApiService {
  // 获取列表
  getList(data: any) {
    const params = { ...data }
    params.beginDate = moment(params.time[0]).format("YYYY-MM-DD")
    params.endDate = moment(params.time[1]).format("YYYY-MM-DD")
    params.formCodes = params.formCodes ? [params.formCodes] : []
    delete params.time
    return this.post(`/form/eventReport/master/getPage`, params)
  }

  // 导出
  export(data: any) {
    const params = { ...data }
    params.beginDate = moment(params.time[0]).format("YYYY-MM-DD")
    params.endDate = moment(params.time[1]).format("YYYY-MM-DD")
    params.formCodes = params.formCodes ? [params.formCodes] : []
    delete params.time
    return this.post(`/form/eventReport/master/export`, params, { responseType: 'blob' })
  }

  // 获取一项
  getItem(id: string) {
    return this.get(`form/eventReport/master/get/${id}`)
  }

  // 新增或保存
  updateItem(master: any, itemDataMap: any, commit = false) {
    const params = {
      master: { ...master },
      itemDataMap: { ...itemDataMap },
      commit
    }
    params.master.admissionDate = moment(params.master.admissionDate).format('YYYY-MM-DD HH:mm:ss')
    return this.post(`/form/eventReport/master/save`, params)
  }

  // 删除一项
  deleteItem(id: string) {
    return this.post(`form/eventReport/master/delete`, { id })
  }

  // 取消提交
  cancelCommit(id: string) {
    return this.post(`form/eventReport/master/cancelCommit`, { id })
  }

  // 获取默认值
  getDefaultValue(data: any) {
    const params = {
      formCode: data.formCode,
      happenDate: data.happenDate,
      patientId: data.patientId,
      wardCode: data.wardCode,
      visitId: data.visitId
    }
    return this.post(`form/eventReport/master/getDefaultData`, params)
  }
}

export default new Api()
