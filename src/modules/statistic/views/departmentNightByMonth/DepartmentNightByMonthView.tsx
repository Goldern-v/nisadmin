// 科室夜班统计（按月份）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableFirst from './components/TableFirst'
import { Button, Radio } from 'antd'
import StatisticMIdHeader from '../../common/StatisticMIdHeader'
import TableModel from '../../common/TableModel'
// import TableDate from './components/TableData'
// const ButtonGroup = Button.Group

// import SelectMonth from '../../common/SelectMonth'  //月份选择器
export default function StatisticView () {
  const [showType, setShowType] = useState('按时数')
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <StatisticMIdHeader />
      <div className='buttonCon'>
        <Radio.Group value={showType} buttonStyle='solid' onChange={(e: any) => setShowType(e.target.value)}>
          <Radio.Button value='按时数'>按时数</Radio.Button>
          <Radio.Button value='按次数'>按次数</Radio.Button>
        </Radio.Group>{' '}
      </div>
      {/* 护士夜班统计（按月份) */}
      {<TableFirst showType={showType} />}
      {/* {showType === '按时数' && (
        <TableModel dataSource={TableData.dataSource} columns={TableData.columns} showType={showType} />
      )}
      {showType === '按次数' && <TableSecond />} */}
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  position: relative;
  /* display: flex; */
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
