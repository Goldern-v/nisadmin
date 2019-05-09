import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import SettingViewModel from 'src/modules/setting/SettingViewModel'
class SettingApi extends BaseApiService {
  // public async postNurseScheduling (exportData: any = true) {
  //   let postData = {}
  //   let trancePostData = this.stringify(postData)
  //   return this.post(`/scheduling/User`, trancePostData)
  // }
  // 节假日设置表
  public async getHolidayTable (HolidaysDate: string) {
    return this.get(`/schHolidays/getByHolidaysDate/${HolidaysDate}`)
  }
}

export default new SettingApi()
