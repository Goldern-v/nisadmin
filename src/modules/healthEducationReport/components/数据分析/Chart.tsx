import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  list: DeptItem[]
}

export default function ChartCon(props: Props) {
  let { list } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  const sourceData = [
    {
      日期: 'Jan',
      推送量: 7.0,
      阅读量: 3.9,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Feb',
      推送量: 6.9,
      阅读量: 4.2,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Mar',
      推送量: 9.5,
      阅读量: 5.7,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Apr',
      推送量: 14.5,
      阅读量: 8.5,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'May',
      推送量: 18.4,
      阅读量: 11.9,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Jun',
      推送量: 21.5,
      阅读量: 15.2,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Jul',
      推送量: 25.2,
      阅读量: 17.0,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Aug',
      推送量: 26.5,
      阅读量: 16.6,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Sep',
      推送量: 23.3,
      阅读量: 14.2,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Oct',
      推送量: 18.3,
      阅读量: 10.3,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Nov',
      推送量: 13.9,
      阅读量: 6.6,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    },
    {
      日期: 'Dec',
      推送量: 9.6,
      阅读量: 4.8,
      答疑量: 5,
      推送课程数: 3,
      在院患者数: 8,
      推送人数: 5,
      阅读人数: 3,
      新增患者数: 3
    }
  ]

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: ['推送量', '阅读量', '答疑量', '推送课程数', '在院患者数', '推送人数', '阅读人数', '新增患者数'],
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
      <Chart forceFit height={400} data={data} scale={scale} padding={[50, 0, 20, 20]}>
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
