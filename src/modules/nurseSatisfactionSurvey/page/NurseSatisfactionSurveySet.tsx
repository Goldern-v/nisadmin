import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message, Input, Switch } from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'
import NurseSatisfactionSurveyAddModal from '../components/NurseSatisfactionSurveyAddModal'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
import { fileDownload } from 'src/utils/file/file'
import service from 'src/services/api'
import FormPageBody from '../components/FormPageBody'
import SetImportModal from '../components/SetImportModal'
export interface Props { }
const api = new NurseSatisfactionSurveyService();

export default observer(function MyCreateList() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [editVisible, setEditVisible] = useState(false)
  const [editVisible2, setEditVisible2] = useState(false)
  const [date, setDate]: any = useState([])
  const [previewPaperData, setPreviewPaperData]: any = useState([])
   //是否启用
   const changeStatus = (record: any, check: any) => {
    record.useStatus = check ? 1 : 0
    setDataSource([...dataSource])
    setPageLoading(true)
    api
      .setUseStatus({
        id: record.id,
        useStatus: record.useStatus,
      })
      .then((res) => {
        setPageLoading(false)
        if (res.code == "200") {
          message.success("操作成功！");
        } 
      }, err => setPageLoading(false))
  }

  /** 类别 */
  const pathMap: any = {
    year: 'year',
    month: 'month',
    conclusion: 'conclusion',
    innovation: 'innovation'
  }
  const path = window.location.hash.split('/').reverse()[0]

  const status = pathMap[path]

  let columns: ColumnProps<any>[] = []
  columns =
    [
      {
        title: '状态',
        dataIndex: 'title',
        width: 50,
        align: 'center',
        render: (text: any, record: any, index: any) => 
        <span>
          <Switch
            size='small'
            onChange={(check:any) => changeStatus(record, check)}
            checked={record.useStatus == 1 ? true : false}
          />
        </span>
      },
      {
        title: '名称',
        dataIndex: 'text',
        width: 150,
        align: 'center'
      },
      {
        title: '标签',
        dataIndex: 'lable',
        width: 150,
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 80,
        align: 'center'
      },
      {
        title: '创建人',
        dataIndex: 'creatorName',
        width: 80,
        align: 'center'
      },
      {
        title: '操作',
        width: 60,
        render(text: any, record: any, index: number) {
          return (
            <DoCon>
              <span onClick={() => onEdit(record)}>查看</span>
              <span onClick={() => onDelete(record)}>删除</span>
            </DoCon>
          )
        }
      }
    ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)

  const initData = () => {
  }
  const onChangeSearchText = (e: any) => { setSearchText(e.target.value) }

  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .getSetPage({
        ...pageOptions,
        startDate,
        endDate,
        keyWord: searchText,
      })
      .then((res) => {
        setPageLoading(false)
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const onEdit = (record: any) => {
    api.previewPaper(record.id)
    .then((res) => {
      setEditVisible(true)
      setPreviewPaperData(res.data)
    }, err => setPageLoading(false))
  }

  const onDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除该调查表吗？',
      centered: true,
      onOk: () => {
        setPageLoading(true)
        api
          .setDelete(record.id, { id: record.id })
          .then(res => {
            message.success('删除成功', 1, () => getData())
          }, err => setPageLoading(false))

      }
    })
  }

  const handleImport = () => {
    setEditVisible2(true)
  }

  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    date,
  ])

  useEffect(() => {
    initData()
  }, [])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getData()
    }
  })

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>满意度调查表设置</PageTitle>
        <Place />
        <span className='label'>创建时间:</span>
        <DatePicker.RangePicker
          allowClear
          style={{ width: 220 }}
          value={date}
          placeholder={['开始时间', '结束时间']}
          onChange={(value: any) => setDate(value)}
        />
        <span className='label ml-20'>关键字:</span>
        <Input
          placeholder='请输入名称/标签关键字'
          style={{ width: 220 }}
          value={searchText}
          onChange={onChangeSearchText}
        />
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={handleImport}>导入</Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
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
      <FormPageBody
        visible={editVisible}
        previewPaperData={previewPaperData}
        onOk={() => setEditVisible(false)}
        onCancel={() => setEditVisible(false)} />
      <SetImportModal
        visible={editVisible2}
        onOk={() => {
          getData()
          setEditVisible2(false)
        }}
        onCancel={() => {
          setEditVisible2(false)
        }} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.active{
  color: #09a9f0;
}
.active1{
  color: #f6ac4b;
}
`
