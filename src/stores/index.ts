import AppStore from './AppStore'
import AuthStore from './AuthStore'
import ScheduleStore from './ScheduleStore'

export const appStore = new AppStore()
export const authStore = new AuthStore()
export const scheduleStore = new ScheduleStore()

const store = {
  appStore,
  authStore,
  scheduleStore
}

export default store
