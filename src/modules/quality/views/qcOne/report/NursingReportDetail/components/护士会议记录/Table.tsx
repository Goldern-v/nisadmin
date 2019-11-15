import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Pre } from 'src/components/common'
export interface Props {
  tableObj: any
}

export default function Table(props: Props) {
  const { tableObj } = props
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
        </colgroup>
        <tbody>
          <tr>
            <td>会议类型</td>
            <td colSpan={3}>
              {tableObj.meetingType == 'QCWMT001' ? '周会' : tableObj.meetingType == 'QCWMT002' ? '月会' : ''}
            </td>
          </tr>
          <tr>
            <td>会议时间</td>
            <td>{tableObj.meetingDate}</td>
            <td>会议地点</td>
            <td>{tableObj.meetingLocation}</td>
          </tr>
          <tr>
            <td>会议主持</td>
            <td>{tableObj.compereEmpNames}</td>
            <td>记录人</td>
            <td>{tableObj.recorderEmpNames}</td>
          </tr>
          <tr>
            <td>到会人</td>
            <td colSpan={3}>
              <Pre>{tableObj.attendeeEmpNames}</Pre>
            </td>
          </tr>
          <tr>
            <td>查看人员</td>
            <td colSpan={3}>
              <Pre>{tableObj.viewedEmpNames}</Pre>
            </td>
          </tr>
          <tr>
            <td>会议签名</td>
            <td colSpan={3} className='text-left'>
              {/* (每人浏览内容后签名) */}
              <Pre>{tableObj.signedEmpNames || '(每人浏览内容后签名)'}</Pre>
            </td>
          </tr>
          <tr>
            <td rowSpan={7}>发言记录</td>
            <td colSpan={3} className='text-left'>
              一、会议传达
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Pre>{tableObj.meetingConveyed}</Pre>
            </td>
          </tr>

          <tr>
            <td colSpan={3} className='text-left'>
              二、工作中问题及整改
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Pre>{tableObj.problemRectification}</Pre>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='text-left'>
              三、护士发言
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Pre>{tableObj.nurseStatement}</Pre>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 10px 50px;
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    td,
    tr {
      border: 1px solid #ccc;
      height: 40px;
      vertical-align: middle;
      text-align: center;
    }
    td {
      padding: 4px 8px;
    }
    .td-title {
      background: #f0f0f0;
      /* font-weight: bold; */
    }
  }
  .text-left {
    text-align: left;
  }
`
