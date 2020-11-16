import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord} from 'viser-react'

const DataSet = require('@antv/data-set')

const labelMap: any = {
  firstPercent: '第一季度',
  secondPercent: '第二季度',
  thirdPercent: '第三季度',
  fourthPercent: '第四季度',
}

const transNum = (data: string) => {
  if (data.includes('%')) {
    return Number(data.split('%')[0]) / 100
  } else {
    return Number(data.split('%')[0])
  }
}

export default function ChartComponent(props: { dataSource: any[] }) {
  const [chartHeight, setChartHeight] = useState(500)
  const onresize = () => {
  }

  useEffect(() => {
    window.addEventListener('resize', onresize)

    return () => {
      window.removeEventListener('resize', onresize)
    }
  })

  const dv = new DataSet.View().source(props.dataSource);
  dv.transform({
    type: 'fold',
    fields: ['firstPercent', 'secondPercent', 'thirdPercent', 'fourthPercent'],
    key: 'type',
    value: 'value',
    retains: ['indicatorName']
  })

  dv.transform({
    type: 'map',
    callback(row: any) {
      row.value = transNum(row.value)
      row.label = labelMap[row.type]
      return row;
    }
  });

  const data = dv.rows
  console.log(data, 'data')

  const label: any = {
    formatter: (value: string) => {
      return value + '%'
    },
    // htmlTemplate: (text: any) => {
    //   return '<div style="background:red">123</div>'
    // }
  }

  return (
    <Wrapper id='chartWrapper'>
      <Chart forceFit height={chartHeight} data={data}>
        {/* 提示信息组件 鼠标悬停在图表上的某点时展示该点的数据 */}
        <Tooltip/>
        {/* 坐标值配置 */}
        <Axis label={label}/>
        <Axis label={label}/>
        {/* 图例  */}
        <Legend position='top-left'/>

        {/* 线 */}
        <Line position="label*value" color="indicatorName"/>

        {/* 点 */}
        <Point position="label*value" color="indicatorName" shape="circle"/>
      </Chart>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

