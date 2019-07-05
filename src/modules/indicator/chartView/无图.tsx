import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
const DataSet = require('@antv/data-set')
import { Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord } from 'viser-react'
export interface Props {
  dataSource: any[]
  keys: string[]
  name: string
  gName: string
  lineKey: string
  dictionary?: any
  legendData: any[]
}
export default function BaseChart(props: Props) {
  let sourceData: any = []

  return (
    <Con>
      <ChartCon>暂无图式</ChartCon>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const ChartCon = styled.div`
  /* margin-top: 80px; */
  margin-bottom: 200px;
  height: 100%;
  width: 80vw;
  font-size: 30px;
  color: gray;
  text-align: center;
`
