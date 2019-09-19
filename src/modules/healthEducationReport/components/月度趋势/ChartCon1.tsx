import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point, SmoothLine } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {}

export default function ChartCon(props: Props) {
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}
  const sourceData = [
    {
      name: 'London',
      'Jan.': 18.9,
      'Feb.': 28.8,
      'Mar.': 39.3,
      'Apr.': 81.4,
      May: 47,
      'Jun.': 20.3,
      'Jul.': 24,
      'Aug.': 35.6
    },
    {
      name: 'Berlin',
      'Jan.': 12.4,
      'Feb.': 23.2,
      'Mar.': 34.5,
      'Apr.': 99.7,
      May: 52.6,
      'Jun.': 35.5,
      'Jul.': 37.4,
      'Aug.': 42.4
    }
  ]

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
    key: '月份',
    value: '月均降雨量'
  })

  const data = dv.rows
  console.log(data, 'data')
  return (
    <Wrapper>
      <div className='chart-name'>本月新增患者数</div>
      <Chart forceFit height={400} data={data} padding={[20, 20, 50, 20]}>
        <Tooltip />
        <Axis />
        <Legend />
        <Bar position='月份*月均降雨量' color='name' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
        <SmoothLine position='月份*月均降雨量' color='#fdae6b' size={3} />
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
