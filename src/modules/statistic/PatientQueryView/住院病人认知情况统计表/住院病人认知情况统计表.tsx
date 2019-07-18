import styled from 'styled-components'
import React from 'react'
import StatisticHeader from './components/StatisticHeader'
import MidHeader from './components/MidHeader'
import Table from './components/Table'
// import React, { useState, useEffect } from 'react'
export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  return (
    <Con>
      <StatisticHeader />
      <MidCon>
        <MidHeaderCon>
          <MidHeader />
        </MidHeaderCon>
        <TableCon>
          <Table />
        </TableCon>
      </MidCon>
    </Con>
  )
}

const Con = styled.div`
  /* height: calc(100vh - 45px); */
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: simsun, Times New Roman, Georgia, Serif !important;
`
const MidCon = styled.div`
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
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
const MidHeaderCon = styled.div`
  /* height: 80px; */
  width: 100%;
  /* background-color: gray; */
`
const TableCon = styled.div`
  flex: 1;
  height: 0;
  /* background-color: yellow; */
`
