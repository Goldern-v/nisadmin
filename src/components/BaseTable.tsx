import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
export interface Props extends TableProps<any> {}

export default function BaseTable (props: Props) {
  let { dataSource, columns } = props
  let option: any = Object.assign(
    {
      bordered: true,
      pagination: false,
      size: 'small'
    },
    props
  )
  return (
    <Wrapper>
      <Table {...option} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  /* border: 1px solid rgba(219, 224, 228, 1); */
  padding: 20px 30px;
  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 !important;
  }
  .ant-table-thead {
    background: rgba(242, 244, 245, 1);
  }
  tbody tr:nth-of-type(2n) {
    background: rgba(242, 244, 245, 1);
  }
`
