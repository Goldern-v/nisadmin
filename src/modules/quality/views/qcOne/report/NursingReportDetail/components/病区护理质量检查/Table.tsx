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
          <col width='25%' />
          <col width='10%' />
          <col width='10%' />
          <col width='40%' />
          <col width='15%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>质控类别</td>
            <td>检查数</td>
            <td>问题数</td>
            <td>问题详情</td>
            <td>合格率</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'left' }}>{item.type}</td>
              <td>{item.total}</td>
              <td>{item.wrongSize}</td>
              <td style={{ textAlign: 'left' }}>{item.description}</td>
              <td>{item.passRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className='aside'>例：8月每天检查基础护理，检查出有问题的是3条。合格率=（1-3/31*60）*100%</div> */}
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
      padding: 4px;
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
