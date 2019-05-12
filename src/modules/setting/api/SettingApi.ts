import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import SettingViewModel from 'src/modules/setting/SettingViewModel'
class SettingApi extends BaseApiService {
  // public async postNurseScheduling (exportData: any = true) {
  //   let postData = {}
  //   let trancePostData = this.stringify(postData)
  //   return this.post(`/scheduling/User`, trancePostData)
  // }
  // 节假日设置表获取
  public async getHolidayTable (HolidaysDate: string) {
    return this.get(`/schHolidays/getByHolidaysDate/${HolidaysDate}`)
  }

  // 节假日设置表新增节日
  public async postHolidayAdd () {
    let postData = { holidays: SettingViewModel.getHolidayAdd }
    // let postData = { holidays: [{SettingViewModel.holidayName:SettingViewModel.holidayDate1},{SettingViewModel.holidayName:SettingViewModel.holidayDate2},{SettingViewModel.holidayName:SettingViewModel.holidayDate3}] }
    return this.post(`/schHolidays/saveOrUpdate`, postData)
  }
  // 节假日设置删除节日
  public async getHolidayDelete (deleteData: any) {
    return this.post(`schHolidays/delById`, deleteData)
  }
}

export default new SettingApi()
