import styled from 'styled-components'
import React from 'react'
import BaseTabs from 'src/components/BaseTabs'
import BaseBonus from './components/BaseBonus'
import PerformanceBonus from './components/PerformanceBonus'
import CacheItem from './components/CacheItem'
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
  //   console.log(count, setCount)
  // })
  return (
    <div>
      <Con>
        <BaseTabs config={TABS_LIST} />
      </Con>
    </div>
  )
}

const Con = styled.div`
  width: 100%;
  height: 100%;
  .hFcINA {
    border: none;
  }
`
