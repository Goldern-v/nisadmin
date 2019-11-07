import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { wardLogService } from '../services/WardLogService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
export interface Props {}
export default observer(function MyCreateList() {
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [templateList, setTemplateList]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  /** 类别 */
  const pathMap: any = {
    myCreateList: '1',
    myWard: '2',
    copyForMe: '3'
  }
  const path = window.location.hash.split('/').reverse()[0]
  const status = pathMap[path]

  const columns: ColumnProps<any>[] = [
    {
      title: '创建日期',
      dataIndex: 'createTime',
      width: 120
    },
    {
      title: '主题',
      dataIndex: 'themeName',
      width: 150
    },
    {
      title: '摘要',
      dataIndex: 'remark',
      width: 150
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 120
    },
    {
      title: '应用',
      dataIndex: 'name',
      width: 140,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'senderName',
      width: 80,
      align: 'center'
    },
    {
      title: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看详情</span>
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
    wardLogService.findTemplates().then((res) => {
      setTemplateList([...res.data.publicTemplates, ...res.data.deptTemplates].map((item: any) => item.template))
    })
  }

  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    wardLogService
      .findLog({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        startDate,
        endDate,
        templateId: selectedTemplate,
        status
      })
      .then((res) => {
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
        setPageLoading(false)
      })
  }

  const onDetail = (record: any) => {
    appStore.history.push(`/wardLogDetail?id=${record.id}`)
  }

  useEffect(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize, date, selectedTemplate])

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
        <PageTitle>病区日志</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>应用:</span>
        <Select style={{ width: 160 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
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
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) }
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div``
