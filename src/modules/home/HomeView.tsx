import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
// import { Select, Button } from 'antd'
import SelectCommon from './common/SelectCommon'
import BedSituation from './components/BedSituation'
import MissionToday from './components/MissionToday'
import MyAudit from './components/MyAudit'
import WardSituation from './components/WardSituation'
import PatientSituation from './components/PatientSituation'
import Notices from './components/Notices'
import PerformChart from './components/PerformChart'
import NurseSituation from './components/NurseSituation/NurseSituation'
import PatientDistribute from './components/PatientDistribute/PatientDistribute'
import emitter from 'src/libs/ev'
import { authStore } from '../../stores/index'
import { observer } from 'mobx-react-lite'
// export interface Props extends RouteComponentProps {}

// const Option = Select.Option

// function handleChange (value: any) {
//   console.log(`selected ${value}`)
// }

export default observer(function HomeView() {
  const [page, setPage] = useState(['本页'])
  useEffect(() => {})
  emitter.removeAllListeners('首页查询')
  emitter.addListener('首页查询', () => {
    setPage(['查询'])
  })

  return (
    <Wrapper>
      <SelectCon>
        <SelectCommon />
      </SelectCon>
      <HomeDetail>
        <HomeDetailItem>
          <BedSituation />
        </HomeDetailItem>
        <HomeDetailItem>
          <MissionToday />
        </HomeDetailItem>
        <HomeDetailItem>
          <MyAudit />
        </HomeDetailItem>
        <HomeDetailItem>
          <WardSituation />
        </HomeDetailItem>
        <HomeDetailItem>
          <PatientSituation />
        </HomeDetailItem>
        <HomeDetailItem>
          <Notices />
        </HomeDetailItem>
        <HomeDetailItem>
          <PerformChart />
        </HomeDetailItem>
        <HomeDetailItem>
          <NurseSituation />
        </HomeDetailItem>
        <HomeDetailItem>
          <PatientDistribute />
        </HomeDetailItem>
      </HomeDetail>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding:20px 10px;
  /* padding: ${(p) => p.theme.$mcp}; */
  /* 全局背景 */
  background-color:  ${(p) => p.theme.$bgBody};
`

const SelectCon = styled.div`
  padding: 0 10px;
`
const HomeDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: red; */
`
const HomeDetailItem = styled.div`
  box-sizing: border-box;
  margin: 0.8416%;
  padding: 0;
  width: 31.65%;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  /* border: 1px solid rgba(161, 175, 179, 1); */
  box-shadow: ${(p) => p.theme.$shadow};
  overflow: hidden;
`
