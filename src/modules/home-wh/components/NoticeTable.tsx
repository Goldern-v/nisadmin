import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores/index'
import BaseTable from 'src/components/BaseTable'
import { Button } from 'antd'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
//引入图标
import { ReactComponent as TZGG } from '../images/通知公告.svg'
import { ReactComponent as READ } from '../images/已读.svg'
import { ReactComponent as NOREAD } from '../images/未读.svg'

import Item from 'antd/lib/list/Item'
export interface Props extends RouteComponentProps {}

export default function NoticeTable() {
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  const setIcon = (read: any) => {
    return read === true ? <READ /> : <NOREAD />
  }

  const columns: any = [
    {
      title: '标题',
      width: 60,
      align: 'left',
      render: (text: any, record: any) => (
        <span>
          <i className='messageStatus'>{setIcon(record.read)}</i>
          <i className='messageTitle'>{record.title}</i>
        </span>
      )
    },
    {
      title: '提取人',
      dataIndex: 'senderName',
      key: 'senderName',
      width: 12,
      align: 'left'
    },
    {
      title: '时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
      width: 18,
      align: 'left'
    }
  ]

  const getMealList = () => {
    setLoadingTable(true)
    HomeApi.getReceiveList(pageIndex, pageSize, keyword).then((res) => {
      setLoadingTable(false)
      setTableData(res.data.list)
    })
  }

  useEffect(() => {
    getMealList()
  }, [])

  const selectRow = (record: any) => {
    appStore.history.push(`/notice?selectedMenu=收件箱&id=${record.id}`)
  }

  return (
    <Wrapper>
      <TableTitle>
        <I>
          <TZGG />
        </I>
        <World>通知公告</World>
        <More
          onClick={() => {
            appStore.history.push('/notice')
          }}
        >
          更多 >
        </More>
        <Button
          onClick={() => {
            appStore.history.push('/sentNotice')
          }}
        >
          创建
        </Button>
      </TableTitle>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={(appStore.wih - 365) / 2 + 365}
        loading={loadingTable}
        onRow={(record) => {
          return {
            onClick: (event: any) => {
              selectRow(record)
            }
          }
        }}
        rowClassName={(record) => {
          return 'cursorPointer'
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  flex: 1;
  background: #ccc;
  #baseTable {
    padding: 0 !important;
    .ant-table-header-column {
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
      overflow: auto;
    }
    .ant-table-body {
      border-radius: 0 !important;
    }
    .ant-table-small {
      border-radius: 0 !important;
    }
  }
  .messageStatus {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: 5px;
  }
  .messageTitle {
    vertical-align: middle;
    font-style:normal;
  }
  .cursorPointer {
    cursor: pointer;
  }
`
const TableTitle = styled.div`
  box-shadow: 0px -1px 0px 0px rgba(0, 166, 128, 1);
  border-radius: 2px 2px 0 0;
  border: 1px solid rgba(221, 221, 221, 1);
  border-bottom: none;
  box-sizing: border-box;
  height: 45px;
  width: 100%;
  background: #fff;
  padding: 0 15px;
  box-sizing: border-box;
  .ant-btn {
    width: 56px;
    height: 28px;
    text-align: center;
    background: rgba(248, 248, 248, 1);
    border-radius: 2px;
    border: 1px solid rgba(204, 204, 204, 1);
    float: right;
    margin-right: 20px;
    margin-top: 9px;
    padding: 0px 10px !important;
  }
`
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 900;
  color: rgba(51, 51, 51, 1);
  vertical-align: middle;
  margin-bottom: -9px;
`
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: #00a65a;
  }
`
const MyButton = styled.button``
