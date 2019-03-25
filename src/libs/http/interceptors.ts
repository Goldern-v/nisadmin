import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
// import commonConfig from '../../configs/common'
import ResponseError from './ResponseError'
import { authStore } from '@/stores'

/**
 * 登录页面路径
 */
export const loginURL = '#/login'

/**
 * 请求成功拦截 无token
 */
export function onRequestNoToken (config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = '51e827c9-d80e-40a1-a95a-1edc257596e7'
  return config
}
/**
 * 请求成功拦截
 */
export function onRequestFulfilled (config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = '51e827c9-d80e-40a1-a95a-1edc257596e7'
  config.headers.common['Auth-Token-Nursing'] = authStore.authToken
  return config
}

/**
 * 请求失败拦截
 */
export function onRequestRejected (error: Error) {
  return Promise.reject(error)
}

enum StatusCode {
  error = '300',
  success = '200',
  logout = '301'
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled (response: AxiosResponse) {
  let { code, desc, data } = response.data
  switch (code) {
    case StatusCode.error: {
      message.error(desc)
      return Promise.reject(desc)
    }
    case StatusCode.logout: {
      message.warning('登录超时，请重新登录 ')
      window.location.href = loginURL
      return Promise.reject(desc)
    }
    case StatusCode.success: {
      return data
    }
    default:
      return Promise.reject(`未知异常`)
  }
}

/**
 * 响应失败拦截
 */
export function onResponseRejected (error: Error) {
  return Promise.reject(new ResponseError('服务器开小差了', (error as any).response))
}
