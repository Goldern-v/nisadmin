// 护士排班（按班次）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

// import StatisticLeftList from '../../components/StatisticLeftList'
import StatisticHeader from './components/StatisticHeader'
import StatisticMIdHeaderDepartment from '../../common/StatisticMIdHeaderDepartment'
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
      <StatisticHeader />
      <MidMidCon>
        <LeftCon>
          <StatisticMIdHeaderDepartment />
          {/* 对应表 */}
          <TableCon>
            <TableFirst />
          </TableCon>
        </LeftCon>
        <RigthCon>
          <div className='NurseByShiftChooseCon'>
            <NurseByShiftChoose />
          </div>
        </RigthCon>
      </MidMidCon>
    </Con>
  )
}

const Con = styled.div`
  height: calc(100vh - 93px);
  display: flex;
  flex-direction: column;
`
const MidMidCon = styled.div`
  flex: 1;
  height: 0;
  display: flex;
  margin: ${(p) => p.theme.$margin};
  padding: ${(p) => p.theme.$margin};
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const LeftCon = styled.div`
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
`
const RigthCon = styled.div`
  width: 222px;
`
const TableCon = styled.div`
  display: flex;
  /* position: relative; */
  .NurseByShiftChooseCon {
    /* width: 222px; */
    /* position: relative;
    top: -50px;
    right: -15px; */
  }
`
