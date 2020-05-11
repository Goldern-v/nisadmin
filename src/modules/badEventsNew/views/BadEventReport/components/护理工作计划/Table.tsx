import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { numToChinese } from 'src/utils/number/numToChinese'
export interface Props {
  tableList: any[]
}

export default function Table(props: Props) {
  const { tableList } = props
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='15%' />
          <col width='20%' />
          <col width='75%' />
        </colgroup>
        <tbody>
          <tr>
            <td className='td-title'>月份</td>
            <td className='td-title'>分类</td>
            <td className='td-title'>内容</td>
          </tr>

          {tableList.map((item: any, index: number) =>
            <tr key={index}>
              {index === 0 && <td rowSpan={tableList.length}>{item.month}月</td>}
              <td>{item.type == '1' ? '月重点' : `第${numToChinese(item.indexInType)}周`}</td>
              <td>
                <Pre>{item.content}</Pre>
              </td>
            </tr>)}
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
      padding: 4px;
    }
    .td-title {
      background: #f0f0f0;
      /* font-weight: bold; */
    }
  }
`

const Pre = styled.pre`
  white-space: pre-wrap;
  text-align: left;
  padding: 2px 4px;
  word-break: break-all;
`
