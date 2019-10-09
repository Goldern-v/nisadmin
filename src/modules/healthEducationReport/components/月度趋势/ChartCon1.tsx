import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point, SmoothLine } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  list: any[]
}

export default function ChartCon(props: Props) {
  let list = [...props.list].sort((a: any, b: any) => Number(a.time.replace('-', '')) - Number(b.time.replace('-', '')))

  let tslList = list.filter((item) => item.itemType == '推送量')
  let ydlList = list.filter((item) => item.itemType == '阅读量')
  let tslObj: any = { name: '推送量' }
  let ydlObj: any = { name: '阅读量' }
  for (let i = 0; i < tslList.length; i++) {
    tslObj[tslList[i].time] = Number(tslList[i].typeValue)
  }
  for (let i = 0; i < tslList.length; i++) {
    ydlObj[ydlList[i].time] = Number(ydlList[i].typeValue)
  }
  const sourceData = [tslObj, ydlObj]

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: tslList.map((item) => item.time),
    key: '月份',
    value: '数量'
  })
  const scale = [
    {
      dataKey: '数量',
      min: 0
    }
  ]

  const data = dv.rows
  return (
    <Wrapper>
      <div className='chart-name'>宣教分析</div>
      {list.length && (
        <Chart forceFit height={400} data={data} padding={[20, 20, 80, 40]} scale={scale}>
          <Tooltip />
          <Axis />
          <Legend />
          <Bar position='月份*数量' color='name' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
          {/* <SmoothLine position='月份*月均降雨量' color='#fdae6b' size={3} /> */}
        </Chart>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 5px 50px;
  .chart-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`
