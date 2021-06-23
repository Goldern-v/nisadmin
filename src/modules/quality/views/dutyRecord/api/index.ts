import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getData(params: {}) {
    return this.post(`/dutyRoster/getDutyRosterList`, params)
  }

  saveData(params: {}) {
    return this.post(`/dutyRoster/updateDutyRoster`, params)
  }

  exportData(params: {}) {
    return this.post(`/dutyRoster/download`, params, { responseType: 'blob' })
  }

  getAllNurse() {
    return this.get(`/addressList/getAllNurse`)
  }


}

export default new Api()
