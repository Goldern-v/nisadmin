import service from "src/services/api"
import { appStore, authStore } from "src/stores"
import { compileStr, uncompileStr } from "../encode/encode"

interface Options {
  blank?: boolean,
  redictUri?: string
  loginUri?: string
}

export const autoLoginTnNisInfoBe = (options?: Options) => {
  const defaultOptions = {
    blank: false,
    redictUri: '',
    loginUri: '/crNursing/badevents/login'
  }

  const _options = {
    ...defaultOptions,
    ...options || {}
  }

  console.log(_options)

  const { blank, redictUri, loginUri } = _options

  let secretText = compileStr(JSON.stringify({
    empNo: authStore.user?.empNo,
    password: uncompileStr(authStore.user?.wsp || ''),
    timeset: new Date().getTime(),
    redictUri,
  }))
  
  let nursingInfoLoginUri = `${window.location.origin}${loginUri}?formatInfo=${encodeURIComponent(secretText)}`
  if (appStore.HOSPITAL_ID === 'yczyy') {
    let obj = compileStr(JSON.stringify({
      userId: authStore.user?.id,
      token: authStore.authToken,
      timeset: new Date().getTime(),
      redictUri,
    }))
    // nursingInfoLoginUri = `http://localhost:4890${loginUri}?jumpInfo=${encodeURIComponent(obj)}` 
    nursingInfoLoginUri = `${window.location.origin}${loginUri}?jumpInfo=${encodeURIComponent(obj)}` 
  }
  if (appStore.isDev) console.log(nursingInfoLoginUri)

  if (blank) {
    window.open(nursingInfoLoginUri)
  } else {
    //删除登录信息
    service.authApiService.logout()
    //跳转不良事件提交界面
    window.location.href = nursingInfoLoginUri
  }
}