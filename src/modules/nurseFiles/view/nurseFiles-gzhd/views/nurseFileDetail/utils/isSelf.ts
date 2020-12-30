import { appStore } from "src/stores"

/* 判断是否本人 */
export const isSelf = () => {
  return appStore.match.path == '/selfNurseFile/:type'
}