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
    let nameHoliday = SettingViewModel.holidayName
    let data1 = SettingViewModel.holidayDate1
    let data2 = SettingViewModel.holidayDate2
    let data3 = SettingViewModel.holidayDate3
    let postData = {
      holidays: [
        { name: nameHoliday, holidaysDate: data1 },
        { name: nameHoliday, holidaysDate: data2 },
        { name: nameHoliday, holidaysDate: data3 }
      ]
    }
    return this.post(`/schHolidays/saveOrUpdate`, postData)
  }
  // 节假日设置删除节日
  public async getHolidayDelete (deleteData: any) {
    return this.post(`schHolidays/delById`, deleteData)
  }
}

export default new SettingApi()
