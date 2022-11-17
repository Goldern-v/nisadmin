import React, { useState, useEffect, useLayoutEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { decrypt, encrypt } from "./ZzSecurityHelper";
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

  // 加密start -----
  // if(appStore.HOSPITAL_ID == "fssdy"){
  //   let type = config.headers["post"]["Content-Type"];
  //   const isUploadFile = config.headers['Content-Type'] === 'multipart/form-data';
  //   if (type == "application/x-www-form-urlencoded" && config.data.toString().indexOf("=") > 0 && !isUploadFile) {
  //     config!.headers!["Req-Token-Nursing"] = "FORM";
  //     let json = changeFormToJson(config.data?.toString())
  //     // @ts-ignore
  //     let mi = config.originData || encrypt(json);
  //     config.data = `p=${mi}`;;
  //     // @ts-ignore，记录一下加密后的数据，避免网络框架内部重试时的重复加密
  //     config.originData = mi;

  //   } else if ((type == "application/json" ||
  //     (type == "application/x-www-form-urlencoded" &&
  //       config.data.toString().indexOf("=") < 0)) &&
  //     !isUploadFile) {
  //     config.headers!["post"]["Content-Type"] = "application/json"
  //     config!.headers!["Req-Token-Nursing"] = "JSON";
  //     // @ts-ignore
  //     config.data = encrypt(JSON.stringify(config.data));
  //     // @ts-ignore，记录一下加密后的数据，避免网络框架内部重试时的重复加密
  //     config.originData = config.data.toString();
  //   }
  // }
  // 加密 end---

  return config;
}

function changeFormToJson(fromStr: string) {
	let content = decodeURIComponent(fromStr || "")
	let array = content.split("&")
	// if (!isEmptyArray(array)) {
		let json = {};
		array.forEach((item) => {
			let kv = item.split("=");
			if (kv && kv.length > 1) {
				json[kv[0]] = kv[1]
			}
		})
		return JSON.stringify(json);
}

/**
 * 请求成功拦截
 */
export function onRequestFulfilled(config: AxiosRequestConfig) {
  config.headers.common["App-Token-Nursing"] = appStore.getAppToken();
  config.headers.common["Auth-Token-Nursing"] = authStore.getAuthToken();
// 加密start -----
  // if(appStore.HOSPITAL_ID == "fssdy"){
  //   if (config.method == 'post'){
  //     let type = config.headers["post"]["Content-Type"];
  //     const isUploadFile = config.headers['Content-Type'] === 'multipart/form-data';
  //     if (type == "application/x-www-form-urlencoded" && config.data.toString().indexOf("=") > 0 && !isUploadFile) {
  //       config!.headers!["Req-Token-Nursing"] = "FORM";
  //       let json = changeFormToJson(config.data?.toString())
  //       // @ts-ignore
  //       let mi = encrypt(json);
  //       config.data = `p=${mi}`;
  //       // @ts-ignore，记录一下加密后的数据，避免网络框架内部重试时的重复加密
  //       config.originData = mi;
  //     } else if ((type == "application/json" ||
  //       (type == "application/x-www-form-urlencoded" &&
  //         config.data.toString().indexOf("=") < 0)) &&
  //       !isUploadFile) {
  //       config.headers!["post"]["Content-Type"] = "application/json"
  //       config!.headers!["Req-Token-Nursing"] = "JSON";
  //       // @ts-ignore
  //       config.data = `${config.originData || encrypt(JSON.stringify(config.data))}`;
  //       // @ts-ignore，记录一下加密后的数据，避免网络框架内部重试时的重复加密
  //       config.originData = config.data.toString();
  //     }
  //   }else if (config.method == 'get') {
  //     config!.headers!["Req-Token-Nursing"] = "QUERY";
  //   }
  // }
  // 加密 end---
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
  // 加密start -----
  // if(appStore.HOSPITAL_ID == "fssdy"){
  //   if(response.data && response.config.headers["Req-Token-Nursing"]){
  //     response.data = decrypt(response.data)
  //     response.data = JSON.parse(response.data==""?"{}":response.data)
  //   } 
  // }
  // 加密 end---
  let { code, desc, data } = response.data;
  let status = code;
  let { url } = response.config;
  switch (status) {
    case StatusCode.error:
    case StatusCode.error1: {
      if (appStore.HOSPITAL_ID == "ys") return Promise.reject();
      // alert(12)
      // 满意度调查分析,三级护理分析 by贵州
      if (['/satisfactionAnalysis/','/qcNursingAnalysis/'].findIndex((v:string) =>(url as string).indexOf(v) > -1)>-1) {
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
