// import * as React from 'react'
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import loginViewModel from "./LoginViewModel";

import service from "src/services/api";
import { appStore, scheduleStore } from "src/stores";
import { Button } from "src/vendors/antd";
import { AutoComplete, message } from "antd";
import { withRouter } from 'react-router-dom'

import { compileStr, uncompileStr } from 'src/utils/encode/encode'
import qs from "qs";

export interface Props extends RouteComponentProps { }

export default withRouter(function LoginView(props: Props) {

  const { location, history } = props;
  const search = qs.parse(location.search.replace('?', ''))
  let formatInfoStr = search.formatInfo
  // console.log(formatInfoStr)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationImg, setVerificationImg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const [isSavePassword, setIsSavePassword] = useState(false);
  let userRef: any = useRef<HTMLInputElement>();
  let passwordRef: any = useRef<HTMLInputElement>();

  useEffect(() => {
    if (localStorage.lastLoginUserName) {
      setUsername(localStorage.lastLoginUserName);
    }

    autoLogin()
  }, []);

  useEffect(() => {
    const userLoginInfoMap = JSON.parse(localStorage.userLoginInfoMap || "{}");
    if (username == "") {
      setPassword("");
    }
    if (userLoginInfoMap[username]) {
      setPassword(userLoginInfoMap[username])
      setIsSavePassword(true)
    }
  }, [username]);

  useLayoutEffect(() => {
    (document as any).querySelector("#username input").focus();
    (document as any).querySelector("#username input")!.onkeydown = (
      e: any
    ) => {
      if (e.keyCode === 13) {
        passwordRef.current.focus();
      }
    };
  }, []);

  function login(options?: {
    username: string,
    password: string
  }) {
    let _username: string, _password: string
    if (!options) {
      _username = username
      _password = password
    } else {
      _username = options.username
      _password = options.password
    }

    if (!(username && password)) {
      message.warning("请填写账号和密码！")
      return;
    }
    if (showVerification&&!verificationCode) {
      message.warning("请填写验证码！")
      return;
    }
    service.authApiService
      .login(_username, _password, verificationCode, "")
      .then(() => {
        if (isSavePassword) {
          const userLoginInfoMap = JSON.parse(
            localStorage.userLoginInfoMap || "{}"
          );
          userLoginInfoMap[_username.toLowerCase()] = _password;
          localStorage.userLoginInfoMap = JSON.stringify(userLoginInfoMap);
          /** 最后登录的用户 */
          localStorage.lastLoginUserName = _username.toLowerCase();
        }
      })
      .catch(() => {
        // if (formatInfoStr) history.replace('/login')
        let errorCode = scheduleStore.getErrorData().errorCode
        let data = scheduleStore.getErrorData().data
        if (errorCode == "301") {
          setShowVerification(true)
          setVerificationImg(data)
        } else if (errorCode == "403") {
          setShowVerification(true)
          refreshImg()
        }
      });
  }

  const autoLogin = () => {
    if (formatInfoStr) {
      try {
        let formatInfo = JSON.parse(
          uncompileStr(
            decodeURIComponent(formatInfoStr)
          )
        )

        if (!formatInfo.timeset || new Date().getTime() - formatInfo.timeset > 300000) {
          history.replace('/login')
          message.error('登录超时，已取消自动登录')
          return
        }

        login({
          username: formatInfo.empNo,
          password: formatInfo.password
        })
      } catch (e) {
        console.error(e)
        history.replace('/login')
        message.error('登录信息错误，已取消自动登录')
      }
    } else {
      //南医三
      //如果是未登录状态则自动跳转护理信息系统不良事件
      // if (appStore.HOSPITAL_ID === 'nys' && appStore.onlyBadEvent) {
      //   window.location
      //     .replace(window.location.origin + '/crNursing/badevents/')
      // }
    }
  }

  const userEnter = (e: any) => {
    if (e.keyCode === 13) {
      passwordRef.current.focus();
    }
  };
  const passwordEnter = (e: any) => {
    if (e.keyCode === 13) {
      login();
    }
  };
  const refreshImg = () => {
    setShowVerification(true)
    service.authApiService
      .login(username, password, "", true)
        .then((res:any) => {
          setVerificationImg(res.data)
        })
        .catch(() => {
          
        });
  }
  const userLoginInfoMap = JSON.parse(localStorage.userLoginInfoMap || "{}");
  const keys = Object.keys(userLoginInfoMap);
  let userNameDataSource: any = [];
  if (!username) {
    userNameDataSource = keys;
  } else {
    userNameDataSource = keys.filter((item: string) => item.includes(username));
  }

  const Title = () => {
    if (appStore.onlyBadEvent)
      return '不良事件管理系统'
    let titlePrefix = appStore.hospitalOtherName ? appStore.hospitalOtherName : "";
    return `${titlePrefix}护理管理系统`
  }

  return (
    <Wrapper
      style={{
        display: formatInfoStr ? 'none' : 'block'
      }}>
      <BgImg>
        <BoxInput
        // onKeyUp={(e) => {
        //   handleKeyUp(e)
        // }}
        >
          <div className="Top">
            <img src={appStore.HOSPITAL_LOGO} alt="logo" className="BoxLogin" />
            {appStore.hisMatch({
              map: {
                'nys': appStore.onlyBadEvent ? (
                  <h1
                    className="Title"
                    style={{
                      margin: 0,
                      marginBottom: '-10px',
                      letterSpacing: '2px'
                    }}>
                    {appStore.HOSPITAL_Name}
                  </h1>
                ) : null,
                default: null
              }
            })}
            <h1 className="Title">{Title()}</h1>
          </div>
          
          <div className="TextItem">
            <div className="iconfont NameIcon">&#xe648;</div>
            {/* {JSON.stringify(userNameDataSource)} */}
            <AutoComplete
              id="username"
              style={{ width: "100%", borderRadius: 0 }}
              onChange={(value: any) => setUsername(value)}
              placeholder="用户名"
              value={username}
              dataSource={userNameDataSource}
            />
          </div>
          {/* <div style={{ height: "2px" }} /> */}
          <div className="TextItem">
            <div className="iconfont NameIcon">&#xe6cb;</div>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="密码"
              ref={passwordRef}
              value={password}
              onKeyDown={passwordEnter}
            />
          </div>
          {showVerification&&<div className="TextItem">
            <div className="iconfont NameIcon">&#xe6cb;</div>
            <input
              onChange={e => setVerificationCode(e.target.value)}
              style={{ width: 180 }}
              type="password"
              placeholder="验证码，单击图片刷新"
              value={verificationCode}
              onKeyDown={passwordEnter}
            />
            <div className="verificationImg">
              <img src={verificationImg} alt="" onClick={() => {refreshImg()}}/>
            </div>
          </div>}
          <div style={{ display: "flex" }}>
            <div
              className="CheckItem"
              onClick={() => {
                setIsSavePassword(!isSavePassword);
              }}
            >
              <input
                type="checkbox"
                onChange={() => { }}
                checked={isSavePassword}
              />
              <label>记住账号密码</label>
            </div>
          </div>

          <Button
            type="primary"
            onClick={() => login()}
            block
            loading={loginLoading}
            style={{ marginTop: 20, height: 36 }}
          >
            登陆系统
          </Button>
        </BoxInput>
      </BgImg>
      <BottomContent>
        {appStore.hisMatch({
          map: {
            'nys': '广州宸瑞软件科技有限公司 http://www.cr-health.com',
            other: '百辰源(广州)科技有限公司'
          },
          vague: true
        })}
        <span> 版权所有©2013-{new Date().getFullYear()}，All rights reseved. </span>
        {appStore.hisMatch({
          map: {
            'nys': '关于宸瑞 | 关于智慧护理 | 联系客服',
            other: `关于智慧护理 | 联系客服`
          },
          vague: true
        })}
      </BottomContent>
    </Wrapper>
  );
})

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: #57bb96;
`;
const BgImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 975px;
  height: 414px;
  background-image: url(${require("./img/background.png")});
  background-size: 100% 100%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;
const BottomContent = styled.pre`
  /* position: relative;
  top: 580px;
  color: white;
  text-align: center; */
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #eef8f2;
  overflow: hidden;
