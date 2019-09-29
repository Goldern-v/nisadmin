import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  label: string
  dataKey: string
  data: any[]
}

export default function ChartCon(props: Props) {
  let { label, dataKey } = props
  const data = props.data
    .filter((item) => item.type == dataKey)
    .map((item) => ({ 科室: item.wardName, 数量: Number(item.typeValue) }))
    .sort((a: any, b: any) => b.数量 - a.数量)
    .filter((item, index) => index < 12)
  const scale = [
    {
      dataKey: '数量',
      min: 0
    }
  ]
  return (
    <Wrapper>
      <div className='chart-name'>{label}</div>
      <Chart forceFit height={400} data={data} scale={scale} padding={[20, 20, 50, 20]}>
        <Tooltip />
        <Axis />
        <Bar position='科室*数量' />
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
