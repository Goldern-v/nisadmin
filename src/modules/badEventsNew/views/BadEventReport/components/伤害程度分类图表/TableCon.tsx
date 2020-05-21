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
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
        </colgroup>
        <tbody>
          <tr className='header'>
            <td></td>
            <td>不良事件1</td>
            <td>不良事件2</td>
          </tr>
          <tr>
            <td>第一季度</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td>第二季度</td>
            <td>1</td>
            <td>2</td>
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
