import axios from 'axios'
import {
  axiosConfig,
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
} from './defaults'

const http = axios.create(axiosConfig)

http
  .interceptors.request.use(onRequestFulfilled, onRequestRejected)

http
  .interceptors.response.use(onResponseFulfilled, onResponseRejected)

export default http
