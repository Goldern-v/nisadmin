import { observable, computed, action } from 'mobx'
class SettingViewModel {
  @observable public typeGet = ''
  @observable public selectYear = ''
  @observable public holidayName = ''
}

const settingViewModel = new SettingViewModel()
export default settingViewModel
