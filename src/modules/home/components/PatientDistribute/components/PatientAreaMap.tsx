import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import HomeViewModel from 'src/modules/home/HomeViewModel.ts'
moment.locale('zh-cn')
export interface Props {
  patientNumSumProp: number
}
const dateFormat = 'YYYY-MM-DD 00:00:00'
export default observer(function PatientAreaMap (props: Props) {
  const [byBistrict, setByBistrict] = useState([
    { patientType: '', patientNum: '' },
    { patientType: '', patientNum: '' },
    { patientType: '', patientNum: '' }
  ])
  const [sumerProp, setSumerProp] = useState(props.patientNumSumProp)

  useEffect(() => {
    if (props.patientNumSumProp === 0) {
      setSumerProp(1)
    }
    setByBistrict(HomeViewModel.PatientDistributeData)
  }, [props.patientNumSumProp])
  // 表图

  const DataSet = require('@antv/data-set')

  const sourceData = [
    {
      item: byBistrict[0] && byBistrict[0].patientType,
      count: (byBistrict[0] && parseInt(byBistrict[0].patientNum, 10) / sumerProp) || 0
    },
    {
      item: byBistrict[1] && byBistrict[1].patientType,
      count: (byBistrict[1] && parseInt(byBistrict[1].patientNum, 10) / sumerProp) || 0
    },
    {
      item: byBistrict[2] && byBistrict[2].patientType,
      count: byBistrict[2] && parseInt(byBistrict[2].patientNum, 10) / sumerProp
    }
  ]

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
            <div className='leftItemMessage'>
              {' '}
              {byBistrict[0] && byBistrict[0].patientType}：{byBistrict[0] && byBistrict[0].patientNum}
            </div>
          </div>

          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare LeftItemSquareColor' />
            <div className='leftItemMessage'>
              {' '}
              {byBistrict[1] && byBistrict[1].patientType}：{byBistrict[1] && byBistrict[1].patientNum}
            </div>
          </div>

          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare LeftItemSquareColor3' />
            <div className='leftItemMessage'>
              {' '}
              {byBistrict[2] && byBistrict[2].patientType}：{byBistrict[2] && byBistrict[2].patientNum}
            </div>
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
})

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
