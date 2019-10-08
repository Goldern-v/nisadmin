import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point, SmoothLine, Coord } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  label: string
  dataKey: string
  list: any[]
}

export default function ChartCon(props: Props) {
  let { label, dataKey } = props
  let list = props.list.filter((item, index) => item.type == dataKey).filter((item, index) => index < 10)
  const sourceData = list
    .map((item) => ({ 姓名: item.empName, 数量: Number(item.typeValue) }))
    .sort((a: any, b: any) => {
      return a.数量 - b.数量
    })

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'sort'
  })
  const data = dv.rows
  while (data.length < 10) {
    data.push({
      姓名: '',
      数量: 0
    })
  }
  return (
    <Wrapper>
      <div className='chart-name'>{label}</div>
      <Chart forceFit height={400} data={data} padding={[20, 20, 50, 100]}>
        <Coord type='rect' direction='LB' />
        <Tooltip />
        <Axis dataKey='姓名' label={{ offset: 12 }} />
        <Bar position='姓名*数量' />
      </Chart>
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
