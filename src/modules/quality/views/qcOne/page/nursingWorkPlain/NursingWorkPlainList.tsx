import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Modal } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import { nursingWorkPlainService, ListQuery } from './api/NursingWorkPlainService'
import { numToChinese } from 'src/utils/number/numToChinese'

import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

import WorkPlainEditModal from './components/WorkPlainEditModal'

export interface Props { }

const Option = Select.Option

export default observer(function NursingWorkPlainList() {
  //是否护士长
  const auth = authStore.isRoleManage

  const [query, setQuery] = useState({
    wardCode: '',
    pageIndex: 1,
    type: '',
    year: moment().format('YYYY'),
    month: moment().format('M'),
    pageSize: 15,
  })

  const [editParmas, setEditParmas] = useState({
    year: '',
    month: '',
    type: '1',
    indexInType: '',
    content: '',
    wardName: '',
    wardCode: ''
  } as any)

  const [editVisible, setEditVisible] = useState(false)

  const [tableData, setTableData] = useState([] as any[])

  const [loading, setLoading] = useState(false)

  const [dataTotal, setDataTotal] = useState(0)

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        (query.pageIndex - 1) * query.pageSize + idx + 1
    },
    {
      dataIndex: 'wardName',
      key: 'wardName',
      title: '科室',
      width: 180,
    },
    {
      key: 'month',
      title: '月份',
      align: 'center',
      width: 150,
      render: (text: string, record: any, idx: number) => `${record.year}年${record.month}月`
    },
    {
      key: 'type',
      title: '分类',
      align: 'center',
      width: 100,
      render: (text: string, record: any, idx: number) => {
        if (record.type == '1') return '月计划'
        if (record.type == '2') return `第${numToChinese(record.indexInType)}周`
        return ''
      }
    },
    {
      dataIndex: 'content',
      key: 'content',
      title: '内容',
      align: 'left',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
    },
    {
      dataIndex: 'creatorName',
      key: 'creatorName',
      title: '创建人',
      align: 'left',
      width: 80
    },
    {
      dataIndex: 'createTime',
      key: 'createTime',
      title: '创建时间',
      width: 120
    },
  ]

  if (auth) columns.push({
    key: 'operate',
    title: '操作',
    width: 120,
    render: (text: string, record: any) => {
      return <DoCon className="operate-group">
        <span className="edit" onClick={() => handleEdit(record)}>编辑</span>
        <span className="delete" onClick={() => handleDelete(record)}>删除</span>
      </DoCon>
    }
  })

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const getList = (query: ListQuery) => {
    setLoading(true)
    nursingWorkPlainService.getPage(query).then(res => {
      setLoading(false)
      if (res.data) {
        setTableData(res.data.list)
        setDataTotal(res.data.totalCount)
      }
    }, () => setLoading(false))
  }

  const handleCreate = () => {
    setEditParmas({
      year: moment().format("YYYY"),
      month: moment().format("M"),
      type: '1',
      indexInType: '',
      content: '',
      wardCode: '',
      wardName: ''
    })

    setTimeout(() => setEditVisible(true))
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该计划?',
      onOk: () => {
        setLoading(true)
        nursingWorkPlainService.delete({
          wardCode: record.wardCode,
          year: record.year,
          month: record.month,
          type: record.type,
          indexInType: record.indexInType,
        })
          .then(res => {
            getList(query)
          }, () => setLoading(false))
      }
    })
  }

  const handleEdit = (record: any) => {
    setEditParmas({
      year: record.year,
      month: record.month,
      type: record.type,
      indexInType: record.type == '2' ? record.indexInType : '',
      content: record.content,
      wardName: record.wardName,
      wardCode: record.wardCode
    })

    setTimeout(() => setEditVisible(true))
  }

  const handleCancel = () => {
    setEditVisible(false)
  }

  const handleOk = () => {
    handleCancel()
    getList(query)
  }

  useEffect(() => {
    if (query.wardCode) getList(query)
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>护理工作计划</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>年份:</span>
        <span className="year-select">
          <YearPicker
            allowClear={false}
            value={moment(query.year) || undefined}
            onChange={(newMoment: any) => {
              if (newMoment)
                setQuery({ ...query, year: newMoment.format('YYYY') })
              else
                setQuery({ ...query, year: '' })
            }} />
        </span>
        <span>月份:</span>
        <Select
          value={query.month}
          onChange={(month: string) => setQuery({ ...query, month })}
          className="month-select">
          <Option value="">全部</Option>
          {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
        </Select>
        <span>类型:</span>
        <Select
          value={query.type}
          onChange={(type: string) => setQuery({ ...query, type })}
          style={{ width: '95px' }}>
          <Option value="">全部</Option>
          <Option value="1">月计划</Option>
          <Option value="2">周计划</Option>
        </Select>
        <span>科室:</span>
        <DeptSelect onChange={(wardCode) => setQuery({ ...query, wardCode })} />
        <Button onClick={handleSearch}>查询</Button>
        {auth && <Button type="primary" onClick={handleCreate}>添加</Button>}
        <Button >导出</Button>
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        surplusHeight={225}
        dataSource={tableData}
        loading={loading}
        columns={columns}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
      />
    </TableWrapper>
    <WorkPlainEditModal
      onOk={handleOk}
      title={editParmas.content ? "添加计划" : "修改计划"}
      visible={editVisible}
      onCancel={handleCancel}
      query={editParmas} />
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
td{
  word-break: break-all;
}
`

const HeaderCon = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .month-select{
    width: 70px;
  }
  .year-select{
    width: 100px;
    display:inline-block;
  }
`
const Wrapper = styled.div`
  .operate-group{
    .delete{
      color: red;
    }
  }
`

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`