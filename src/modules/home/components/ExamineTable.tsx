import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores/index'
import BaseTable from 'src/components/BaseTable'

//引入图标
import { ReactComponent as DWSH } from '../images/待我审核.svg'

export interface Props extends RouteComponentProps {}

export default function ExamineTable() {
  const columns: any = [
    {
      title: '类型',
      dataIndex: '类型',
      key: '类型',
      width: 10,
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: '内容',
      key: '内容',
      width: 55,
      align: 'center'
    },
    {
      title: '提取人',
      dataIndex: '提取人',
      key: '提取人',
      width: 10,
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: '时间',
      key: '时间',
      width: 15,
      align: 'center'
    }
  ]
  return (
    <Wrapper>
      <TableTitle>
        <I>
          <DWSH />
        </I>
        <World>待我审核</World>
        <More>更多 ></More>
      </TableTitle>
      <BaseTable columns={columns} surplusHeight={(appStore.wih - 395) / 2 + 395} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  flex: 1;
  background: #ccc;
  margin-bottom: 20px;
  #baseTable {
    padding: 0 !important;
    .ant-table-header-column {
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .ant-table-body {
      border-radius: 0 !important;
    }
    .ant-table-small{
      border-radius: 0 !important;
    }
  }
`
const TableTitle = styled.div`
  box-shadow: 0px -1px 0px 0px rgba(245, 105, 84, 1);
  border-radius: 2px 2px 0 0;
  border: 1px solid rgba(221, 221, 221, 1);
  border-bottom: none;
  box-sizing: border-box;
  height: 45px;
  width: 100%;
  background: #fff;
  padding: 0 15px;
  box-sizing: border-box;
`
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  /* width: 64px; */
  font-size: 15px;
  font-weight: 900;
  color: rgba(51, 51, 51, 1);
  vertical-align: middle;
  margin-bottom: -9px;
  vertical-align: middle;
`
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
  margin-top: 15px;
  &:hover{
    cursor: pointer;
    color:#00A65A;
  }
`
