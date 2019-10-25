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
          <tr>
            <td rowSpan={tableList.length}>8月</td>
            <td className='td-title'>月重点</td>
            <td>
              <Pre>1111</Pre>
            </td>
          </tr>
          {tableList.map((item: any, index: number) => {
            if (index == 0) return null
            return (
              <tr key={index}>
                <td>{item.a}</td>
                <td>{item.b}</td>
              </tr>
            )
          })}
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
`
