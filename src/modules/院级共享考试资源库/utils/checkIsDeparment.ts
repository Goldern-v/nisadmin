import { message } from "antd"
import { authStore } from "src/stores"

/**判断是否护理部 */
export const checkIsDeparment = () => {
  if (authStore.isDepartment) {
    return true
  } else {
    message.warn('仅护理部拥有权限')
    return false
  }
}