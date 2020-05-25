import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from './../../BadEventReportModel'
// import { Pre } from 'src/components/common'
import { numToChinese } from 'src/utils/number/numToChinese'
import Title from 'antd/lib/skeleton/Title'
export interface Props {
  list: any[]
}

export default function Table(props: Props) {
  let { list } = props
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  let unit = '月'

  const Title = (code: number) => {
    if (unit == '季度') return `第${numToChinese(code)}${unit}`
    return `${numToChinese(code)}${unit}`
  }

  return (
    <Wrapper>
      <table>
        <colgroup>
          {/* <col width='12.5%' />
          <col width='12.5%' />
          <col width='15%' />
          <col width='27.5%' />
          <col width='27.5%' /> */}
        </colgroup>
        <tbody>
          <tr className='header'>
            <td></td>
            {list.map((item: any, idx: number) =>
              <td key={idx}>{Title(item.code)}</td>)}
          </tr>
          <tr>
            <td></td>
            {list.map((item: any, idx: number) =>
              <td key={idx}>{item.happenedTimes}</td>)}
          </tr>
          <tr>
            <td></td>
            {list.map((item: any, idx: number) =>
              <td key={idx}>{item.rate}</td>)}
          </tr>
        </tbody>
      </table>
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
`
