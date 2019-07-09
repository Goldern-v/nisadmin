import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
//引入组件
import ToolBar from './components/ToolBar/ToolBar'
import MainBox from './components/MainBox/MainBox'

export interface Props extends RouteComponentProps {}

export default function PersonnelSettingView () {
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
  width:100%;
  background:#fff;
`
const ToolBarCon = styled.div`
  height: 30px;
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 2;
`
const MainBoxCon = styled.div`
`
