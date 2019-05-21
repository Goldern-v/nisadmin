import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
import moment from 'moment'
moment.locale('zh-cn')
export interface Props {
  titleByGet: string
}
const dateFormat = 'YYYY-MM-DD 00:00:00'
export default function PatientAreaMap (props: Props) {
  const [shiLei, setShiLei] = useState([0])
  const [shenLlei, setShenLlei] = useState([0])
  const [shenWei, setShenWei] = useState([0])
  const [typeGet, setTypeGet] = useState(1)
  useEffect(() => {
    let typeGet: any
    if (props.titleByGet === '地区') {
      setTypeGet(1)
    } else if (data.type === '费别') {
      setTypeGet(2)
    } else if (data.type === '性别') {
      setTypeGet(3)
    }
  }, [authStore.selectedDeptCode, props.titleByGet])
  // 表图
  let postData = {
    wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
    startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
    endTime: moment()
      .add(1, 'd')
      .format(dateFormat), // string 必须参数 结束时间 2019-01-02 00:00:00
    type: typeGet
  }
  HomeApi.patientdistribute(postData).then((res) => {
    console.log('====patientdistribute:', res)
    if (res.data) {
      let list = res.data
    }
  })
  const DataSet = require('@antv/data-set')

  const sourceData = [{ item: '本市', count: 40 }, { item: '市外', count: 30 }, { item: '外省', count: 30 }]

  const scale = [
    {
      dataKey: 'percent',
      min: 0,
      formatter: '.0%'
    }
  ]

  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  })
  const data = dv.rows
  return (
    <div>
      <ChartCon>
        <div className='ChartConLeft'>
          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare' />
            <div className='leftItemMessage'>本市：142</div>
          </div>

          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare LeftItemSquareColor' />
            <div className='leftItemMessage'>市外：25</div>
          </div>

          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare LeftItemSquareColor3' />
            <div className='leftItemMessage'>外省：32</div>
          </div>
        </div>
        <Chart forceFit height={350} data={data} scale={scale}>
          <Tooltip showTitle={false} />
          <Axis />
          <Legend dataKey='item' />
          <Coord type='theta' radius={0.75} innerRadius={0.6} />
          <Pie
            position='percent'
            color='item'
            style={{ stroke: '#fff', lineWidth: 1 }}
            label={[
              'percent',
              {
                offset: -20,
                textStyle: { rotate: 0, textAlign: 'center', shadowBlur: 2, shadowColor: 'rgba(0, 0, 0, .45)' }
              }
            ]}
          />
        </Chart>
      </ChartCon>
    </div>
  )
}

const ChartCon = styled.div`
  .ChartConLeft {
    padding: 22px 0 0 17px;
    .ChartConLeftItem {
      height: 24px;
      display: flex;
      .LeftItemSquare {
        margin-top: 1px;
        width: 28px;
        height: 15px;
        background: rgba(58, 160, 255, 1);
        border-radius: 4px;
      }
      .LeftItemSquareColor {
        background-color: #4ecb73;
      }
      .LeftItemSquareColor3 {
        background-color: #36cbcb;
      }
      .leftItemMessage {
        padding-left: 5px;
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  canvas {
    margin: -120px 0 0 40px;
  }
`
