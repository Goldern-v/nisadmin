import axios from 'axios'

import axiosConfig from './config'
import {
  onRequestLoginFilled,
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected
} from './interceptors'

axios.defaults.timeout = 0

/** 带token */
const http = axios.create(axiosConfig)
http.interceptors.request.use(onRequestFulfilled, onRequestRejected)
http.interceptors.response.use(onResponseFulfilled, onResponseRejected)

/** 无验证不带token */
const httpNoToken = axios.create(axiosConfig)
httpNoToken.interceptors.response.use(onResponseFulfilled, onResponseRejected)

/** 登陆带token */
const httpLoginToken = axios.create(axiosConfig)
httpLoginToken.interceptors.request.use(onRequestLoginFilled, onRequestRejected)
httpLoginToken.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export { http, httpNoToken, httpLoginToken }
