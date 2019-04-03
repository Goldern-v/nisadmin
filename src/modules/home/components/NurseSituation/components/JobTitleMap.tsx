import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'

export default function BedSituation () {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 120 },
    { year: '1958 年', sales: 48 }
  ]
  const scale = [
    {
      dataKey: 'sales',
      tickInterval: 20
    }
  ]
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
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
    margin: 0 0 0 -46px;
    width: 400px !important;
  }
`
