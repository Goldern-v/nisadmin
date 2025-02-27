import { Obj } from "src/libs/types"
import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getPatientList(params: {}) {
    return this.post(`/patient/patEmrList`, params)
  }
  // 获取患者列表 by wh
  getDischargedPatient(params: Obj) {
    return this.post(`/indexInfo/getDischargedPatient`, params)
  }

  // 获取患者详情
  getPatientItem(id: string, visitId: string) {
    return this.get(`patient/info/${id}/${visitId}`)
  }
}

export default new Api()
