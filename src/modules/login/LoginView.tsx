// import * as React from 'react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'

import { authApiService } from '@/services'

export interface Props extends RouteComponentProps {}

export default function LoginView () {
  const [count, setCount ] = useState(0)
  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  useEffect(() => {
    console.log(count, setCount)
  })

  function checkClick () {
    // e.target.style.color = '#3FB593'
  }
  function login () {
    authApiService.login(username, password)
  }
  function handleKeyUp (e: any) {
    if (e.keyCode === 13) {
      login()
    }
  }
  return (
    <Wrapper>
      <BgImg>
        <BoxInput onKeyUp={(e) => { handleKeyUp(e) }}>
          <img src={require('./img/logo.png')} alt='logo' className='BoxLogin' />
          <h1 className='Title'>护理质量管理系统</h1>
          <div className='TextItem'>
            <div className='iconfont NameIcon'>&#xe648;</div>
            <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='用户名' />
          </div>

          <div className='TextItem'>
            <div className='iconfont NameIcon'>&#xe6cb;</div>
            <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='密码' />
          </div>

          <div className='CheckItem' onClick={checkClick}>
            <input type='checkbox' id='rememberCheckbox' />
            <label htmlFor='rememberCheckbox'>记住账号</label>
          </div>
          <button onClick={login} >登陆系统</button>
        </BoxInput>
      </BgImg>
      <BottomContent>
        广州宸瑞软件科技有限公司 http://www.cr-health.com 版权所有©2013-{new Date().getFullYear()}，All rights reseved. 关于宸瑞 |
        关于智慧护理 | 联系客服
      </BottomContent>
    </Wrapper>
  )
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
`
const BgImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 975px;
  height: 414px;
  background-image: url(http://192.168.1.20:8764/crNisManage/static/img/background.12db47e.png);
  background-size: 100% 100%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`
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
`
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
  input[type='text'],
  input[type='password'] {
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
  input[type='text']:hover,
  input[type='password']:hover {
    box-shadow: 0 0 0 1px #4fb390;
  }
  input[type='text']:focus,
  input[type='password']:focus {
    z-index: 1;
    box-shadow: 0 0 0 1px #4fb390;
  }
  .CheckItem {
    position: relative;
    margin-top: 12px;
    padding-left: 22px;
    text-align: left;
    cursor: pointer;
    input[type='checkbox'] {
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
    input[type='checkbox']:hover {
      background-color: #15a57b;
      border: 1px solid #15a57b;
    }
    input[type='checkbox']:after {
      box-sizing: content-box;
      content: '';
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
  button {
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
  }
`
