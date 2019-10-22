import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function Table() {
  return (
    <Wrapper>
      <TableCon>
        <tr>
          <th>序号</th>
          <th>问题种类</th>
          <th>问题详情</th>
          <th>问题分析</th>
          <th>整改措施</th>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </TableCon>
    </Wrapper>
  )
}
const Wrapper = styled.div``

const TableCon = styled.table`
  border-collapse: collapse;
  width: 700px;
  margin: 5px 30px;
  th,
  td {
    text-align: center;
    vertical-align: center;
    height: 30px;
    border: 1px solid #d8d8d8;
  }
  th {
    background: rgb(242, 244, 245);
  }
`
