// import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'

export default function BedSituation () {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 }
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
      <Chart forceFit height={230} data={data} scale={scale}>
        <Tooltip />
        <Axis />
        <Bar position='year*sales' />
      </Chart>
    </div>
  )
}
