import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getData(params: {}) {
    return this.post(`/dutyRoster/getDutyRosterList`, params)
  }
  //获取护士长夜查房值班表列表
  getDataGZ(params: {}) {
    return this.post(`/dutyRosterForGZ/queryList`, params)
  }

  saveData(params: {}) {
    return this.post(`/dutyRosterForGZ/saveOrUpdate`, params)
  }

  setIsPublish(params: {}) {
    return this.post(`/dutyRosterForGZ/setIsPublish`, params)
  }

  exportData(params: {}) {
    return this.post(`/dutyRosterForGZ/exportDutyRosterForGZ`, params, { responseType: 'blob' })
  }

  getAllNurse() {
    return this.get(`/dutyRosterForGZ/getAllHeadNurse`)
  }


}

export default new Api()
