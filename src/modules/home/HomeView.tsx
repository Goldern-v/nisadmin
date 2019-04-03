import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'
import BedSituation from './components/BedSituation'
import MissionToday from './components/MissionToday'
import MyAudit from './components/MyAudit'
import WardSituation from './components/WardSituation'
import PatientSituation from './components/PatientSituation'
import Notices from './components/Notices'
import PerformChart from './components/PerformChart'
import NurseSituation from './components/NurseSituation/NurseSituation'
import PatientDistribute from './components/PatientDistribute/PatientDistribute'

// export interface Props extends RouteComponentProps {}

const Option = Select.Option

function handleChange (value: any) {
  console.log(`selected ${value}`)
}

export default function HomeView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  return (
    <Wrapper>
      <SelectCon>
        <span className='label'>科室：</span>
        <Select defaultValue='普外科护理单元' style={{ width: 200 }} onChange={handleChange}>
          <Option value='骨科护理单元'>骨科护理单元</Option>
          <Option value='普外科护理单元'>普外科护理单元</Option>
          <Option value='泌尿外科护理单元'>泌尿外科护理单元</Option>
          <Option value='产科护理单元'>产科护理单元</Option>
        </Select>
        <Button style={{ marginLeft: 20, marginRight: 10 }}>查询</Button>
        <Button>刷新</Button>
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
}
const Wrapper = styled.div`
  padding: 0 20px;
  /* border: 1px solid red; */
`

const SelectCon = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
`
const HomeDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: red; */
`
const HomeDetailItem = styled.div`
  margin: 4px 0.83% 22px 0.83%;
  padding: 0;
  width: 31.66%;
  height: 290px;
  overflow: hidden;
  /* box-sizing: border-box; */
  border: 1px solid #aeaeae;
`
