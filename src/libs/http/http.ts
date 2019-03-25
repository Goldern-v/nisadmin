import axios from 'axios'

import axiosConfig from './config'
import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
  onRequestNoToken
} from './interceptors'

/** 带token */
const http = axios.create(axiosConfig)
http.interceptors.request.use(onRequestFulfilled, onRequestRejected)
http.interceptors.response.use(onResponseFulfilled, onResponseRejected)

/** 无验证不带token */
const httpNoToken = axios.create(axiosConfig)
httpNoToken.interceptors.request.use(onRequestNoToken, onRequestRejected)
httpNoToken.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export { http, httpNoToken }
