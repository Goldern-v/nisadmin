import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import * as React from 'react'
import { Chart, Tooltip, Axis, Legend, Coord, Pie } from 'viser-react'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  // 表图
  const DataSet = require('@antv/data-set')
  // let getData = [{ item: '已占用', count: 160 }, { item: '空床', count: 40 }]
  // 处理空数据
  // getData = getData ? getData : []
  // for (let i = 0; i < getData.length; i++) {
  //   getData[i] = getData[i] ? getData[i] : {}
  // }
  // // 转换
  // let sum = parseInt(getData[0].count, 10) + parseInt(getData[1].count, 10)
  // let count1 = parseInt(getData[0].count, 10)*(parseInt(getData[0].count, 10) / sum)
  // let count2 = parseInt(getData[1].count, 10) * (parseInt(getData10].count, 10) / sum)
  const sourceData = [{ item: '已占用', count: 80 }, { item: '空床', count: 20 }]
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
      <Head>
        <div className='headLeft'>床位情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <ChartCon>
        <div className='ChartConLeft'>
          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare' />
            <div className='leftItemMessage'>已占用：160</div>
          </div>

          <div className='ChartConLeftItem'>
            <div className='LeftItemSquare LeftItemSquareColor' />
            <div className='leftItemMessage'>空床：40</div>
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
              'percent', // } // return item.point.item + ': ' + val //   formatter: (val: any, item: any) => { // {
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

const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
  }
`
const ChartCon = styled.div`
  .ChartConLeft {
    padding: 12px 0 0 17px;
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
    margin-top: -40px;
  }
`
