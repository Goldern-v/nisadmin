import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores/index'
import BaseTable from 'src/components/BaseTable'
import { Button } from 'antd'

//引入图标
import { ReactComponent as TZGG } from '../img/通知公告.svg'
export interface Props extends RouteComponentProps {}


export default function NoticeTable () {
  const columns:any = [{
    title:'标题',
    dataIndex: '标题',
    key: '标题',
    width: 65,
    align: 'center'
  },{
    title:'提取人',
    dataIndex: '提取人',
    key: '提取人',
    width: 10,
    align: 'center'

  },{
    title:'时间',
    dataIndex: '时间',
    key: '时间',
    width: 15,
    align: 'center'

  }]

  return (
    <Wrapper>
      <TableTitle>
        <I><TZGG/></I>
        <World>通知公告</World>
        <More>更多 ></More>
        <MyButton>创建</MyButton>
      </TableTitle>
      {/* <BaseTable
        columns = {columns}
        surplusHeight={(appStore.wih-172)/2+300}
      /> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  flex:1;
  background:#ccc;
  #baseTable {
    padding: 0!important;
    .ant-table-header-column {
      text-align: left;
      padding-left:20px;
      box-sizing:border-box;
      overflow:auto;
    }
    .ant-table-body {
      border-radius: 0!important;
    }
  }
`
const TableTitle = styled.div`
  box-shadow:0px -1px 0px 0px rgba(0,166,128,1);
  border-radius:2px;
  border:1px solid rgba(221,221,221,1);
  border-bottom:none;
  box-sizing:border-box;
  height:46px;
  width:100%;
  background:#fff;
  padding:0 22px;
  box-sizing:border-box;

`
const I = styled.span`
  display:inline-block;
  margin-top:15px;
  vertical-align:middle;
`
const World = styled.span`
  display:inline-block;
  margin-left:15px;
  width:64px;
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
  vertical-align:middle;
  margin-bottom:-7px;
`
const More = styled.span`
  float:right;
  height:17px;
  font-size:12px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:17px;
  margin-top:15px;
`
const MyButton = styled.button`
  width:56px;
  height:28px;
  background:rgba(248,248,248,1);
  border-radius:2px;
  border:1px solid rgba(204,204,204,1);
  float:right;
  margin-right:20px;
  margin-top:9px;
`

