import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { Pre } from 'src/components/common'
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
          <col width='20%' />
          <col width='20%' />
          <col width='15%' />
          <col width='25%' />
          <col width='15%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>时间</td>
            <td>当事人</td>
            <td>事件种类</td>
            <td>事情简要经过</td>
            <td>后果</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.eventDate}</td>
              <td>{item.eventEmpNames}</td>
              <td>{item.eventType}</td>
              <td>
                {/* <Pre>{item.briefCourseEvent}</Pre> */}
                {item.briefCourseEvent}
              </td>
              <td>{item.result}</td>
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
