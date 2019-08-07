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

export default observer(function 门诊科室质量扣分模块(props: Props) {
  const { sectionId } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

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
  // console.log(data.list);
  const TwoColTable = () => {
    if (!data.list || data.list.length <= 0) return <div className='two-col-table' />

    const splitIdx = Math.ceil(data.list.length / 2)
    let col1 = []
    let col2 = []
    let minSize = 0
    if (splitIdx * 2 > minSize) minSize = splitIdx * 2

    for (let i = 0; i < minSize; i++) {
      if (i < minSize / 2) {
        if (data.list[i])
          col1.push({
            ...data.list[i],
            idx: i
          })
        else col1.push({ idx: i })
      } else {
        if (data.list[i])
          col2.push({
            ...data.list[i],
            idx: i
          })
        else col2.push({ idx: i })
      }
    }

    return (
      <div className='two-col-table'>
        <table className='left'>
          <colgroup>
            <col width='50' />
            <col />
            <col width='60' />
          </colgroup>
          <tbody>
            <tr className="header">
              <td>排序</td>
              <td>科室</td>
              <td>扣分</td>
            </tr>
            {col1.map((item: any) => {
              return (
                <tr key={item.idx}>
                  <td>{item.idx + 1}</td>
                  <td>{item.wardName || ''}</td>
                  <td>{item.deductScore}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <table className='right'>
          <colgroup>
            <col width='50' />
            <col />
            <col width='60' />
          </colgroup>
          <tbody>
            <tr className="header">
              <td>排序</td>
              <td>科室</td>
              <td>扣分</td>
            </tr>
            {col2.map((item: any) => {
              return (
                <tr key={item.idx}>
                  <td>{item.idx + 1}</td>
                  <td>{item.wardName || ''}</td>
                  <td>{item.deductScore}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <Wrapper>
      <TextCon>
        <span className='sup-title'>5. {Title()}门诊科室质量扣分排序</span>
      </TextCon>
      {TwoColTable()}
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
  .two-col-table {
    margin: 0 46px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    ::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border: 1px solid #ccc;
    }
  }
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 48%;
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
