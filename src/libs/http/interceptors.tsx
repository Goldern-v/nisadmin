import React, { useState, useEffect, useLayoutEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { message, notification } from "antd";
// import commonConfig from '../../configs/common'
import ResponseError from "./ResponseError";
import { authStore, appStore, scheduleStore } from "src/stores";
import { Modal } from "src/vendors/antd";
import { cloneJson } from "src/utils/json/clone";

message.config({
  maxCount: 1,
});

/**
 * 登录页面路径
 */
export const loginURL = "#/login";

/**
 * 请求登陆成功拦截
 */
export function onRequestLoginFilled(config: AxiosRequestConfig) {
  config.headers.common["App-Token-Nursing"] = appStore.getAppToken();
  return config;
}

/**
 * 请求成功拦截
 */
export function onRequestFulfilled(config: AxiosRequestConfig) {
  config.headers.common["App-Token-Nursing"] = appStore.getAppToken();
  config.headers.common["Auth-Token-Nursing"] = authStore.getAuthToken();
  return config;
}

/**
 * 请求失败拦截
 */
export function onRequestRejected(error: Error) {
  return Promise.reject(error);
}

enum StatusCode {
  error = "300",
  error1 = "500",
  success = "200",
  logout = "301",
  notFound = "404",
  badGateWay = "502",
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled(response: AxiosResponse) {
  let { code, desc, data } = response.data;
  let status = code;
  let { url } = response.config;
  switch (status) {
    case StatusCode.error:
    case StatusCode.error1: {
      if (appStore.HOSPITAL_ID == "ys") return Promise.reject();
      // alert(12)
      // 满意度调查分析 by贵州
      if ((url as string).indexOf("/satisfactionAnalysis/") > -1) {
        return response.data;
      }
      if (desc.indexOf("\n") > -1) {
        const modal = Modal.error({
          title: "警告",
          content: <pre style={{ whiteSpace: "pre-wrap" }}>{desc}</pre>,
          width: 600,
          mask: false,
        });
        // setTimeout(() => {
        //   modal.destroy()
        // }, 10 * 1000)
      } else {
        message.error(desc || "未知异常");
      }
      // console.log(desc, desc.indexOf('\n'), 'desc')
      scheduleStore.setErrorData(response.data);
      return Promise.reject(response.data.desc || desc);
    }
    case StatusCode.logout: {
      // message.destroy()
      // message.warning('登录超时，请重新登录')
      // sessionStorage.setItem("adminNurse", "");
      // sessionStorage.setItem("authToken", "");
      // sessionStorage.setItem("user", "");
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = loginURL;
      return Promise.reject(desc);
    }
    case StatusCode.success: {
      return response.data;
    }
    case StatusCode.notFound: {
      message.warning("404响应");
      return Promise.reject();
    }
    case StatusCode.badGateWay: {
      // message.warning('系统部署中...')
      console.log("502响应", response.data, code, desc, data);
      return Promise.reject();
    }
    default:
      if (status === 200) {
        return response.data;
      }
      if (response.data) {
        // console.log("默认响应", response, response.data, code, desc, data);
        return response;
      }
      console.log("异常响应", response, response.data, code, desc, data);
      return Promise.reject(`未知异常`);
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
  // console.log("服务器开小差了", JSON.stringify(error as any));
  message.warning("服务器开小差了 ");
  //   }
  // })
  return Promise.reject();
}
