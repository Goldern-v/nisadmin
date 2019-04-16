import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import StatisticLeftList from './components/StatisticLeftList'
import StatisticHeader from './components/StatisticHeader'
import StatisticMIdHeader from './common/StatisticMIdHeader'
// import NurseSchedule from './components/NurseSchedule'
import NurseScheduleByShift from './components/NurseScheduleByShift'

export default function StatisticView () {
  const [count, setCount] = useState(0)
  // const [shiftClass, setShiftClass] = useState([])
  useEffect(() => {
    console.log(count, setCount)
    // console.log(3333)
    // console.log(shiftClass)
  })
  // function getShiftClass (shiftClass: any) {
  //   setShiftClass(shiftClass)
  // }
  return (
    <Con>
      <StatisticLeftList />
      <StatisticRightCon>
        <StatisticHeader />
        <StatisticMid>
          <StatisticMIdHeader />
          {/* 对应表 */}
          {/* <NurseSchedule /> */}
          <NurseScheduleByShift
          // postShiftClass={(shiftClass: any) => {
          //   getShiftClass
          // }}
          />
        </StatisticMid>
      </StatisticRightCon>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  display: flex;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
const StatisticRightCon = styled.div`
  flex: 1;
`
const StatisticMid = styled.div`
  margin: 14px;
  padding: 18px 10px;
  height: 712px;
  /* height: 330px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(161, 175, 179, 1);
  overflow-y: auto;
`
