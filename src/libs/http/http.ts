import axios from "axios";

import axiosConfig from "./config";
import {
  onRequestLoginFilled,
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected
} from "./interceptors";

// 上传大文件限制
axios.defaults.timeout = 1800000;

/** 带token */
const http = axios.create(axiosConfig);
http.interceptors.request.use(onRequestFulfilled, onRequestRejected);
http.interceptors.response.use(onResponseFulfilled, onResponseRejected);

/** 无验证不带token */
const httpNoToken = axios.create(axiosConfig);
httpNoToken.interceptors.response.use(onResponseFulfilled, onResponseRejected);

/** 登陆带token */
const httpLoginToken = axios.create(axiosConfig);
httpLoginToken.interceptors.request.use(
  onRequestLoginFilled,
  onRequestRejected
);
httpLoginToken.interceptors.response.use(
  onResponseFulfilled,
  onResponseRejected
);

/** 带token 不处理错误 */
const httpNoError = axios.create();
httpLoginToken.interceptors.request.use(
  onRequestLoginFilled,
  onRequestRejected
);

export { http, httpNoToken, httpLoginToken, httpNoError };
