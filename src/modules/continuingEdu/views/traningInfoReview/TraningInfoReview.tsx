import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
} from './components/common'
import BaseInfoPannel from './components/BaseInfoPannel'
import AuditInfoPannel from './components/AuditInfoPannel'

export interface Props { }

export default observer(function TraningInfoReview() {
  const { history } = appStore
  const title = '2019年新职工培训教学计划'

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> > </span>
        <Link to="/home">一级目录</Link>
        <span> > </span>
        <Link to="/home">二级目录</Link>
        <span> > 查看结果</span>
      </NavCon>
      <MainTitle>{title}</MainTitle>
      <SubContent>
        <span className="label"> 状态:</span>
        <span className="content" style={{ color: 'red' }}>回退</span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <AuditInfoPannel />
      <BaseInfoPannel />
    </MainPannel>
  </Wrapper>
})