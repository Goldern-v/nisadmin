import styled from 'styled-components'
import React from 'react'
import store from '@/stores'

import service from 'src/services/api'

import { observer } from 'mobx-react-lite'
import { message } from 'antd'

function Header () {
  // 登陆判断
  const adminNurse = sessionStorage.getItem('adminNurse') || ''
  const authToken = sessionStorage.getItem('authToken') || ''
  const user = JSON.parse(sessionStorage.getItem('user') || '[]')

  if (!adminNurse || !authToken || !user) {
    service.authApiService.logout()
  }

  return (
    <Wrapper isExpand={store.appStore.isExpand}>
      <Logo src={require('../images/logo.png')} />
      <SystemName src={require('../images/logoText.png')} />
      <div style={{ flex: 1 }} />
      <Text>{sessionStorage.getItem('adminNurse')}</Text>
      <BreakLine />
      <span
        style={{ display: 'contents', cursor: 'pointer' }}
        onClick={() => {
          message.success('没有消息')
        }}
      >
        <Icon src={require('../images/消息.png')} />
        <Text>消息</Text>
      </span>
      <BreakLine />
      <span style={{ display: 'contents', cursor: 'pointer' }} onClick={service.authApiService.logout}>
        <Icon src={require('../images/退出.png')} />
        <Text>注销</Text>
      </span>
    </Wrapper>
  )
}

export default observer(Header)

const Wrapper = styled.div<{ isExpand: '0' | '1' }>`
  height: 53px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px 0 12px;
  transition: margin 0.5s;
  ${(p) => p.isExpand === '0' && 'margin-top: -42px'}
`
const Logo = styled.img`
  height: 38px;
  width: 37px;
`
const SystemName = styled.img`
  height: 17px;
  margin-left: 13px;
`
const Text = styled.div`
  font-size: 13px;
  color: #333;
`

const BreakLine = styled.div`
  height: 14px;
  background: #dbe0e4;
  width: 1px;
  margin: 0 10px;
`
const Icon = styled.img`
  margin-right: 8px;
`
