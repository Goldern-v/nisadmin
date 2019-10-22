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
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
export interface Props {}
export default observer(function HumanResource() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '姓名'
    },
    {
      title: '调配方式'
    },
    {
      title: '科室'
    },
    {
      title: '开始时间'
    },
    {
      title: '结束时间'
    },
    {
      title: '事由'
    },
    {
      title: '创建人'
    },
    {
      title: '创建时间'
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })
  const getData = () => {
    setPageLoading(true)
    qcOneService.qcHrAllocationGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
      setDataSource(res.data.list)
      setPageLoading(false)
    })
  }

  const onDetail = (record: any) => {}
  useCallback(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize])

  useEffect(() => {
    getData()
  }, [])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>人力资源调配</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>调配方式:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button onClick={() => getData()}>查询</Button>
        <Button type='primary' onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button>
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
})
const Wrapper = styled.div``
