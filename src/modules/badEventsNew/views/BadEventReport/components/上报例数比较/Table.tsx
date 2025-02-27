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

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='90px' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td></td>
            {list.map((item: any, idx: number) =>
              <td key={idx}>{item.timeSection}</td>)}
          </tr>
          <tr>
            <td>不良事件例次</td>
            {list.map((item: any, idx: number) =>
              <td key={idx}>{item.happenNum}</td>)}
          </tr>
          <tr>
            <td>与前一月比较</td>
            {list.map((item: any, idx: number) =>
              <td key={idx} className="font-12">{item.contrastPercent}</td>)}
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
      word-break: break-all;
      &.font-12{
        font-size: 12px;
      }
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
