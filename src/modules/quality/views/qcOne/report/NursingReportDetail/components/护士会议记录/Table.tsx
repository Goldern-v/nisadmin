import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  tableList: any[]
}

export default function Table(props: Props) {
  const { tableList } = props
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
            <td>会议名称</td>
            <td colSpan={3} />
          </tr>
          <tr>
            <td>会议时间</td>
            <td />
            <td>会议地点</td>
            <td />
          </tr>
          <tr>
            <td>会议主持</td>
            <td />
            <td>记录人</td>
            <td />
          </tr>
          <tr>
            <td>到会人</td>
            <td colSpan={3} />
          </tr>
          <tr>
            <td>查看人员</td>
            <td colSpan={3} />
          </tr>
          <tr>
            <td>会议签名</td>
            <td colSpan={3} className='text-left'>
              (每人浏览内容后签名)
            </td>
          </tr>
          <tr>
            <td rowSpan={7}>发言记录</td>
            <td colSpan={3} className='text-left'>
              一、传到会议
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='text-left'>
              一、传到会议
            </td>
          </tr>
          <tr>
            <td colSpan={3} />
          </tr>
          <tr>
            <td colSpan={3} className='text-left'>
              二、工作中问题及整改
            </td>
          </tr>
          <tr>
            <td colSpan={3} />
          </tr>
          <tr>
            <td colSpan={3} className='text-left'>
              三、护士发言
            </td>
          </tr>
          <tr>
            <td colSpan={3} />
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

const Pre = styled.pre`
  white-space: pre-wrap;
`
