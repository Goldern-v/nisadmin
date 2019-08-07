import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'
import { numToChinese } from 'src/utils/number/numToChinese'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 特殊监护病房质量扣分模块(props: Props) {
  const { sectionId } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  let tableList = data.list || []

  const Title = () => {
    let str = ''
    if (!report.indexInType) return ''
    if (report.type == 'month') {
      str = `${report.indexInType}月`
    } else {
      str = `第${numToChinese(report.indexInType)}季度`
    }
    return str
  }

  return (
    <Wrapper>
      <TextCon>
        <span className='sup-title'>4. {Title()}特殊监护病房质量扣分排序</span>
      </TextCon>
      <table>
        <colgroup>
          <col width='50' />
          <col />
          <col width='80' />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>排序</td>
            <td>科室</td>
            <td>扣分</td>
          </tr>
          {tableList.map((item: any, idx: any) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.wardName}</td>
                <td>{item.deductScore}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .sup-title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  /* &:hover {
    button {
      display: block;
    }
  } */
  button {
    /* display: none; */
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 50px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  table {
    margin: 0 46px;
    margin-bottom: 10px;
    border-collapse: collapse;
    border-color: #cccccc;
    width: 50%;
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
`

const TextCon = styled.pre`
  margin: 10px 50px;
  white-space: pre-wrap;
`
