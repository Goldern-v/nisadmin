import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord} from 'viser-react'

const DataSet = require('@antv/data-set')


export interface Props {

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


  const sourceData = [
    {name:'ceshi',firstPercent: 20, secondPercent: 30, thirdPercent: 50},
  ];

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: ['firstPercent', 'secondPercent', 'thirdPercent'],
    key: 'type',
    value: 'value'
  })
  const data = dv.rows

  console.log(data, 'data')

  return (
    <Wrapper id='chartWrapper'>
      <Chart forceFit height={chartHeight} data={data}>
        {/* 坐标系组件 */}
        <Coord type='rect'/>
        {/* 提示信息组件 鼠标悬停在图表上的某点时展示该点的数据 */}
        <Tooltip/>
        {/* 图例  */}
        <Legend position='top-left'/>

        {/* 坐标值配置 */}
        <Axis dataKey='name' label={{offset: 12}} grid={{align: 'center'}}/>

        {/* 坐标值配置 */}
        <Axis dataKey='value' grid={{align: 'center'}}/>

      </Chart>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

