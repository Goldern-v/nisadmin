import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord} from 'viser-react'

const DataSet = require('@antv/data-set')


export interface Props {
  dataSource: any[]
}

export default function ChartComponent(props: Props) {
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
    fields: ['firstPercent', 'secondPercent', 'thirdPercent', 'fourthPercent', 'yearPercent'],
    key: 'type',
    value: 'value',
    retains: ['indicatorName']
  })

  const labelMap = {
    firstPercent: '第一季度',
    secondPercent: '第二季度',
    thirdPercent: '第三季度',
    fourthPercent: '第四季度',
    yearPercent: '年度',
  }

  dv.transform({
    type: 'map',
    callback(row: any) {
      row.label = labelMap[row.type]
      return row;
    }
  });

  const data = dv.rows

  return (
    <Wrapper id='chartWrapper'>
      <Chart forceFit height={chartHeight} data={data}>
        {/* 提示信息组件 鼠标悬停在图表上的某点时展示该点的数据 */}
        <Tooltip/>
        {/* 坐标值配置 */}
        <Axis/>
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

