import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from './../../BadEventReportModel'
import { Pre } from 'src/components/common'
export interface Props {
  list: DeptItem[]
}
export default function Table(props: Props) {
  let { list } = props
  const { timeObj } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width="40px" />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td></td>
            {list.map((item: any, idx: number) => <td key={idx}>{item.eventType}</td>)}
          </tr>
          <tr>
            <td>{(timeObj.prevMonth || '...') + '月'}</td>
            {list.map((item: any, idx: number) => <td key={idx}>{item.lastNum}</td>)}
          </tr>
          <tr>
            <td>{(timeObj.currentMonth || '...') + '月'}</td>
            {list.map((item: any, idx: number) => <td key={idx}>{item.curNum}</td>)}
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
