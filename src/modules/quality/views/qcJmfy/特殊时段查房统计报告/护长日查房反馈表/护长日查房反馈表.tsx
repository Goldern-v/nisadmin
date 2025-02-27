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
import { dayNursingCheckWard } from './services/护长日查房反馈表_service'

const Option = Select.Option

export interface Props { }

export default function 护长日查房反馈表() {
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    month: moment().format('M'),
    status: '',
    pageIndex: 1,
    pageSize: 20,
    date: '',
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

  const getMonthDates = () => {
    if (!query.month) {
      return []
    } else {
      let fullDate = moment(`${query.year}-${Number(query.month) + 1}-1`).subtract(1).get('date')
      let dateArr = []
      do {
        dateArr.unshift(fullDate.toString())
        fullDate--
      } while (fullDate > 0)
      return dateArr
    }
  }

  const getTableData = () => {
    setLoading(true)

    dayNursingCheckWard.queryList(query)
      .then(res => {
        setLoading(false)
        setTableData(res.data.list)
        setTotal(res.data.totalCount || 0)
      }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {

  }

  useEffect(() => {
    getTableData()
  }, [query])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP')
      getTableData()

    return () => { }
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
            month,
            date: ''
          })}>
        <Option value="">全部</Option>
        {monthList.map((month: string) => (
          <Option key={month}>{month}月</Option>
        ))}
      </Select>
      <span>日期：</span>
      <Select
        className="mr-10"
        style={{ width: 75 }}
        value={query.date}
        onChange={(date: string) =>
          setQuery({
            ...query,
            pageIndex: 1,
            date
          })}>
        <Option value="">全部</Option>
        {getMonthDates().map((date: string) => (
          <Option key={date} value={date}>{date}日</Option>
        ))}
      </Select>
      <span>状态：</span>
      <Select value={query.status} className="mr-10">
        <Option value="">全部</Option>
        <Option value="commit">提交</Option>
        <Option value="nursing_minister_audit">护理部审核</Option>
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