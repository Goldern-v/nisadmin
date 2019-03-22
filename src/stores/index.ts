import AppStore from './AppStore'
import AuthStore from './AuthStore'

export const appStore = new AppStore()
export const authStore = new AuthStore()

const store = {
  appStore,
  authStore
}

export default store
