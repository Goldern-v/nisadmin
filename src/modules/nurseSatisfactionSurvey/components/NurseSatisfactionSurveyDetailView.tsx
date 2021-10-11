import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button} from 'antd'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message, Input } from 'src/vendors/antd'

import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'
import BaseTable from 'src/components/BaseTable'
const api = new NurseSatisfactionSurveyService();
import qs from 'qs'
import { DoCon } from 'src/components/BaseTable'

export interface Props { }

export default observer(function followUpDetailView() {
  const { queryObj, history, location } = appStore
  const [pageLoading, setPageLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal]: any = useState(0)

  const onload = () => {
    let id = queryObj.Id
    api.surveyShow(id).then((res) => {
      console.log(res);
    })
  }

  useEffect(() => {
    onload()
  }, [])

  const onDetail = (record: any) => {
    appStore.history.push(`/nurseSatisfactionSurveyDetailView/?Id=${record.id}`)
  }

  const handleExport = () => {
    // nurseSatisfactionSurveyService.export(status,{
    //   ...pageOptions,
    //   deptCode: deptSelect,
    //   month: month,
    //   keyWord: searchText,
    //   year: year,
    // })
    // .then(res => {
    //   setPageLoading(false)
    //   setSelectedRowKeys([])
    //   fileDownload(res)
    // }, err => setPageLoading(false))
  }
  let columns: ColumnProps<any>[] = []
    columns = 
  [
    {
      title: '工号',
      dataIndex: 'title',
      width: 50,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'text',
      width: 50,
      align: 'center'
    },
    {
      title: '职称',
      dataIndex: 'yearAndMonth',
      width: 50,
      align: 'center',
    },
    {
      title: '职务',
      dataIndex: 'createTime',
      width: 50,
      align: 'center'
    },
    {
      title: '科室',
      dataIndex: 'openDate',
      width: 80,
      align: 'center'
    },
    {
      title: '调查表',
      dataIndex: 'status',
      width: 50,
      align: 'center',
      render(status: any) {
        return (
          <div>
            <span className={status == "0" ? "active" : status == "1" ? "active1" : "" }>{status == "0" ? "未开始" : status == "1" ? "进行中" : "已结束" }</span>
          </div>
        )
      }
    },
    {
      title: '评分',
      dataIndex: 'creatorName',
      width: 50,
      align: 'center'
    },
    {
      title: '填写时间',
      dataIndex: 'creatorName',
      width: 80,
      align: 'center'
    },
    {
      title: '操作',
      width: 50,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看</span>
          </DoCon>
        )
      }
    }
  ]
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  return <Wrapper>
    <div className="topCon">
      <div className="title">护士长满意度调查表/详情</div>
      <div className="name">2021年01月急诊护士满意度调查表</div>
      <div className="message">
        <span>由张艳于2021-01-25 13:39创建</span>
        <span>参与人数：2</span>
        <span>已完成数：2</span>
        <span>平均评分：96.5</span>
      </div>
      <div className="buttonBody">
      <Button onClick={handleExport}>导出</Button>
      <Button className="ml-20" onClick={handleExport}>返回</Button>
      </div>
    </div>
    <div className="mainCon">
    <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '30px 40px' }}
        type={['index']}
        rowKey='id'
        surplusHeight={100}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
    </div>
    
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  .ml-20{
    margin-left: 20px;
  }
  .topCon{
    width: 100%;
    height: 100px;
    background-color: #fff;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    .title{
      color: #666666;
    }
    .name{
      font-size: 22px;
      font-weight: 600;
    }
    .message {
      width: 500px;
      background-color: #ffff80;
      padding-right: 10px;
      display: flex;
      justify-content: space-between;
    }
    .buttonBody {
      width: 150px;
      position: absolute;
      top: 50px;
      right: 30px;
    }
  }
  .mainCon{
    
  }
`

