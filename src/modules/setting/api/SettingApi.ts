import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'
import SettingViewModel from 'src/modules/setting/SettingViewModel'
import { Obj } from 'src/libs/types'
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
  /**角色对照 */
  /**查看角色列表 */
  public async getFLowRoleList() {
    return this.get(`flowRole/getList`)
  }
  /**获取角色列表 */
  public async getListByRoleCodeForManage (roleCode: string) {
    return this.get(`flowRoleUser/getListByRoleCodeForManage/${roleCode}`)
  }
  /**设置角色描述 */
  public async updateRoleDescribe(data: Obj) {
    return await this.post(`flowRole/updateRoleDescribe`, data)
  }
  /**片区对照 */
  /**查看部门列表 */
  public async getDetManageList() {
    return await this.get(`deptManage/listDept`)
  }
  /**更新部门信息 */
  public async updateDept(data: Obj[]) {
    return await this.post(`deptManage/updateDept`, data)
  }

}

export default new SettingApi()
