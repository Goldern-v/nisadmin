import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores/index'
import BaseTable from 'src/components/BaseTable'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
//引入图标
import { ReactComponent as DWSH } from '../images/待我审核.svg'
export interface Props extends RouteComponentProps {}

export default function ExamineTable() {
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [keyword, setKeyword] = useState('')

  const columns: any = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 15,
      align: 'left',
      marginLeft:'20px',
      render(text: string, record: any) {
        return text == 'nurseFile' ? '护士档案' : text == 'qc' ? '质量检查' : ''
      }
    },
    {
      title: '内容',
      dataIndex: 'message',
      key: 'message',
      width: 45,
      align: 'left'
    },
    {
      title: '提取人',
      dataIndex: 'commiterName',
      key: 'commiterName',
      width: 12,
      align: 'left'
    },
    {
      title: '时间',
      dataIndex: 'commitTime',
      key: 'commitTime',
      width: 18,
      align: 'left'
    }
  ]

  const getMealList = () => {
    //质量检查和档案管理各拿10条数据
    let qualityCheck = HomeApi.pendingPage(current, pageSize, "qc", keyword)
    let nurseFileCheck = HomeApi.pendingPage(current, pageSize, 'qc', keyword)
    setLoadingTable(true)
    Promise.all([qualityCheck, nurseFileCheck]).then(values => {
      setLoadingTable(false)
      let array = (values[0].data.list || []).concat(values[1].data.list || [])
      //按照提交时间先后排序
      array.length > 1 && array.sort((a:any, b:any) => {
        return Date.parse(b.commitTime.replace(/-/g, '/')) - Date.parse(a.commitTime.replace(/-/g, '/'))
      })
      setTableData(array)
      }).catch(() => {
    })
  }

  useEffect(() => {
   getMealList()
  }, [])

  return (
    <Wrapper>
      <TableTitle>
        <I>
          <DWSH />
        </I>
        <World>待我审核</World>
        <More onClick={() => {appStore.history.push('/auditsManagement')}}>更多 ></More>
      </TableTitle>
      <BaseTable 
        dataSource={tableData} 
        columns={columns} 
        surplusHeight={(appStore.wih - 365) / 2 + 365} 
        loading={loadingTable}
        />
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
      padding-left: 10px;
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
