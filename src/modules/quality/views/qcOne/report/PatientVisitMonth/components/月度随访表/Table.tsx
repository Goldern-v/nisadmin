import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { patientVisitMonthModel } from './../../model/PatientVisitMonthModel'

export interface Props {
  report: any
  totalSorce: number
}

export default observer(function Table(props: Props) {
  let { totalSorce, report } = props

  console.log(report)

  return (
    <Wrapper>
      <table>
        <colgroup>
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>出院人数</td>
            <td>回访数</td>
            <td>回访率</td>
          </tr>
          <tr>
            <td>{report.dischargeNumber || ''}</td>
            <td>{report.visitNumber || ''}</td>
            <td>{report.visitRate || ''}</td>
          </tr>
        </tbody>
      </table>
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
      &.align-left{
        text-align: left;
      }
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
`
