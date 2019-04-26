import styled from 'styled-components'
import React from 'react'
import BaseTabs from 'src/components/BaseTabs'
import AuditsTable1 from './components/AuditsTable1'
import AuditsTable2 from './components/AuditsTable2'
import AuditsTable3 from './components/AuditsTable3'
// import React, { useState, useEffect } from 'react'
const TABS_LIST = [
  {
    title: '基本奖金设置',
    component: <AuditsTable1 />
  },
  {
    title: '绩效奖金设置',
    component: <AuditsTable1 />
  },
  {
    title: '现金项目',
    component: <AuditsTable1 />
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
`
