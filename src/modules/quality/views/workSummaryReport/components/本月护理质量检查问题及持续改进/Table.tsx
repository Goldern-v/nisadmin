import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { workSummaryReportViewModal } from '../../WorkSummaryReportViewModal'
export interface Props {
  list: DeptItem[]
  totalSorce: number
}

export default function Table(props: Props) {
  let { list, totalSorce } = props
  let report: Report = workSummaryReportViewModal.getDataInAllData('report') || {}

  //合并同科室条目
  const formatList = () => {
    let newList = [] as any
    for (let i = 0; i < list.length; i++) {
      let target = newList.find((item: any) => {
        return item.wardName == list[i].wardName
      })

      if (target) {
        target.children.push(list[i])
      } else {
        newList.push({
          wardName: list[i].wardName,
          children: [list[i]]
        })
      }
    }

    return newList
  }

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='120' />
          <col width='200' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>科室</td>
            <td>问题</td>
            <td>持续改进</td>
          </tr>
          {formatList().map((item: any, idx: any) => item.children.map((item1: any, idx1: number) =>
            <tr key={`${idx} ${idx1}`}>
              <td
                rowSpan={item.children.length}
                className="dept-name"
                style={{ textAlign: 'center', display: idx1 == 0 ? 'table-cell' : 'none' }}>
                {item1.wardName}
              </td>
              <td style={{ textAlign: 'center' }}>{item1.content}</td>
              <td>{item1.improveContent}</td>
            </tr>
          ))}
          {/* {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.wardName}</td>
              <td style={{ textAlign: 'center' }}>{item.content}</td>
              <td>{item.improveContent}</td>
            </tr>
          ))} */}
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
      text-align: left;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      &.dept-name{
        text-align: center;
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
