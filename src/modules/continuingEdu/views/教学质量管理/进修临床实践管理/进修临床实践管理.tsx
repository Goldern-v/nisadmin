import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input, Select } from 'antd'
import { Place } from 'src/components/common'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'src/vendors/moment'
import BaseTabs from 'src/components/BaseTabs'
import { advancedManageServices } from './services/AdvancedManageServices'
import { appStore } from 'src/stores'
import qs from 'qs'

// const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export interface Props { }

export default function 进修临床实践管理() {

  const [query, setQuery] = useState({
    deptCode: '',
    pageIndex: 1,
    pageSize: 20,
    empName: '',
  })

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        query.pageSize * (query.pageIndex - 1) + idx + 1
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      align: 'center',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align: 'center',
      width: 120,
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 200,
    },
    {
      title: '参与人数',
      dataIndex: 'evalPersonCount',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'epStatusDesc',
      align: 'center',
      width: 80,
      render: (text) => {
        switch (text) {
          case '待开始':
            return <span style={{ color: '#70B603' }}>{text}</span>
          case '进行中':
            return <span style={{ color: '#F59A23' }}>{text}</span>
          default:
            return <span>{text}</span>
        }
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)

    advancedManageServices
    // .queryEvalPlanStatListByPage({
    //   ...query,
    //   beginTime: query.beginTime ? query.beginTime + ' 00:00' : '',
    //   endTime: query.endTime ? query.endTime + ' 24:00' : '',
    // })
    // .then(res => {
    //   if (res.data) {
    //     setTableData(res.data.list || [])
    //     setTotal(res.data.totalCount || 0)
    //   }

    //   setLoading(false)
    // }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {
    appStore.history
      .push(`/continuingEdu/进修临床实践管理详情?${qs.stringify({
        evalPlanId: record.id,
        title: record.title,
        submitTimeBegin: record.beginTime,
        submitTimeEnd: record.endTime,
        evalType: record.evalType,
      })}`)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  const TableCon =
    <BaseTable
      surplusHeight={260}
      loading={loading}
      dataSource={tableData}
      columns={columns}
      pagination={{
        current: query.pageIndex,
        pageSize: query.pageSize,
        total,
        onChange: () => (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: pageIndex }),
        onShowSizeChange: (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: 1, pageSize, })
      }} />

  return <Wrapper>
    <HeaderCon>
      <Title>护理教学质量评价</Title>
      <Place />
      <span>科室：</span>
      <Select value={query.deptCode}>
        <Option>全部</Option>
      </Select>
      <Input
        placeholder="请输入关键词"
        style={{ width: 150, marginRight: 10 }}
        defaultValue={query.empName}
        onBlur={(e) => setQuery({ ...query, empName: e.target.value })} />
      <Button onClick={() => setQuery({ ...query, pageIndex: 1 })}>查询</Button>
    </HeaderCon>
    <MainCon>
      {TableCon}
    </MainCon>
  </Wrapper>
}
const Wrapper = styled.div`
`

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  padding: 0 15px;
`