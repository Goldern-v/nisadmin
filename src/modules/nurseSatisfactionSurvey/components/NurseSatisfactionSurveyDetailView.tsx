import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button} from 'antd'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'
import BaseTable from 'src/components/BaseTable'
import { fileDownload } from 'src/utils/file/file'
import FormPageBody from '../components/FormPageBody'

const api = new NurseSatisfactionSurveyService();
import { DoCon } from 'src/components/BaseTable'

export interface Props { }

export default observer(function followUpDetailView() {
  const { queryObj, history, location } = appStore
  const [pageLoading, setPageLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal]: any = useState(0)
  const [data, setData]: any = useState([])
  const [surveyTitle, setSurveyTitle]: any = useState("")
  const [editVisible, setEditVisible] = useState(false)
  const [previewPaperData, setPreviewPaperData]: any = useState([])

  const onload = () => {
    let id = queryObj.Id
    setPageLoading(true)
    api.surveyShow(id).then((res) => {
      setPageLoading(false)
      setTotal(res.data.participationNum)
      setDataSource(res.data.showDtoList)
      setSurveyTitle(res.data.showDtoList[0].surveyTitle)
      setData(res.data)
    })
  }

  useEffect(() => {
    onload()
  }, [])

  const onDetail = (record: any) => {
    api.getAppPaper(record.fillRecordId)
    .then((res) => {
      setEditVisible(true)
      setPreviewPaperData(res.data)
    }, err => setPageLoading(false))
  }

  const handleExport = () => {
    setPageLoading(true)
    api.exportFillRecord(queryObj.Id,{
      id:queryObj.Id
    })
    .then(res => {
      setPageLoading(false)
      fileDownload(res)
    }, err => setPageLoading(false))
  }
  let columns: ColumnProps<any>[] = []
    columns = 
  [
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 50,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 50,
      align: 'center'
    },
    {
      title: '职称',
      dataIndex: 'title',
      width: 50,
      align: 'center',
    },
    {
      title: '职务',
      dataIndex: 'job',
      width: 50,
      align: 'center'
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 80,
      align: 'center'
    },
    {
      title: '调查表',
      dataIndex: 'fillStatusName',
      width: 50,
      align: 'center',
      render(fillStatusName: any) {
        return (
          <div>
            <span className={fillStatusName == "已填写" ? "active" : fillStatusName == "未填写" ? "active1" : "" }>{fillStatusName}</span>
          </div>
        )
      }
    },
    {
      title: '评分',
      dataIndex: 'totalScore',
      width: 50,
      align: 'center'
    },
    {
      title: '填写时间',
      dataIndex: 'fillTime',
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
      <div className="name">{surveyTitle}</div>
      <div className="message">
        <span>由{data.creatorName}于{data.createTime}创建</span>
        <span>参与人数：{data.participationNum}</span>
        <span>已完成数：{data.finishNum}</span>
        <span>平均评分：{data.avgScore}</span>
      </div>
      <div className="buttonBody">
      <Button onClick={handleExport}>导出</Button>
      <Button className="ml-20" onClick={() => appStore.history.goBack()}>返回</Button>
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
        surplusHeight={220}
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
    <FormPageBody
        visible={editVisible}
        previewPaperData={previewPaperData}
        onOk={() => setEditVisible(false)}
        onCancel={() => setEditVisible(false)} />
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  .ml-20{
    margin-left: 20px;
  }
  .active{
    color: #09a9f0;
  }
  .active1{
    color: #f6ac4b;
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

