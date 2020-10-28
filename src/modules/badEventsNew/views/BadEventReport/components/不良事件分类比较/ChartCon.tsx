import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from '../../BadEventReportModel'
import { Chart, Tooltip, Axis, Coord, Bar } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  list: DeptItem[]
}

export default function ChartCon(props: Props) {
  let { list } = props
  const { chartColors } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  const [dataUrl, setDataUrl] = useState('' as string)

  const scale = [{
    dataKey: 'sales',
    tickInterval: 20,
  }];

  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.bu-liang-shi-jian-fen-lei-bi-jiao canvas') as HTMLCanvasElement
      if (canvasEl) setDataUrl(canvasEl.toDataURL())
    }, 500)

    return () => clearTimeout(timer)
  }, [list])

  return (
    <Wrapper className="bu-liang-shi-jian-fen-lei-bi-jiao chart-con">
      <Chart forceFit height={400} data={list}>
        <Coord type="rect" direction="LB" />
        <Tooltip />
        <Axis dataKey="eventType" label={{ offset: 12 }} />
        <Bar position="eventType*happenNum" color={['eventType', chartColors]} />
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
