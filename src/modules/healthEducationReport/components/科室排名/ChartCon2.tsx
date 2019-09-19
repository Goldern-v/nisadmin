import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Bar, Legend, Line, Point } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {}

export default function ChartCon(props: Props) {
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}
  const data = [
    { 科室: '1951 年', 数量: 38 },
    { 科室: '1952 年', 数量: 52 },
    { 科室: '1956 年', 数量: 61 },
    { 科室: '1957 年', 数量: 145 },
    { 科室: '1958 年', 数量: 48 },
    { 科室: '1959 年', 数量: 38 },

    { 科室: '1969 年', 数量: 38 },
    { 科室: '1970 年', 数量: 38 },
    { 科室: '1971 年', 数量: 38 },
    { 科室: '1972 年', 数量: 52 },
    { 科室: '1973 年', 数量: 61 },
    { 科室: '1974 年', 数量: 145 },
    { 科室: '1975 年', 数量: 48 },
    { 科室: '1976 年', 数量: 38 },
    { 科室: '1977 年', 数量: 38 },
    { 科室: '1978 年', 数量: 38 },
    { 科室: '1979 年', 数量: 38 },

    { 科室: '2000 年', 数量: 38 }
  ]
  const scale = [
    {
      dataKey: '数量',
      tickInterval: 20
    }
  ]
  return (
    <Wrapper>
      <div className='chart-name'>本月新增患者数</div>
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
