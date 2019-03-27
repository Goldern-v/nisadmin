import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import * as React from 'react'
import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react'
// const DataSet = require('@antv/data-set')

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  // 表图
  const DataSet = require('@antv/data-set')

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
      <Chart forceFit height={300} data={data} scale={scale}>
        <Tooltip showTitle={false} />
        <Axis />
        <Legend dataKey='item' />
        <Coord type='theta' />
        <Pie
          position='percent'
          color='item'
          style={{ stroke: '#fff', lineWidth: 1 }}
          label={[
            'percent',
            {
              offset: -40,
              textStyle: { rotate: 0, textAlign: 'center', shadowBlur: 2, shadowColor: 'rgba(0, 0, 0, .45)' }
            }
          ]}
        />
      </Chart>
    </div>
  )
}

const Head = styled.div`
  height: 32px;
  line-height: 32px;
  width: 100%;
  background-color: #3493dd;
  .headLeft {
    padding-left: 14px;
    float: left;
    font-size: 16px;
    color: #ffffff;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 14px;
    color: #ffffff;
  }
`
