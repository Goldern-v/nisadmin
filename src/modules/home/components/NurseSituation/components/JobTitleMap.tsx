import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
export interface Props {
  titleByGet: string
}
export default function BedSituation (props: Props) {
  const data = [
    { year: '护士', sales: 38 },
    { year: '护师', sales: 89 },
    { year: '主管护师', sales: 46 },
    { year: '副主任护师', sales: 38 },
    { year: '主任护师', sales: 16 }
  ]
  const scale = [
    {
      dataKey: 'sales',
      tickInterval: 20
    }
  ]
  const [count, setCount] = useState(0)
  useEffect(() => {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      item: props.titleByGet
    }
    HomeApi.indexInfo(postData).then((res) => {
      console.log('====indexInfo:', res)
    })
    console.log(count, setCount)
  }, [])
  return (
    <div>
      <ChartCon>
        <Chart forceFit height={300} data={data} scale={scale}>
          <Tooltip />
          <Axis />
          <Bar position='year*sales' />
        </Chart>
      </ChartCon>
    </div>
  )
}

const ChartCon = styled.div`
  canvas {
    width: 100% !important;
    margin: -15px 0 0 -46px;
    /* width: 400px !important; */
  }
`
