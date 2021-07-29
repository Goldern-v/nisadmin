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
import { appStore, authStore } from 'src/stores'
import AdvancedManageEditModal from './components/AdvancedManageEditModal'
import qs from 'qs'

// const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export interface Props { }

export default function 进修临床实践管理() {

  const [query, setQuery] = useState({
    deptCode: '',
    highestEducation: '',
    pageIndex: 1,
    pageSize: 20,
    empName: '',
  })

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [editVisible, setEditVisible] = useState(false)
  const [editParams, setEditParams] = useState({})

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
      title: '姓名',
      dataIndex: 'empName',
      align: 'center',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 80,
      render: (sex: string) => sex === '0' ? '男' : '女'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: 80,
    },
    {
      title: '所在科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 180,
    },
    {
      title: '最高学历',
      dataIndex: 'highestEducation',
      align: 'center',
      width: 100,
    },
    {
      title: '进修开始时间',
      dataIndex: 'startDate',
      align: 'center',
      width: 120,
    },
    {
      title: '进修结束时间',
      dataIndex: 'endDate',
      align: 'center',
      width: 120,
    },
    {
      title: '进修专科',
      dataIndex: 'juniorCollege',
      align: 'center',
      width: 150,
    },
    {
      title: '主办单位',
      dataIndex: 'organizer',
      align: 'center',
      width: 150,
    },
    {
      title: '工作计划',
      dataIndex: 'workPlanState',
      align: 'center',
      width: 80,
      render: (workPlanState: number) => {
        switch (workPlanState) {
          case 1:
            return <span style={{ color: '#70B603' }}>已填写</span>
          case 0:
            return <span style={{ color: '#F59A23' }}>未填写</span>
          default:
            return <span>{workPlanState}</span>
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
      .getPageAdvancedList(query)
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
      .push(`/continuingEdu/进修临床实践详情?${qs.stringify({
        evalPlanId: record.id,
        juniorCollege: record.juniorCollege,
        title: record.title,
        deptName: record.deptName,
        empNo: record.empNo,
        empName: record.empName,
        startDate: record.startDate,
        endDate: record.endDate,
      })}`)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  const TableCon =
    <BaseTable
      surplusHeight={225}
      surplusWidth={1000}
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
      <Title>进修临床实践管理</Title>
      <Place />
      <span>科室：</span>
      <Select
        style={{ width: 220, marginRight: 10 }}
        value={query.deptCode}
        onChange={(deptCode: string) =>
          setQuery({ ...query, deptCode, pageIndex: 1 })}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value="">全部</Option>
        {authStore.deptList.map((item: any, idx: number) => (
          <Option key={idx} value={item.code}>{item.name}</Option>
        ))}
      </Select>
      <span>最高学历：</span>
      <Select
        value={query.highestEducation}
        style={{ marginRight: 10 }}
        onChange={(highestEducation: string) =>
          setQuery({ ...query, highestEducation, pageIndex: 1 })}>
        <Option value="">全部</Option>
        <Option value="中专">中专</Option>
        <Option value="大专">大专</Option>
        <Option value="本科">本科</Option>
        <Option value="研究生">研究生</Option>
        <Option value="博士">博士</Option>
      </Select>
      <Input
        placeholder="请输入关键词"
        style={{ width: 150, marginRight: 10 }}
        defaultValue={query.empName}
        onBlur={(e) => setQuery({ ...query, empName: e.target.value })} />
      <Button
        style={{ marginRight: 10 }}
        type="primary"
        onClick={() => setQuery({ ...query, pageIndex: 1 })}>
        查询
      </Button>
      <Button
        onClick={() => {
          setEditVisible(true)
          setEditParams({})
        }}>
        新建
      </Button>
    </HeaderCon>
    <MainCon>
      {TableCon}
    </MainCon>
    <AdvancedManageEditModal
      visible={editVisible}
      orginData={editParams}
      onCancel={() => setEditVisible(false)}
      onOk={() => {
        setEditVisible(false)
        getTableData()
      }} />
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