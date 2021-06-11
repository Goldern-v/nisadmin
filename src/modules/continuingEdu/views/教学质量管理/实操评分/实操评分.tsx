import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import { Place } from 'src/components/common'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'src/vendors/moment'
import BaseTabs from 'src/components/BaseTabs'
import { practicalScoreEvalService } from './services/PracticalScoreEvalService'
import { appStore } from 'src/stores'
import qs from 'qs'
import { practicalTypeGroup } from './data/practicalType'
import 实操评分添加 from './components/实操评分添加'
import 操作技术评分标准预览 from './components/操作技术评分标准预览'

const RangePicker = DatePicker.RangePicker

export interface Props { }

export default function 实操评分() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    practicalType: '1' as '1' | '2' | '3',
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
    pageIndex: 1,
    pageSize: 20,
    title: '',
  })

  const [activeTab, setActiveTab] = useState('1')

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [addModalVisible, setAddModalVisible] = useState(false)
  const [templatesModalVisible, setTemplatesModalVisible] = useState(false)

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
      dataIndex: 'startDate',
      align: 'center',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
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
      dataIndex: 'participantsList',
      align: 'center',
      width: 80,
      render: (participantsList: any[]) => (participantsList || []).length
    },
    {
      title: '状态',
      dataIndex: 'practicalState',
      align: 'center',
      width: 80,
      render: (text) => {
        switch (text) {
          case 1:
            return <span style={{ color: '#F59A23' }}>未开始</span>
          case 2:
            return <span style={{ color: '#70B603' }}>进行中</span>
          case 3:
            return <span>已结束</span>
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

    practicalScoreEvalService
      .getPracticalScorePageList({
        ...query,
        startDate: query.startDate ? query.startDate + ' 00:00' : '',
        endDate: query.endDate ? query.endDate + ' 24:00' : '',
      })
      .then(res => {
        if (res.data) {
          setTableData(res.data.list || [])
          setTotal(res.data.totalCount || 0)
        }

        setLoading(false)
      }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {
    appStore.history
      .push(`/continuingEdu/实操评分详情?${qs.stringify({
        id: record.id,
        title: record.title,
        startDate: record.startDate,
        endDate: record.endDate,
        practicalType: record.practicalType,
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

  return <Wrapper>
    <HeaderCon>
      <Title>实操评分</Title>
      <Place />
      <span>提交日期：</span>
      <RangePicker
        className="content-item"
        style={{ width: 220, marginRight: 10 }}
        value={[moment(query.startDate), moment(query.endDate)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startDate: payload[0].format('YYYY-MM-DD'),
            endDate: payload[1].format('YYYY-MM-DD'),
            pageIndex: 1,
          })
        }}
        allowClear={false} />
      <Input
        placeholder="请输入关键词"
        style={{ width: 150, marginRight: 10 }}
        defaultValue={query.title}
        onBlur={(e) => setQuery({ ...query, title: e.target.value })} />
      <Button
        style={{ marginRight: 10 }}
        onClick={() =>
          setQuery({ ...query, pageIndex: 1 })}>
        查询
      </Button>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => setAddModalVisible(true)}>
        新增
      </Button>
      <Button onClick={() => setTemplatesModalVisible(true)}>表管理</Button>
    </HeaderCon>
    <MainCon>
      <BaseTabs
        defaultActiveKey={activeTab}
        config={Object.keys(practicalTypeGroup).map((key: any) => ({
          title: practicalTypeGroup[key].name,
          index: key,
          component: TableCon,
        }))}
        onChange={(key: any) => {
          setActiveTab(key)
          setQuery({ ...query, pageIndex: 1, practicalType: key })
        }} />
    </MainCon>
    <实操评分添加
      visible={addModalVisible}
      onOk={() => {
        getTableData()
        setAddModalVisible(false)
      }}
      onClose={() => null}
      onCancel={() => setAddModalVisible(false)} />
    <操作技术评分标准预览
      visible={templatesModalVisible}
      onCancel={() => setTemplatesModalVisible(false)} />
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