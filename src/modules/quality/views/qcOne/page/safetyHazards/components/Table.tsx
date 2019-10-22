import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Select } from 'src/vendors/antd'
import { qcOneSelectViewModal } from '../../../QcOneSelectViewModal'
import { DictItem } from 'src/services/api/CommonApiService'
import { observer } from 'src/vendors/mobx-react-lite'
export interface Props {}

export default observer(function Table() {
  return (
    <Wrapper>
      <TableCon>
        <colgroup>
          <col width='50px' />
          <col width='100px' />
          <col width='150px' />
          <col width='150px' />
          <col width='150px' />
        </colgroup>
        <tr>
          <th>序号</th>
          <th>问题种类</th>
          <th>问题详情</th>
          <th>问题分析</th>
          <th>整改措施</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <Select className='noborder-select'>
              {qcOneSelectViewModal.wtzlList.map((item: DictItem) => (
                <Select.Option value={item.code}>{item.name}</Select.Option>
              ))}
            </Select>
          </td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </TableCon>
    </Wrapper>
  )
})
const Wrapper = styled.div``

const TableCon = styled.table`
  border-collapse: collapse;
  width: 700px;
  margin: 5px 30px;
  table-layout: fixed;
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
  .noborder-select {
    width: 100%;
    .ant-select-selection {
      border: 0;
    }
  }
`
