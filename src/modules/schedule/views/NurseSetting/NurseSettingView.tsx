import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import ToolBar from './components/ToolBar/ToolBar'
import MainBox from './components/MainBox/MainBox'

export interface Props extends RouteComponentProps {}

export default function NuserSettingView () {
  
  useEffect(() => {
    
  })
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
`

const MainBoxCon = styled.div`

  background: #fff;
  padding-bottom: 50px;
  margin-bottom: -50px;
  overflow: hidden;
  /* border: 1px solid red; */
`

const ToolBarCon = styled.div`
  height: 30px;
  width: 100%;
  background: #fff;
  /* border-bottom: 1px solid rgb(244, 248, 251); */
`
