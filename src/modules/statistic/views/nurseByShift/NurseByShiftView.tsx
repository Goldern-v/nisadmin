// 护士排班（按班次）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

// import StatisticLeftList from '../../components/StatisticLeftList'
import StatisticHeader from '../../components/StatisticHeader'
import StatisticMIdHeader from '../../common/StatisticMIdHeader'
// import NurseSchedule from './components/NurseSchedule'
import NurseByShiftChoose from './components/NurseByShiftChoose'
import TableFirst from './components/TableFirst'

export default function StatisticView () {
  const [count, setCount] = useState(0)
  const [shiftClass, setShiftClass] = useState(new Array())
  useEffect(() => {
    console.log(count, setCount, shiftClass)
    // console.log(3333)
    // console.log(shiftClass)
  })
  // const getShiftClass = (shiftclass: any) => {
  //   setShiftClass(shiftClass)
  // }
  return (
    <Con>
      {/* 对应表 */}
      <StatisticMIdHeader />
      <MidMidCon>
        <TableCon>
          <TableFirst />
        </TableCon>
        <div className='NurseByShiftChooseCon'>
          <NurseByShiftChoose />
        </div>
      </MidMidCon>
    </Con>
  )
}

const Con = styled.div``
const MidMidCon = styled.div`
  width: 100%;
  display: flex;
  .NurseByShiftChooseCon {
    width: 222px;
    position: relative;
    top: -52px;
    right: 0;
  }
`
const TableCon = styled.div`
  flex: 1;
  width: 0;
`
