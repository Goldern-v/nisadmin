import styled from 'styled-components'
import React from 'react'
import BaseTabs from 'src/components/BaseTabs'
import BaseBonus from './components/BaseBonus'
import PerformanceBonus from './components/PerformanceBonus'
import CacheItem from './components/CacheItem'
import TableHeader from './common/TableHeader'
// import React, { useState, useEffect } from 'react'
const TABS_LIST = [
  {
    title: '基本奖金设置',
    component: <BaseBonus />
  },
  {
    title: '绩效奖金设置',
    component: <PerformanceBonus />
  },
  {
    title: '现金项目',
    component: <CacheItem />
  }
]
export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  return (
    // <div>
    <Con>
      <TableHeader />
      <TableCon>
        <BaseTabs config={TABS_LIST} />
      </TableCon>
    </Con>
    // </div>
  )
}

const Con = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* .hFcINA {
    border: none;
  } */
`
const TableCon = styled.div`
  overflow-y: auto;
  flex: 1;
  height: 0;
  margin: 15px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
