import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, notification } from 'antd'
// import commonConfig from '../../configs/common'
import ResponseError from './ResponseError'
import { authStore, appStore } from 'src/stores'
import { Modal } from 'src/vendors/antd'

message.config({
  maxCount: 1
})

/**
 * 登录页面路径
 */
export const loginURL = '#/login'

/**
 * 请求登陆成功拦截
 */
export function onRequestLoginFilled(config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = appStore.getAppToken()
  return config
}

/**
 * 请求成功拦截
 */
export function onRequestFulfilled(config: AxiosRequestConfig) {
  config.headers.common['App-Token-Nursing'] = appStore.getAppToken()
  config.headers.common['Auth-Token-Nursing'] = authStore.getAuthToken()
  return config
}

/**
 * 请求失败拦截
 */
export function onRequestRejected(error: Error) {
  return Promise.reject(error)
}

enum StatusCode {
  error = '300',
  success = '200',
  logout = '301',
  notFound = '404',
  badGateWay = '502'
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled(response: AxiosResponse) {
  let { code, desc, data } = response.data
  let status = code
  switch (status) {
    case StatusCode.error: {
      // alert(12)
      if (desc.indexOf('\n') > -1) {
        const modal = Modal.error({
          title: '警告',
          content: <pre style={{ whiteSpace: 'pre-wrap' }}>{desc}</pre>,
          width: 600,
          mask: false
        })
        // setTimeout(() => {
        //   modal.destroy()
        // }, 10 * 1000)
      } else {
        message.error(<pre>{desc}</pre> || '未知异常')
      }
      // console.log(desc, desc.indexOf('\n'), 'desc')

      return Promise.reject(response.data.desc || desc)
    }
    case StatusCode.logout: {
      // message.destroy()
      // message.warning('登录超时，请重新登录')
      sessionStorage.setItem('adminNurse', '')
      sessionStorage.setItem('authToken', '')
      sessionStorage.setItem('user', '')
      window.location.href = loginURL
      return Promise.reject(desc)
    }
    case StatusCode.success: {
      return response.data
    }
    case StatusCode.notFound: {
      message.warning('404响应')
      return Promise.reject()
    }
    case StatusCode.badGateWay: {
      // message.warning('系统部署中...')
      console.log('502响应', response.data, code, desc, data)
      return Promise.reject()
    }
    default:
      if (status === 200) {
        return response.data
      }
      if (response.data) {
        console.log('默认响应', response, response.data, code, desc, data)
        return response
      }
      console.log('默认响应', response, response.data, code, desc, data)
      return Promise.reject(`未知异常`)
  }
}

/**
 * 响应失败拦截
 */
export function onResponseRejected(error: Error) {
  // message.loading('服务器开小差了' + new ResponseError('服务器开小差了', (error as any).response), 5000)
  // return Promise.reject(new ResponseError('服务器开小差了', (error as any).response))
  // notification.error({
  //   message: '服务器开小差了',
  //   duration: 0,
  //   placement: 'bottomRight',
  //   description: `code: ${(error as any).response.status} ${(error as any).response.statusText}`,
  //   onClick: () => {
  console.log('服务器开小差了', (error as any).response)
  message.warning('服务器开小差了 ')
  //   }
  // })
  return Promise.reject()
}
