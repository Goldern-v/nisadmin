// import * as React from 'react'
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import loginViewModel from "./LoginViewModel";

import service from "src/services/api";
import { appStore } from "src/stores";
import { Button } from "src/vendors/antd";

export interface Props extends RouteComponentProps {}

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [isSaveUserName, setIsSaveUserName] = useState(false);
  let userRef: any = useRef<HTMLInputElement>();
  let passwordRef: any = useRef<HTMLInputElement>();

  useEffect(() => {});
  useLayoutEffect(() => {
    userRef.current.focus();
    userRef.current.select();
    if (localStorage.userNameCache) {
      setUsername(localStorage.userNameCache || "");
    }
  }, []);
  function checkClick() {
    setIsSaveUserName(!isSaveUserName);
  }
  function login() {
    setLoginLoading(true);

    service.authApiService
      .login(username, password)
      .then(() => {
        if (isSaveUserName) {
          localStorage.userNameCache = username;
        }
        setLoginLoading(false);
      })
      .catch(() => {
        setLoginLoading(false);
      });
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
  return (
    <Wrapper>
      <BgImg>
        <BoxInput
        // onKeyUp={(e) => {
        //   handleKeyUp(e)
        // }}
        >
          <img src={appStore.HOSPITAL_LOGO} alt="logo" className="BoxLogin" />
          <h1 className="Title">护理管理系统</h1>

          <div className="TextItem">
            <div className="iconfont NameIcon">&#xe648;</div>

            <input
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="用户名"
              onKeyDown={userEnter}
              value={username}
              ref={userRef}
            />
          </div>
          <div style={{ height: "2px" }} />
          <div className="TextItem">
            <div className="iconfont NameIcon">&#xe6cb;</div>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="密码"
              ref={passwordRef}
              onKeyDown={passwordEnter}
            />
          </div>

          <div className="CheckItem" onClick={checkClick}>
            <input
              type="checkbox"
              onChange={() => {}}
              checked={isSaveUserName}
            />
            <label>记住账号</label>
          </div>
          <Button
            type="primary"
            onClick={login}
            block
            loading={loginLoading}
            style={{ marginTop: 20, height: 36 }}
          >
            登陆系统
          </Button>
        </BoxInput>
      </BgImg>
      <BottomContent>
        广州宸瑞软件科技有限公司 http://www.cr-health.com 版权所有©2013-
        {new Date().getFullYear()}，All rights reseved. 关于宸瑞 | 关于智慧护理
        | 联系客服
      </BottomContent>
    </Wrapper>
  );
}

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
  width: 300px;
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
  .TextItem {
    position: relative;
    .NameIcon {
      position: absolute;
      top: 5px;
      left: 9px;
      z-index: 2;
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
  }
  input[type="password"] {
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
    padding-left: 22px;
    text-align: left;
    /* cursor: pointer; */
    label {
      cursor: pointer;
    }
    input[type="checkbox"] {
      display: inline-block;
      position: absolute;
      top: 4px;
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
