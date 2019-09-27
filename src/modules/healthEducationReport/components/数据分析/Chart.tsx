import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react'
import moment from 'moment'
const DataSet = require('@antv/data-set')

export interface Props {
  list: DeptItem[]
}

export default function ChartCon(props: Props) {
  let { list } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}
  let copyList = [...list].reverse()
  const sourceData = copyList.map((item: any) => {
    return {
      日期: moment(
        item.showDate
          .replace('年', '-')
          .replace('月', '-')
          .replace('日', '')
      ).format('MM-DD'),
      推送量: Number(item.push),
      阅读量: Number(item.reading),
      推送课程数: Number(item.pushClass),
      在院患者数: Number(item.inPatients),
      推送人数: Number(item.pushNum),
      阅读人数: Number(item.readingNum)
    }
  })

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: ['推送量', '阅读量', '推送课程数', '在院患者数', '推送人数', '阅读人数'],
    key: '类型',
    value: '数量'
  })
  const data = dv.rows

  const scale = [
    {
      dataKey: '数量',
      min: 0
      // max: 100000
    }
  ]

  return (
    <Wrapper>
      <Chart forceFit height={400} data={data} scale={scale} padding={[50, 20, 50, 20]}>
        <Tooltip />
        <Axis />
        <Legend position='top' />
        <Line position='日期*数量' color='类型' />
        <Point position='日期*数量' color='类型' size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape='circle' />
      </Chart>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 5px 50px;
`
