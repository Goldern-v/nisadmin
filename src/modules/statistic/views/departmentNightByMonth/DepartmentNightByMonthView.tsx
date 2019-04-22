// 科室夜班统计（按月份）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableModel from '../../common/TableModel'

export default function StatisticView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      科室夜班统计（按月份）
      <TableModel />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  display: flex;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
