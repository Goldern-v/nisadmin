import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'

import { authStore } from 'src/stores/index'
import HomeViewModel from 'src/modules/home/HomeViewModel.ts'
import { observer } from 'mobx-react-lite'
import { any } from 'prop-types'

export interface Props {
  userTotal: number
}
export default observer(function BedSituation (props: Props) {
  const [byIndexInfo, setByIndexInfo] = useState({
    // 副护士长: 0,
    // 护士长: 0,
    // 护理组长: 0,
    // 护理部主任: 0,
    // 护理部副主任: 0,
    // 教学小组组长: 0,
    // 教学秘书: 0,
    // 科护士长: 0
  })
  // const [jobArr, setjobArr] = useState([])
  const scale = [
    {
      dataKey: 'sales',
      tickInterval: 20
    }
  ]
  let data = [].map((item: string) => {
    // if (item !== 'userTotal') {
    //   console.log('HomeViewModel.jobArrHomeViewModel.j', HomeViewModel.jobArr)
    //   // let cachedata = 30
    //   // if (props.userTotal !== 0) {
    //   //   // cachedata = parseInt((parseInt(item, 10) / props.userTotal).toFixed(4), 10) * 100
    //   // }
    //   // return {
    //   //   item: cachedata
    //   // }
    // }
  })

  useEffect(() => {
    // if (HomeViewModel.NurseSituationData.userTotal) {
    //   // setByIndexInfo(HomeViewModel.NurseSituationData)
    // }
    // console.log('fffffff', HomeViewModel.NurseSituationData)
  }, [authStore.selectedDeptCode])

  return (
    <div>
      <ChartCon>
        {data}
        <Chart forceFit height={300} data={data} scale={scale}>
          <Tooltip />
          <Axis />
          <Bar position='year*sales' />
        </Chart>
      </ChartCon>
    </div>
  )
})

const ChartCon = styled.div`
  canvas {
    width: 100% !important;
    margin: -15px 0 0 -46px;
    /* width: 400px !important; */
  }
`
