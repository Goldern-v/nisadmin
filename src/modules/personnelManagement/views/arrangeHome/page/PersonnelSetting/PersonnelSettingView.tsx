import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import ToolBar from './components/ToolBar/ToolBar' //头部
import MainBox from './components/MainBox/MainBox' //主页面

export interface Props extends RouteComponentProps {}

export default function PersonnelSettingView() {
  return (
    <Wrapper>
      <ToolBarCon>
        <ToolBar />
      </ToolBarCon>
      <MainBoxCon>
        <MainBox />
      </MainBoxCon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
`
const ToolBarCon = styled.div`
  height: 70px;
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 2;
`
const MainBoxCon = styled.div``
