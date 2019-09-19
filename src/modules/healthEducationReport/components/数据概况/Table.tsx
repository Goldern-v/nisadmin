import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
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
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <Cell label1='总阅读率' label2='新增阅读率' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总推送量' label2='新增推送量' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总阅读量' label2='新增阅读量' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总疑问量' label2='新增疑问量' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总答疑量' label2='新增答疑量' value1='1' value2='2' />
            </td>
          </tr>
          <tr>
            <td>
              <Cell label1='总阅读覆盖率' label2='新增阅读覆盖率' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总在院患者数' label2='新增在院患者数' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总阅读人数' label2='新增阅读人数' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总推送人数' label2='新增推送人数' value1='1' value2='2' />
            </td>
            <td>
              <Cell label1='总患者数' label2='新增患者数' value1='1' value2='2' />
            </td>
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
    border-color: #e5e5e5;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    td {
      height: 130px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
    }
  }
`

function Cell(props: { label1?: string; value1?: string; value2?: string; label2?: string }) {
  const { label1, label2, value1, value2 } = props
  const Wrapper = styled.div`
    text-align: center;
    .value-con {
      font-size: 26px;
      color: #333;
      .b {
        color: #26a680;
        font-size: inherit;
      }
    }
    .label-con {
      font-size: 13px;
      margin-top: 8px;
      color: #666;
    }
  `
  return (
    <Wrapper>
      <div className='value-con'>
        {value1}/ <span className='b'>{value2}</span>
      </div>
      <div className='label-con'>
        {label1}/{label2}
      </div>
    </Wrapper>
  )
}
