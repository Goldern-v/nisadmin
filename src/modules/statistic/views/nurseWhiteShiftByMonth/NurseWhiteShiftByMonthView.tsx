// 护士白班统计（按月份)
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableFirst from './components/TableFirst'

export default function StatisticView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      {/* 护士白班统计（按月份) */}
      <TableFirst />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  display: flex;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
