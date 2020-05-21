import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from '../../BadEventReportModel'
import { Chart, Tooltip, Axis, Legend, Bar } from 'viser-react'
const DataSet = require('@antv/data-set')

export interface Props {
  list: DeptItem[]
}

const sourceData = [
  { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
  { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
  key: '月份',
  value: '月均降雨量',
});

const data = dv.rows

export default function ChartCon(props: Props) {
  let { list } = props
  const { chartColors } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  const [dataUrl, setDataUrl] = useState('' as string)

  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.shang-bao-qing-luang-bi-jiao-tu canvas') as HTMLCanvasElement
      if (canvasEl) setDataUrl(canvasEl.toDataURL())
    }, 500)

    return () => clearTimeout(timer)
  }, [list])

  return (
    <Wrapper className="shang-bao-qing-luang-bi-jiao-tu chart-con">
      <Chart forceFit height={400} data={data}>
        <Tooltip />
        <Axis />
        <Legend />
        <Bar position="月份*月均降雨量" color={["name", chartColors]} adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
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
