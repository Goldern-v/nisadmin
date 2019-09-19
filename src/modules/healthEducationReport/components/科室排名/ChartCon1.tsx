import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point, SmoothLine, Coord } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {}

export default function ChartCon(props: Props) {
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}
  const sourceData = [
    { country: '中国', population: 131744 },
    { country: '印度', population: 104970 },
    { country: '美国', population: 29034 },
    { country: '印尼', population: 23489 },
    { country: '巴西', population: 18203 }
  ]

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'sort',
    callback(a: any, b: any) {
      return a.population - b.population > 0
    }
  })
  const data = dv.rows
  return (
    <Wrapper>
      <div className='chart-name'>推送量</div>
      <Chart forceFit height={400} data={data} padding={[20, 20, 50, 20]}>
        <Coord type='rect' direction='LB' />
        <Tooltip />
        <Axis dataKey='country' label={{ offset: 12 }} />
        <Bar position='country*population' />
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
