import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import moment from 'moment'
import { ColumnProps } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { useKeepAliveEffect } from 'react-keep-alive'
import { Place } from 'src/components/common'
import YearPicker from 'src/components/YearPicker'

const Option = Select.Option

export interface Props { }

export default function 护长日查房反馈表() {
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    month: '',
    status: '',
    pageIndex: 1,
    pageSize: 20,
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
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看</span>
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)
    console.log('getTableData', query)
    setLoading(false)
  }

  const handleDetail = (record: any) => {

  }

  useEffect(() => {
    getTableData()
  }, [query])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP')
      getTableData()
  })

  return <Wrapper>
    <HeaderCon>
      <Title>护长日查房汇总统计</Title>
      <Place />
      <span>年份：</span>
      <YearPicker
        style={{ width: 80 }}
        allowClear={false}
        className="mr-10"
        value={moment(query.year)}
        onChange={(_moment: moment.Moment) =>
          setQuery({
            ...query,
            pageIndex: 1,
            year: _moment.format('YYYY')
          })} />
      <span>月份：</span>
      <Select
        className="mr-10"
        style={{ width: 75 }}
        value={query.month}
        onChange={(month: string) =>
          setQuery({
            ...query,
            pageIndex: 1,
            month
          })}>
        <Option value="">全部</Option>
        {monthList.map((month: string) => (
          <Option key={month}>{month}月</Option>
        ))}
      </Select>
      <span>状态：</span>
      <Select value={query.status}>
        <Option value="">全部</Option>
        <Option value="待护理部审核">待护理部审核</Option>
        <Option value="通过">通过</Option>
        <Option value="驳回">驳回</Option>
      </Select>
      <Button
        className="mr-10"
        onClick={() => setQuery({ ...query, pageIndex: 1 })}>
        查询
      </Button>
      <Button type="primary">新建</Button>
    </HeaderCon>
    <TableCon>
      <BaseTable
        surplusHeight={225}
        loading={loading}
        dataSource={tableData}
        columns={columns}
        onRow={(record) => {
          return {
            onDoubleClick: () => handleDetail(record)
          }
        }}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total,
          onChange: () => (pageIndex: number, pageSize: number) =>
            setQuery({ ...query, pageIndex: pageIndex }),
          onShowSizeChange: (pageIndex: number, pageSize: number) =>
            setQuery({ ...query, pageIndex: 1, pageSize, })
        }} />
    </TableCon>

  </Wrapper>
}

const Wrapper = styled.div``

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
  .mr-10{
    margin-right: 10px;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const TableCon = styled.div`
  padding: 0 15px;
`