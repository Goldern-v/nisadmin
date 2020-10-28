import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from '../../BadEventReportModel'
import { Chart, Tooltip, Axis, Legend, Bar } from 'viser-react'
import { observer } from 'mobx-react'
const DataSet = require('@antv/data-set')

export interface Props {
  list: DeptItem[]
}

export default observer(function ChartCon(props: Props) {
  let { list } = props
  const { chartColors, timeObj } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  const [dataUrl, setDataUrl] = useState('' as string)

  let chartData = [
    { name: timeObj.prevMonth + '月' },
    { name: timeObj.currentMonth + '月' },
  ] as any[]
  let fields = []

  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    fields.push(item.eventType)
    chartData[0][item.eventType] = item.lastNum || 0
    chartData[1][item.eventType] = item.curNum || 0
  }

  if (list.length <= 0) chartData = []

  const dv = new DataSet.View().source(chartData)
  dv.transform({
    type: 'fold',
    fields,
    key: 'eventType',
    value: 'happenNum',
  })

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
      <Chart forceFit height={400} data={dv.rows}>
        <Tooltip />
        <Axis />
        <Legend />
        <Bar
          position="eventType*happenNum"
          color={["name", chartColors]}
          adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
      </Chart>
      <img src={dataUrl} className="chart-con-img" />
    </Wrapper>
  )
})

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
