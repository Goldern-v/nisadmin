import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import { Place } from 'src/components/common'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'src/vendors/moment'

const RangePicker = DatePicker.RangePicker

export interface Props { }

export default function 护理教学质量评价详情() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    queryBeginTime: _currentMonth[0].format('YYYY-MM-DD'),
    queryEndTime: _currentMonth[1].format('YYYY-MM-DD'),
    pageIndex: 1,
    pageSize: 20,
    keyWord: '',
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
        query.pageSize * (query.pageIndex - 1) + 1
    },
    {
      title: '姓名',
      dataIndex: '姓名',
      align: 'center',
      width: 120,
    },
    {
      title: '性别',
      dataIndex: '性别',
      align: 'center',
      width: 80,
    },
    {
      title: '年龄',
      dataIndex: '年龄',
      align: 'center',
      width: 80,
    },
    {
      title: '最高学历',
      dataIndex: '最高学历',
      align: 'center',
      width: 80,
    },
    {
      title: '毕业院校',
      dataIndex: '毕业院校',
      align: 'center',
      width: 120,
    },
    {
      title: '专业',
      dataIndex: '专业',
      align: 'center',
      width: 80,
    },
    {
      title: '专业',
      dataIndex: '专业',
      align: 'center',
      width: 80,
    },
    {
      title: '实习科室',
      dataIndex: '实习科室',
      align: 'center',
      width: 80,
    },
    {
      title: '提交时间',
      dataIndex: '提交时间',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: '状态',
      align: 'center',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: () => {
        return <DoCon>
          <span>查看详情</span>
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)

    setLoading(false)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <Title>护理教学质量评价详情</Title>
      <Place />
      <span>提交日期：</span>
      <RangePicker
        className="content-item"
        style={{ width: 220, marginRight: 10 }}
        value={[moment(query.queryBeginTime), moment(query.queryEndTime)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            queryBeginTime: payload[0].format('YYYY-MM-DD'),
            queryEndTime: payload[1].format('YYYY-MM-DD'),
            pageIndex: 1,
          })
        }}
        allowClear={false} />
      <Input
        placeholder="请输入关键词"
        style={{ width: 150, marginRight: 10 }}
        defaultValue={query.keyWord}
        onBlur={(e) => setQuery({ ...query, keyWord: e.target.value })} />
      <Button style={{ marginRight: 10 }} type="primary">查询</Button>
      <Button>返回</Button>
    </HeaderCon>
    <MainCon>
      <div style={{ padding: '10px 15px 0 15px', lineHeight: '24px' }}>
        <span>开始时间：2019-07-02  </span>
        <span>类型：规培生评教  </span>
        <span>参与人员：35人</span>
      </div>
      <BaseTable
        surplusHeight={260}
        surplusWidth={200}
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
  margin: 0 15px;
  border-radius: 2px;
  background: #fff;
`