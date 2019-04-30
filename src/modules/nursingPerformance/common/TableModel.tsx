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
  flex: 1;
  /* overflow: hidden;
  overflow-x: auto; */
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
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
  .ant-table {
    width: 150%;
  }
`
