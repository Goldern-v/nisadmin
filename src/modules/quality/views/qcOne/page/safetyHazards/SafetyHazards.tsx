import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { qcOneService } from '../../services/QcOneService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
export interface Props {}

export default function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '日期',
      dataIndex: 'recordDate',
      align: 'center',
      width: 100,
      render(text: string, record: any, index: number) {
        return text ? text.split(' ')[0] : ''
      }
    },
    {
      title: '时间',
      width: 100,
      dataIndex: 'recordDate',
      align: 'center',
      render(text: string, record: any, index: number) {
        return text ? text.split(' ')[1] : ''
      }
    },
    {
      title: '问题种类',
      width: 120,
      dataIndex: 'problemType',
      align: 'center'
    },
    {
      title: '详情',
      width: 300,
      dataIndex: 'content'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      align: 'center',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 100
    },
    {
      title: '操作',
      width: 100,
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
    pageSize: 20,
    total: 0
  })
  const getData = () => {
    setPageLoading(true)
    qcOneService.qcSafetyCheckGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
      setDataSource(res.data.list)
      setPageLoading(false)
    })
  }

  const onDetail = (record?: any) => {
    appStore.history.push(record ? `/qcOne/safetyHazardsDetail?id=${record.id}` : '/qcOne/safetyHazardsDetail')
  }
  useCallback(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize])

  useEffect(() => {
    getData()
  }, [])
  // qcOneService
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>安全隐患排查表</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>问题种类:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button onClick={() => getData()}>查询</Button>
        <Button type='primary' onClick={() => onDetail()}>
          添加
        </Button>
        {/* <Button>导出</Button> */}
      </PageHeader>

      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        surplusHeight={200}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: pageOptions.total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
          })
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) }
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
