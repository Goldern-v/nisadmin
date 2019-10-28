import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Input } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { arrangeService } from '../../services/ArrangeService'
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'
export interface Props {}
export default observer(function AddSubClass() {
  const [searchWord, setSearchWord] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedStatusType, setSelectedStatusType] = useState('')
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const columns: ColumnProps<any>[] = [
    {
      title: '科室',
      dataIndex: 'deptName'
    },
    {
      title: '护士工号',
      dataIndex: 'empNo',
      align: 'center'
    },
    {
      title: '护士姓名',
      dataIndex: 'empName',
      align: 'center'
    },
    {
      title: '加班日期',
      dataIndex: 'workDate',
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '合计小时数',
      dataIndex: 'hour',
      align: 'center'
    }
  ]
  const statusTypeList = [
    {
      code: '',
      name: '全部'
    },
    {
      code: '1',
      name: '加班'
    },
    {
      code: '2',
      name: '减班'
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })

  const getData = () => {
    setPageLoading(true)
    arrangeService
      .findBylist({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        statusType: selectedStatusType,
        empNo: searchWord,
        startDate: date[0] ? moment(date[0]).format('YYYY-MM-DD') : '',
        endDate: date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
      })
      .then((res) => {
        setDataSource(res.data.list)
        setPageLoading(false)
      })
  }

  const onDetail = (record: any) => {}

  useEffect(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, selectedStatusType, date, searchWord])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>加减班记录查询</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker
          allowClear={true}
          style={{ width: 220 }}
          value={date}
          onChange={(value) => setDate(value)}
        />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>工号姓名:</span>
        <Input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} style={{ width: 120 }} />
        <span className='label'>类型</span>
        <Select onChange={(value: string) => setSelectedStatusType(value)} value={selectedStatusType}>
          {statusTypeList.map((item: DictItem, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        {/* <Button type='primary' onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button> */}
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index', 'fixedIndex']}
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
