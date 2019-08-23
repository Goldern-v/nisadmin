import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
export interface Props {
  list: DeptItem[]
  totalSorce: number
}

export default function Table(props: Props) {
  let { list, totalSorce } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='30%' />
          <col width='25%' />
          <col width='25%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>质控组</td>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>占总扣分%</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.qcGroupName}</td>
              <td style={{ textAlign: 'center' }}>{item.deductScore}</td>
              <td>{item.deductDeptSize}</td>
              <td>{item.scorePercent + '%'}</td>
            </tr>
          ))}
          <tr>
            <td>合计</td>
            <td style={{ borderRight: 0 }}>{totalSorce}</td>
            <td style={{ borderLeft: 0 }} />
            <td>100%</td>
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
`
