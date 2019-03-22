import styled from 'styled-components'
import React from 'react'
import store from '@/stores'
import { observer } from 'mobx-react'

function Header () {
  return (
    <Wrapper isExpand={store.appStore.isExpand}>
      <Logo src={require('../images/logo.png')} />
      <SystemName src={require('../images/系统名称.png')} />
      <div style={{ flex: 1 }} />
      <Text>张晓琪</Text>
      <BreakLine />
      <Icon src={require('../images/消息.png')} />
      <Text>消息</Text>
      <BreakLine />
      <Icon src={require('../images/退出.png')} />
      <Text>注销</Text>
    </Wrapper>
  )
}

export default observer(Header)

const Wrapper = styled.div<{ isExpand: '0' | '1' }>`
  height: 46px;
  background: ${(p) => p.theme.$mtc};
  display: flex;
  align-items: center;
  padding: 0 16px 0 12px;
  transition: margin 0.5s;
  ${(p) => p.isExpand === '0' && 'margin-top: -42px'}
`
const Logo = styled.img`
  height: 31px;
  width: 31px;
`
const SystemName = styled.img`
  height: 17px;
  margin-left: 13px;
`
const Text = styled.div`
  font-size: 13px;
  color: #fff;
`

const BreakLine = styled.div`
  height: 14px;
  background: #fff;
  width: 1px;
  margin: 0 10px;
`
const Icon = styled.img`
  margin-right: 8px;
`
