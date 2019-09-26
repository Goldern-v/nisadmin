import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
export interface Props {
  obj: {
    addAnswer: string
    addInPatients: string
    addPatientsNum: string
    addPush: string
    addPushNum: string
    addQuestion: string
    addReadNum: string
    addReading: string
    addReadingCoverRate: string
    addReadingRate: string
    beginDate: null
    createDate: string
    creator: string
    creatorName: string
    endDate: null
    id: string
    instanceId: string
    readingCoverRate: string
    readingRate: string
    totalAnswer: string
    totalInPatients: string
    totalPatientsNum: string
    totalPush: string
    totalPushNum: string
    totalQuestion: string
    totalReadNum: string
    totalReading: string
    updateTime: string
    updaterName: string
    updaterNo: string
  }
}

export default function Table(props: Props) {
  let { obj } = props
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
              <Cell label1='总阅读率' label2='新增阅读率' value1={obj.readingRate} value2={obj.addReadingRate} />
            </td>
            <td>
              <Cell label1='总推送量' label2='新增推送量' value1={obj.totalPush} value2={obj.addPush} />
            </td>
            <td>
              <Cell label1='总阅读量' label2='新增阅读量' value1={obj.totalReading} value2={obj.addReading} />
            </td>
            <td>
              <Cell label1='总疑问量' label2='新增疑问量' value1={obj.totalQuestion} value2={obj.addQuestion} />
            </td>
            <td>
              <Cell label1='总答疑量' label2='新增答疑量' value1={obj.totalAnswer} value2={obj.addAnswer} />
            </td>
          </tr>
          <tr>
            <td>
              <Cell
                label1='总阅读覆盖率'
                label2='新增阅读覆盖率'
                value1={obj.readingCoverRate}
                value2={obj.addReadingCoverRate}
              />
            </td>
            <td>
              <Cell
                label1='总在院患者数'
                label2='新增在院患者数'
                value1={obj.totalInPatients}
                value2={obj.addInPatients}
              />
            </td>
            <td>
              <Cell label1='总阅读人数' label2='新增阅读人数' value1={obj.totalReadNum} value2={obj.addReadNum} />
            </td>
            <td>
              <Cell label1='总推送人数' label2='新增推送人数' value1={obj.totalPushNum} value2={obj.addPushNum} />
            </td>
            <td>
              <Cell label1='总患者数' label2='新增患者数' value1={obj.totalPatientsNum} value2={obj.addPatientsNum} />
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
