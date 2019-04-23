// 护士排班表
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import StatisticMIdHeader from '../../common/StatisticMIdHeader'
// import TableModel from '../../common/TableModel'
import NurseSchedulingView from './components/TableFirst'
export default function StatisticView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <StatisticMIdHeader />
      {/* 护士排班表 */}
      {/* <TableModel /> */}
      <NurseSchedulingView />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  overflow: hidden;
`
