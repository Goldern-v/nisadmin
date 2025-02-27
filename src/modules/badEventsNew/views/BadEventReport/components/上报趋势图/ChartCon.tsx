import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from '../../BadEventReportModel'
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  data: any
}

const scale = [{
  dataKey: 'month',
  min: 0,
  max: 1,
}]

export default function ChartCon(props: Props) {
  let { data } = props
  const { chartColors } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  const [dataUrl, setDataUrl] = useState('' as string)

  let chartDataSet = []
  let beforeYearKey = ''
  let lastYearKey = ''
  let curYearKey = ''

  if (data.beforeYearList) {
    for (let i = 0; i < data.beforeYearList.length; i++) {
      let beforeYearItem = data.beforeYearList[i]
      let lastYearListItem = data.lastYearList[i] || {}
      let curYearListItem = data.curYearList[i] || {}
      beforeYearKey = beforeYearItem.timeSection.split('年')[0] + '年'
      lastYearKey = lastYearListItem.timeSection.split('年')[0] + '年'
      curYearKey = curYearListItem.timeSection.split('年')[0] + '年'

      chartDataSet.push({
        month: beforeYearItem.timeSection.split('年')[1],
        [beforeYearKey]: beforeYearItem.happenNum,
        [lastYearKey]: lastYearListItem.happenNum,
        [curYearKey]: curYearListItem.happenNum,
      })
    }
  }

  const dv = new DataSet.View().source(chartDataSet);

  dv.transform({
    type: 'fold',
    fields: [beforeYearKey, lastYearKey, curYearKey],
    key: 'year',
    value: 'happenNum',
  });

  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.shang-bao-qv-shi-tu canvas') as HTMLCanvasElement
      if (canvasEl) setDataUrl(canvasEl.toDataURL())
    }, 500)

    return () => clearTimeout(timer)
  }, [data])

  return (
    <Wrapper className="shang-bao-qv-shi-tu chart-con">
      <Chart forceFit height={400} data={dv.rows} scale={scale}>
        <Tooltip />
        <Axis />
        <Legend />
        <Line position="month*happenNum" color={['year', chartColors]} />
        <Point position="month*happenNum" color={['year', chartColors]} size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape="circle" />
      </Chart>
      <img src={dataUrl} className="chart-con-img" />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
  .aside {
    font-size: 12px;
    margin-top: 10px;
    color: red;
  }
  .chart-con-img{
    display:none;
  }
`
