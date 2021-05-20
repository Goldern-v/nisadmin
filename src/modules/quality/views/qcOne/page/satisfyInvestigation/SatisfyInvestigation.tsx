import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, Select } from 'antd'
import { Place } from 'src/components/common'
import moment from 'moment'
import qs from 'qs'
import YearPicker from 'src/components/YearPicker'
import { useKeepAliveEffect } from 'react-keep-alive'
import { appStore, authStore } from 'src/stores'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'mobx-react'

const Option = Select.Option

export interface Props { }

export default observer(function SatisfyInvestigation() {
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const { deptList } = authStore

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    month: '',
    wardCode: '',
  })

  const [tableData, setTableData] = useState([] as any[])

  const [editVisible, setEditVisible] = useState(false)
  const [editId, setEditId] = useState('')

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      dataIndex: 'reportName',
      title: '标题',
      align: 'left',
    },
    {
      dataIndex: 'deptName',
      title: '科室',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'month',
      title: '月份',
      width: 120,
      align: 'center',
      render: (text: string, record: any) => `${record.year}年${record.month}月`
    },
    {
      dataIndex: '状态',
      title: '状态',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'creatorName',
      title: '创建人',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'createDate',
      title: '创建时间',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'operate',
      title: '操作',
      width: 120,
      align: 'center',
      render: (text: string, record: any) => <DoCon>
        <span onClick={() => handleReview(record)}>查看</span>
        <span onClick={() => handleEdit(record)}>修改</span>
        <span onClick={() => handleDelete(record)}>删除</span>
      </DoCon>

    }
  ]

  const handleReview = (record: any) => {
    appStore.history.push(`/qcOne/satisfyInvestigationDetail?id=${record.id}`)
  }

  const handleEdit = (record: any) => {

  }

  const handleDelete = (record: any) => {

  }

  const getTableData = () => {
    console.log('getData')
  }

  useKeepAliveEffect(() => {
    if (
      appStore.history &&
      (appStore.history.action === 'POP' || appStore.history.action === 'PUSH')
    ) {
      getTableData()
    }
    return () => { }
  })

  return <Wrapper>
    <HeaderCon>
      <Title>护士满意度调查表</Title>
      <Place />
      <span>年份：</span>
      <YearPicker
        className="mr-10"
        style={{ width: 80 }}
        allowClear={false}
        value={moment(query.year)}
        onChange={(val: any) => setQuery({ ...query, year: val.format('YYYY') })} />
      <span>月份：</span>
      <Select
        className="mr-10"
        value={query.month}>
        <Option value=''>全部</Option>
        {monthList.map((month: any) => <Option value={month} key={month}>{month}月</Option>)}
      </Select>
      <span>科室：</span>
      <Select
        className="mr-10"
        style={{ width: '176px' }}
        showSearch
        value={query.wardCode}
        onChange={(wardCode: string) => setQuery({ ...query, wardCode })}
        filterOption={(input: string, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        <Option value=''>全部</Option>
        {deptList.map((item) =>
          <Option value={item.code} key={item.code}>{item.name}</Option>)}
      </Select>
      <Button type="primary" className="mr-10">查询</Button>
      <Button className="mr-10">导出</Button>
      <Button>新建</Button>
    </HeaderCon>
    <MainCon>
      <BaseTable
        surplusHeight={205}
        dataSource={tableData}
        columns={columns} />
    </MainCon>
  </Wrapper>
})

const Wrapper = styled.div`
`

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

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  padding: 0 15px;
`