import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
export interface Props {
  dataSource: any[]
  columns: ColumnProps<any>[]
}

export default function TableModel (props: Props) {
  let { dataSource, columns } = props
  return (
    <Wrapper>
      <Table dataSource={dataSource} columns={columns} bordered pagination={false} size='small' />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(219, 224, 228, 1);
  padding: 20px 30px; */
  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 !important;
  }
  td {
    /* padding: 8px 2px !important; */
  }
  * {
    word-break: break-word;
  }
  .ant-table-thead {
    background: rgba(242, 244, 245, 1);
  }
  tbody tr:nth-of-type(2n) {
    background: rgba(242, 244, 245, 1);
  }
`
