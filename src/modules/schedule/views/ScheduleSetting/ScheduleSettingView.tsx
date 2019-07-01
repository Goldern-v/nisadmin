import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'

import MainBox from './components/MainBox/MainBox'
import ToolBar from './components/ToolBar/ToolBar'

export interface Props extends RouteComponentProps {}

export default function ScheduleSettingView() {
  const [fullPage, setFullPage] = useState(false)
  return (
    <Wrapper fullPage={fullPage}>
      <ToolBarCon>
        <ToolBar fullPage={fullPage} setFullPage={setFullPage} />
      </ToolBarCon>
      <MainBoxCon>
        <MainBox fullPage={fullPage} />
      </MainBoxCon>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ fullPage: boolean }>`
  height: 100%;
  ${(p) =>
    p.fullPage &&
    ` position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100
    `}
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
  height: 50px;
  width: 100%;
  background: #fff;
  /* margin-top: -10px; */
  /* border-bottom: 1px solid rgb(244, 248, 251); */
`
