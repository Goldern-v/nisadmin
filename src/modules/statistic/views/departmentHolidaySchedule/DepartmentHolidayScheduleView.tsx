// 科室节假日
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableFirst from './components/TableFirst'
import { Button, Radio } from 'antd'
import StatisticHeader from './components/StatisticHeader'
import StatisticMIdHeaderDepartment from '../../common/StatisticMIdHeaderDepartment'
import TableModel from '../../common/TableModel'
// import TableDate from './components/TableData'
// const ButtonGroup = Button.Group

// import SelectMonth from '../../common/SelectMonth'  //月份选择器
export default function StatisticView() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    
  })
  return (
    <Con>
      <StatisticHeader />
      <TableCon>
        <StatisticMIdHeaderDepartment />
        {/* 科室节假日排班表*/}
        <TableFirst />
      </TableCon>
    </Con>
  )
}

const Con = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  /* .ant-btn {
    height: 30px;
    background: rgba(241, 244, 246, 1);
    border-radius: 3px;
    border: 1px solid rgba(192, 203, 206, 1);
  } */
  .buttonCon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`
const TableCon = styled.div`
  flex: 1;
  height: 0;
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
