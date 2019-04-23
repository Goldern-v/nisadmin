// 护士白班统计（按月份)
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableFirst from './components/TableFirst'
import { Button } from 'antd'
import StatisticMIdHeader from '../../common/StatisticMIdHeader'
const ButtonGroup = Button.Group

// import SelectMonth from '../../common/SelectMonth'  //月份选择器
export default function StatisticView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <StatisticMIdHeader />
      <div className='buttonCon'>
        <ButtonGroup>
          <Button value='按时数'>按时数</Button>
          <Button value='按次数'>按次数</Button>
        </ButtonGroup>
      </div>
      {/* 护士白班统计（按月份) */}
      <TableFirst />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  position: relative;
  /* display: flex; */
  overflow: hidden;
  .ant-btn {
    height: 30px;
    background: rgba(241, 244, 246, 1);
    border-radius: 3px;
    border: 1px solid rgba(192, 203, 206, 1);
  }
  .buttonCon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`
