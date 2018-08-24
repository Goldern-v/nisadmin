import { AxiosRequestConfig, AxiosResponse } from 'axios'

import apiConfig from '../../configs/api'
import ResponseError from './ResponseError'

/**
 * 请求成功拦截
 */
export function onRequestFulfilled (config: AxiosRequestConfig) {
  if (isAuthURL(config.url!)) {
    return config
  }

  const token = localStorage.getItem('token')

  if (token) {
    config.headers.common[apiConfig.dynamicTokenKey] = token
  } else {
    window.location.href = apiConfig.loginURL
  }

  return config
}

/**
 * 请求失败拦截
 */
export function onRequestRejected (error: Error) {
  return Promise.reject(error)
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled (response: AxiosResponse) {
  const data = response.data
  const { code, desc } = data

  switch (code) {
    case '300': // 请求参数错误、服务器错误等
      return Promise.reject(new ResponseError(desc, response))

    case '301': // token无效
      // Message.error('登录超时，请重新登录')
      localStorage.setItem('token', '')

      window.location.href = apiConfig.loginURL
      break

    default:
  }

  return data.data
}

/**
 * 响应失败拦截
 */
export function onResponseRejected (error: Error) {
  // Message.error('服务器开小差了')

  return Promise.reject(error)
}

function isAuthURL (url: string) {
  return (
    url.includes('login') ||
    url.includes('logout')
  )
}
