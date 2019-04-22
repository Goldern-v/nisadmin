import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, notification } from 'antd'
// import commonConfig from '../../configs/common'
import ResponseError from './ResponseError'
import { authStore, appStore } from 'src/stores'

/**
 * 登录页面路径
 */
export const loginURL = '#/login'

/**
 * 请求登陆成功拦截
 */
export function onRequestLoginFilled (config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = appStore.getAppToken()
  return config
}

/**
 * 请求成功拦截
 */
export function onRequestFulfilled (config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = appStore.getAppToken()
  config.headers.common['Auth-Token-Nursing'] = authStore.getAuthToken()
  return config
}

/**
 * 请求失败拦截
 */
export function onRequestRejected (error: Error) {
  return Promise.reject(error)
}

enum StatusCode {
  error = 300,
  success = 200,
  logout = 301,
  notFound = 404,
  badGateWay = 502
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled (response: AxiosResponse) {
  let { code, msg, data } = response.data
  let status = response.status
  switch (parseInt(code, 10)) {
    case StatusCode.error: {
      console.error(response, code, response.data.desc || '')
      // message.error(response.data.desc || msg)
      return Promise.reject(response.data.desc || msg)
    }
    case StatusCode.logout: {
      // message.warning('登录超时，请重新登录 ')
      sessionStorage.setItem('adminNurse', '')
      sessionStorage.setItem('authToken', '')
      sessionStorage.setItem('user', '')
      window.location.href = loginURL
      return Promise.reject(msg)
    }
    case StatusCode.success: {
      return response.data
    }
    case StatusCode.notFound: {
      console.log('404响应', response.data, code, msg, data)
      return response
    }
    case StatusCode.badGateWay: {
      // message.warning('系统部署中...')
      console.log('502响应', response.data, code, msg, data)
      return response
    }
    default:
      if (status === 200) {
        return response.data
      }
      console.log('默认响应', response, response.data, code, msg, data)
      return Promise.reject(`未知异常`)
  }
}

/**
 * 响应失败拦截
 */
export function onResponseRejected (error: Error) {
  // message.loading('服务器开小差了' + new ResponseError('服务器开小差了', (error as any).response), 5000)
  // return Promise.reject(new ResponseError('服务器开小差了', (error as any).response))
  // notification.error({
  //   message: '服务器开小差了',
  //   duration: 0,
  //   placement: 'bottomRight',
  //   description: `code: ${(error as any).response.status} ${(error as any).response.statusText}`,
  //   onClick: () => {
  console.log('服务器开小差了', (error as any).response)
  //   }
  // })
}
