import styled from 'styled-components'
import React from 'react'

import { Chart, Tooltip, Axis, Legend, Interval, Coord } from 'viser-react'
export interface Props {
  // chartHeight?: number,
  chartData?: any[],
  title?: string
}

export default function BarChart(props: Props) {
  const { chartData, title } = props

  const label = {
    textStyle: {
      textBaseline: 'top',
      fill: '#333',
      fontSize: 14
    },
    // offset: 0,
    // autoRotate: false,
    // rotate: 76.5,
    formatter: (text: string) => {
      let viewText = text
      if (viewText.length > 8) viewText = `${viewText.substr(0, 7)}...`
      return viewText
    }
    // htmlTemplate: (text: string, item: any, index: number) => {
    //   return `<div style="width:40px;font-size:12px;position:fixed;top:458px;">${text}</div>`
    // }
  } as any

  const tickLine = {
    alignWithLabel: true,
    length: 1
  }

  const labelFormat = {
    textStyle: {
      fill: '#333',
      fontSize: 14
    },
    formatter: (text: string) => {
      return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  } as any

  return <Wrapper>
    <Chart
      forceFit
      height={(chartData || []).length * 30}
      data={chartData || []}
      padding={[40, 20, 20, 160]}
      scale={[{
        dataKey: 'value',
        tickCount: 5,
        alias: title || '标题'
      }]}>
      <Tooltip shared={true} />
      <Axis
        dataKey="type"
        label={label}
        tickLine={tickLine} />
      <Axis dataKey="value" label={labelFormat} tickLine={tickLine} />
      <Legend
        custom
        position="top-right"
        items={[
          {
            value: title || '标题',
            marker: { symbol: 'square', fill: 'rgb(24, 144, 255)', radius: 5, lineWidth: 3 }
          }
        ]}
      />
      <Coord type="rect" direction="LB" />
      <Interval
        position="type*value"
        opacity={1}
      />
    </Chart>
  </Wrapper>
}
const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin: 10px 0;
`