`;
const BoxInput = styled.div`
  position: fixed;
  bottom: 100px;
  right: 50px;
  padding: 22px 20px 32px;
  background: #fafcff;
  border-radius: 2px;
  width: 310px;
  /* text-align: center; */
  .Top {
    text-align: center;
    .BoxLogin {
      width: 67px;
    }
    .Title {
      margin: 12px 0 24px;
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
  }
  .TextItem {
    position: relative;
    .NameIcon {
      position: absolute;
      top: 5px;
      left: 9px;
      z-index: 2;
    }
    .ant-select-selection__placeholder {
      margin-left: 30px !important;
    }
    input {
      font-size: 14px !important;
    }
    .verificationImg {
      width: 80px;
      height: 35px;
      position: absolute;
      top: 0;
      right: 0;
      img {
        width: 80px;
        height: 35px;
      }
    }
  }
  input[type="text"] {
    position: relative;
    padding-left: 30px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #cbd5dd;
    border: none;
    width: 100%;
    height: 35px;
    outline: none;
    transition: box-shadow 0.2s;
    border-radius: 0;
  }
  input[type="password"] {
    position: relative;
    padding: 0;
    padding-left: 30px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #cbd5dd;
    border: none;
    width: 100%;
    height: 35px;
    outline: none;
    transition: box-shadow 0.2s;
  }
  input[type="text"]:hover {
    box-shadow: 0 0 0 1px #4fb390;
  }
  input[type="password"]:hover {
    box-shadow: 0 0 0 1px #4fb390;
  }
  input[type="text"]:focus,
  input[type="password"]:focus {
    z-index: 1;
    box-shadow: 0 0 0 1px #4fb390;
  }
  .CheckItem {
    position: relative;
    margin-top: 12px;
    margin-right: 20px;
    padding-left: 22px;
    text-align: left;
    /* cursor: pointer; */
    label {
      cursor: pointer;
    }
    input[type="checkbox"] {
      display: inline-block;
      position: absolute;
      top: 2px;
      left: 0;
      z-index: 1;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      background-color: #fff;
      cursor: pointer;
    }
    input[type="checkbox"]:hover {
      background-color: #15a57b;
      border: 1px solid #15a57b;
    }
    input[type="checkbox"]:after {
      box-sizing: content-box;
      content: "";
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transform-origin: center;
    }
  }
  /* button {
    border: 1px solid #dcdfe6;
    margin-top: 20px;
    padding: 9px 20px;
    width: 100%;
    font-size: 13px;
    border-radius: 2px;
    background-color: #15a57b;
    border-color: #15a57b;
    cursor: pointer;
    color: #fff;
  }
  button:link {
    border-color: #15a57b;
  }
  button:visited {
    background-color: #44b795;
  }
  button:hover {
    background-color: #44b795;
  }
  button:active {
    background-color: #15a57b;
  } */
`;
