import { Obj } from 'src/libs/types';
import { Backup } from './../types';
import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getData(params: {}) {
    return this.post(`/dutyRoster/getDutyRosterList`, params)
  }
  // 获取列表（新）
  getScheduleData(params = {} as any) {
    return this.post(`/nurseRoundsSchedule/list?roundsDate=${params.roundsDate}`)
  }
  saveData(params: {}) {
    return this.post(`/dutyRoster/updateDutyRoster`, params)
  }
  // 保存数据（整单）
  saveAllData(params: Obj) {
    return this.post(`/nurseRoundsSchedule/saveAll`, params)
  }
  /*发布排班*/
  releasePublish(params: Obj) {
    return this.post(`/nurseRoundsSchedule/publish`,params)
  }
  /*取消发布排班*/
  releaseUnPublish(params: Obj) {
    return this.post(`/nurseRoundsSchedule/unPublish`,params)
  }
  exportData(params: {}) {
    return this.post(`/dutyRoster/download`, params, { responseType: 'blob' })
  }
  // 导出排班表（新）
  exportTable(roundsDate: string) {
    return this.get(`/nurseRoundsSchedule/exportExcel?roundsDate=${roundsDate}`, { responseType: 'blob' })
  }
  // 导出模板（新）
  exportTemplate(roundsDate: string) {
    return this.get(`/nurseRoundsSchedule/exportTemplate?roundsDate=${roundsDate}`, { responseType: 'blob' })
  }
  // 导入排班表（新）
  importTable(file:any,roundsDate: any) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("roundsDate", roundsDate);
    return this.post(`/nurseRoundsSchedule/importTemplate`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  getAllNurse() {
    return this.get(`/addressList/getAllNurse`)
  }
  /*获取所有护士长*/
  getChargeNurse(){
    return this.get(`/nurseRounds/getHeadNurse`)
  }
  /**获取医院的所有楼层*/
  getAllHosipitalFloor(){
    // return this.get(`dict/dictInfo/${code}`)
    return this.get(`/nurseRounds/getDeptPosition`)
  }
  // 保存备班
  saveBackup(params: Backup) {
    return this.post(`/nurseRoundsSchedule/backupSave`, params)
  }
  // 保存备注
  saveRemarks(params: any) {
    return this.post(`/dict/updateItem`, params)
  }
  // 推送
  sendNotice(roundsDate: string) {
    return this.post(`/nurseRoundsSchedule/notice?roundsDate=${roundsDate}`)
  }
/*夜查房统计*/
  problemsCount(params:{}) {
    return this.post(`/nurseRoundsRecordCount/problemsCount`, { ...params })
  }
}

export default new Api()
