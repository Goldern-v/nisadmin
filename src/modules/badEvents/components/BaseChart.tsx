import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
const DataSet = require('@antv/data-set')
import { Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point } from 'viser-react'
export interface Props {
  dataSource: any[]
  keys: string[]
  name: string
  lineKey: string
  dictionary?: any
}

export default function BaseChart(props: Props) {
  let sourceData = []

  for (let i = 0; i < props.keys.length; i++) {
    let obj: any = {}
    for (let j = 0; j < props.dataSource.length; j++) {
      // console.log(props.dataSource[j], 'props.dataSource[j][props.name]')
      obj[props.dataSource[j][props.name]] = props.dataSource[j][props.keys[i]]
    }
    sourceData.push({
      name: props.keys[i],
      ...obj
    })
  }

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: props.dataSource.map((item: any) => item[props.name]),
    key: 'key',
    value: 'value'
  })
  let data = dv.rows
  data.map((item: any) => {
    item[props.lineKey] = props.dataSource.find((o) => o[props.name] == item.key)[props.lineKey]
    return item
  })
  data = data.filter((item: any) => item.key !== '合计')

  /** 字典项转换 */

  let dataString = JSON.stringify(data)
  for (let key in props.dictionary) {
    dataString = dataString.replace(new RegExp(key, 'g'), props.dictionary[key])
  }
  data = JSON.parse(dataString)
  return (
    <Wrapper>
      <Chart forceFit height={350} data={data} padding={[50, 50, 90]}>
        <Tooltip />
        <Axis />
        {/* <Legend /> */}
        <Legend
          custom
          allowAllCanceled
          position='top-left'
          items={[
            {
              value: props.dictionary.actualOpenBeds,
              marker: { symbol: 'square', stroke: '#fdae6b', radius: 5, lineWidth: 3 }
            }
          ]}
          onClick={(ev, chart) => {
            const item = ev.item
            const value = item.value
            const checked = ev.checked
            const geoms = chart.getAllGeoms()
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i]
              if (geom.getYScale().field === value) {
                if (checked) {
                  geom.show()
                } else {
                  geom.hide()
                }
              }
            }
          }}
        />
        <Bar position='key*value' color='name' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
        {props.lineKey && <Line position={'key*' + props.lineKey} color='#fdae6b' size={3} />}
        {/* {props.lineKey && <Point shape='circle' position={'key*' + props.lineKey} color='#fdae6b' size={3} />} */}
      </Chart>
      {props.lineKey}
      <LegendLine>{props.lineKey}</LegendLine>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

const LegendLine = styled.div`
  position: absolute;
  left: 500px;
  top: 10px;
  font-size: 12px;
  &:after {
    content: '';
    width: 12px;
    height: 4px;
    background: #fdae6b;
    position: absolute;
    left: -16px;
    top: 7px;
  }
`
