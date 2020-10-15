import service from "src/services/api"
import { authStore } from "src/stores"
import { compileStr } from "../encode/encode"

export const autoLoginTnNisInfoBe = () => {
  //删除登录信息
  service.authApiService.logout()
  //跳转不良事件提交界面
  window.location.href = `${window.location.origin}/crNursing/badevents/login?formatInfo=${compileStr(JSON.stringify({
    empNo: authStore.user?.empNo,
    password: compileStr(authStore.user?.wsp || ''),
    timeset: new Date().getTime()
  }))}`
}