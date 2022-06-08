// import * as React from 'react'
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import loginViewModel from "./LoginViewModel";
import { to } from 'src/libs/fns'
import service from "src/services/api";
import { appStore, scheduleStore } from "src/stores";
import { Button, Icon } from "src/vendors/antd";
import { AutoComplete, message, Input, Tooltip } from "antd";
import { withRouter } from 'react-router-dom'
import { Rules } from 'src/components/Form/interfaces'
import { compileStr, uncompileStr } from 'src/utils/encode/encode'
import qs from "qs";
import md5 from 'js-md5';
import Form from 'src/components/Form'
export interface Props extends RouteComponentProps { }

export default withRouter(function ResetPasswordView(props: Props) {

  const { location, history } = props;
  const [loginLoading, setLoginLoading] = useState(false);
  const [reg, setReg]: any = useState();
  const [isNewPswd, setIsNewPswd] = useState<boolean>(false);
  const [isRePswd, setIsrePswd] = useState<boolean>(false);
  const [isEmpNo, setIsEmpNo] = useState<boolean>(false);
  const [isOldPswd, setIsOldPswd] = useState<boolean>(false);
  const [repassword, setRepassword] = useState<string>('');
  const [isErrorNew, setIsErrorNew] = useState<boolean>(false)
  const [isErrorRe, setIsErrorRe] = useState<boolean>(false)
  let refForm = React.createRef<Form>()
  const rules: Rules = {
    // empNo: (val) => {
    //   return !!val || '请输入用户名或工号'
    // },
    // oldPswd: (val) => !!val || '请输入原密码',
    // newPswd: (val) => {
    //   if (!val) return '请输入新密码'
    //   // 不进行正则
    //   if (!reg.flag) return true
    //   const patt = eval(`/${reg.rule}/`)
    //   const flag = patt.test(val);
    //   return flag || reg.ruleMsg

    // },
    // rePswd: (val) => {
    //   if (!val) return ''
    //   if (!refForm.current) return
    //   let newPassword = refForm.current.getField('newPswd')
    //   if (val.trim() != newPassword.trim()) {
    //     return ''
    //   }
    // }
  }
  useEffect(() => {
    if (['sdlj'].includes(appStore.HOSPITAL_ID)) {
      setReg({
        flag: true,
        // rule: "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z~!@#$%^&*._?]+$)(?![a-z0-9]+$)(?![a-z~!@#$%^&*._?]+$)(?![0-9~!@#$%^&*._?]+$)[a-zA-Z0-9~!@#$%^&*._?]{8,}$",
        rule: "^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}$",
        ruleMsg: "密码长度至少8位且必须包含大小写字母、特殊符号、数字"
      })
    } else {
      getPasswordRule()
    }
  }, [])
  //获取正则
  const getPasswordRule = () => {
    service.authApiService.passwordRule().then((res: any) => {
      if (res.code == 200) {
        setReg(res.data)
      }
    })
  }
  const resetPassword = async () => {
    if (!refForm.current) return
    // 获取表单值
    let [err, value] = await to(refForm.current.validateFields())
    setIsEmpNo(!value.empNo)
    setIsOldPswd(!value.oldPswd)
    setIsErrorNew(!isNewPswd)
    setIsErrorRe(!isRePswd)
    if (!(isNewPswd && isRePswd) || !value.empNo || !value.oldPswd) return
    setLoginLoading(true)
    service.authApiService.updatePassword(value).then((res: any) => {
      if (res.code == 200) {
        message.success(res.desc)
        setTimeout(() => {
          history.replace('/login')
        }, 1000)
      }
      setLoginLoading(false)
    }).catch((err: any) => {
      console.log(err)
      setLoginLoading(false)
    })
  }
  const changePassword = (type: any) => {
    if (!refForm.current) return
    refForm.current.cleanErrors()
    let psd = refForm.current.getField(type)
    let rePswd = refForm.current.getField('rePswd') || ''
    let newPswd = refForm.current.getField('newPswd') || ''
    let empNo = refForm.current.getField('empNo')
    let oldPswd = refForm.current.getField('oldPswd')
    // if (!reg?.flag) return true
    const patt = eval(`/${reg?.rule}/`)
    const flag = reg?.flag ? patt.test(psd) : !reg?.flag;
    if (type == "newPswd") {
      setIsNewPswd(flag)
      setIsErrorNew(false)
      setIsrePswd(rePswd.trim() == newPswd.trim() && flag)
    }
    if (type == "rePswd") {
      setIsrePswd(rePswd.trim() == newPswd.trim() && flag)
      setRepassword(psd)
      setIsErrorRe(false)
    }
    if (type == 'empNo') {
      setIsEmpNo(!empNo)
    }
    if (type == 'oldPswd') {
      setIsOldPswd(!oldPswd)
    }
  }
  return (
    <Wrapper
      style={{
        display: 'block'
      }}>
      <BgImg>
        <BoxInput
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
          </div>
          <Form ref={refForm} rules={rules} onChange={changePassword}>
            <Form.Field
              label="用  户  名:"
              name="empNo"
            >
              <Input placeholder="请输入用户名" className={isEmpNo ? 'error' : ''} />
            </Form.Field>
            <Form.Field
              label="原  密  码:"
              name="oldPswd"
            >
              <Input type="password" placeholder="请输入原密码" className={isOldPswd ? 'error' : ''} />
            </Form.Field>
            <div style={{ 'position': 'relative' }}>
              <Form.Field
                label="新  密  码:"
                name="newPswd"
              >
                <Input type="password" placeholder="请输入新密码" className={isErrorNew ? 'error' : ''} />
              </Form.Field>
              <Tooltip title={reg?.ruleMsg}>
                {isNewPswd ? <img src={require("./img/psd_success.png")} alt="" className='password-icon' /> :
                  <img src={require("./img/psd.png")} alt="" className='password-icon' />
                }
              </Tooltip>
            </div>
            <div style={{ 'position': 'relative' }}>
              <Form.Field
                label="重复新密码:"
                name="rePswd"
              >
                <Input type="password" placeholder="请输入确认密码" className={isErrorRe ? 'error' : ''} />
              </Form.Field>
              <Tooltip title={reg?.ruleMsg}>
                {!repassword ? <img src={require("./img/psd.png")} alt="" className='password-icon' /> :
                  isRePswd ?
                    <img src={require("./img/psd_success.png")} alt="" className='password-icon' /> :
                    <img src={require("./img/repsd.png")} alt="" className='password-icon' />
                }
              </Tooltip>
            </div>
          </Form>
          <div className="login" onClick={() => {
            history.push('/login')
          }}>
            <span>返回登陆</span>
          </div>
          <Button
            type="primary"
            onClick={() => resetPassword()}
            block
            loading={loginLoading}
            style={{ marginTop: 20, height: 36 }}
          >
            保存
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
  right: 25px;
  padding: 22px 35px 32px 20px;
  background: #fafcff;
  border-radius: 2px;
  width: 370px;
  /* text-align: center; */
  .Top {
    margin-bottom: 20px;
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
  .label {
    width: 80px;
    margin-right: 5px;
  }
  .clLCKb {
    position: unset;
  }
  .error {
    border: 1px solid red !important;
  }
  .password-icon {
    position: absolute;
    top:10px;
    right:-25px;
    font-size: 16px;
    width: 18px;
  }
  .login {
    margin-top: -10px;
    text-align: right;
    cursor: pointer;
  }
  input[type="text"] {
    position: relative;
    padding-left: 10px;
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
    padding-left: 10px;
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
`;
