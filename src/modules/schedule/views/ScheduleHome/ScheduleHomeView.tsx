import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import LeftBar from './components/LeftBar/LeftBar'
import ToolBar from './components/ToolBar/ToolBar'
import ScheduleTable from '../components/ScheduleTable/ScheduleTable'

export interface Props extends RouteComponentProps {}

export default function ScheduleHomeView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <LeftBarCon>
        <LeftBar />
      </LeftBarCon>
      <MainCon>
        <ToolBarCon>
          <ToolBar />
        </ToolBarCon>
        <MainContent>
          <ScheduleTable />
        </MainContent>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
`
const LeftBarCon = styled.div`
  height: 100%;
  width: 220px;
  position: fixed;
`
const MainCon = styled.div`
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`

const ToolBarCon = styled.div``

const MainContent = styled.div`
  height: 0;
  flex: 1;
  padding: 10px;
`
