import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import moment from 'moment'
export interface Props {
  list: DeptItem[]
}

export default function Table(props: Props) {
  let { list } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
          {/* <col width='30%' />
          <col width='25%' />
          <col width='25%' />
          <col width='20%' /> */}
        </colgroup>
        <tbody>
          <tr className='header'>
            <td rowSpan={2}>项目</td>
            <td colSpan={3}>2019年5月</td>
            <td colSpan={3}>
              {moment(report.endDate).format('YYYY年')}
              {report.indexInType}月
            </td>
            <td colSpan={3}>
              `${moment(report.endDate).format('YYYY年')}${report.indexInType}月与$
              {report.indexInType == 1
                ? moment(report.beginDate)
                    .subtract(1, 'year')
                    .format('YYYY年')
                : moment(report.beginDate).format('YYYY年')}
              ${report.indexInType == 1 ? 12 : report.indexInType - 1}
              比较
            </td>
          </tr>
          <tr>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>占总分%</td>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>占总分%</td>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>扣分%</td>
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
            <td style={{ borderRight: 0 }}>2.57</td>
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
