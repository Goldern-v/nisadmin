import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
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
          <col width='14%' />
          <col width='12%' />
          <col width='21%' />
          <col width='15%' />
          <col width='33%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>调配方式</td>
            <td>姓名</td>
            <td>科室</td>
            <td>起止时间</td>
            <td>事由</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.typeName}</td>
              <td style={{ textAlign: 'center' }}>{item.empName}</td>
              <td>{item.anotherWardName}</td>
              <td style={{ textAlign: 'center' }}>{item.duration}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
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
