import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Input } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { arrangeService } from '../../services/ArrangeService'
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import createModal from 'src/libs/createModal'
import HolidaysModal from './modal/HolidaysModal'
export interface Props {}
export default observer(function HolidaysList() {
  const [searchWord, setSearchWord] = useState('')
  const [year, setYear] = useState(moment())
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [date, setDate]: any = useState([])
  const columns: ColumnProps<any>[] = [
    {
      title: '年份',
      dataIndex: 'deptName'
    },
    {
      title: '假期名称',
      dataIndex: 'empNo',
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'empName',
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'workDate',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '状态',
      dataIndex: 'hour',
      align: 'center'
    },
    {
      title: '操作',
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            <span>编辑</span>
            <span>删除</span>
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

  const holidaysModal = createModal(HolidaysModal)

  const getData = () => {
    setPageLoading(true)
    arrangeService
      .findBylist({
        ...pageOptions,
        searchWord: searchWord,
        startDate: date[0] ? moment(date[0]).format('YYYY-MM-DD') : '',
        endDate: date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
      })
      .then((res) => {
        setDataSource(res.data)
        setPageLoading(false)
      })
  }

  const onDetail = (record: any) => {}

  useEffect(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize, date, searchWord])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>假请列表查询</PageTitle>
        <Place />
        <span className='label'>年份:</span>
        <YearPicker value={year} onChange={(value: any) => setYear(value)} />
        <span className='label'>假请名称:</span>
        <Input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} style={{ width: 120 }} />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker
          allowClear={true}
          style={{ width: 220 }}
          value={date}
          onChange={(value) => setDate(value)}
        />

        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button
          onClick={() => {
            holidaysModal.show({})
          }}
        >
          添加
        </Button>
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
      <holidaysModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div``
