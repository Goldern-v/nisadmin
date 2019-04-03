import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import ToolBar from './components/ToolBar/ToolBar'
import MainBox from './components/MainBox/MainBox'

export interface Props extends RouteComponentProps {}

export default function ShiftSettingView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
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
  /* margin-left: 220px; */
  display: block !important;
  /* flex-direction: column; */
  height: 100%;
  background: #fff;
  /* border: 1px solid red; */
`

const ToolBarCon = styled.div`
  height: 60px;
  width: 100%;
  background: #fff;
  /* border-bottom: 1px solid rgb(244, 248, 251); */
`
