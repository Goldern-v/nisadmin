// { name: '科室排班统计（按班次）', path: '/statistic/科室排班统计（按班次）', component: 'DepartmentByShiftView' },
// 科室排班统计（按班次）
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
      {/* 科室排班统计（按班次） */}
      <TableFirst />
      <div className='NurseByShiftChooseCon'>
        <NurseByShiftChoose />
      </div>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  height: 629px;
  /* display: flex; */
  background: rgba(248, 248, 248, 1);
  position: relative;
  overflow: hidden;
  .NurseByShiftChooseCon {
    position: absolute;
    top: 0;
    right: 0;
  }
`
const StatisticRightCon = styled.div`
  flex: 1;
`
