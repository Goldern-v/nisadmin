import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Modal } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import qs from 'qs'
import { starRatingReportService, ListQuery } from './api/StarRatingReportService'
import { numToChinese } from 'src/utils/number/numToChinese'

import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { useKeepAliveEffect } from 'react-keep-alive'

import ReportCreateModal from './components/ReportCreateModal'

export interface Props { }

const Option = Select.Option

export default observer(function NursingWorkPlainList() {
  const { history } = appStore
  //是否护士长
  const auth = authStore.isRoleManage

  const [query, setQuery] = useState({
    wardCode: '',
    pageIndex: 1,
    status: '',
    year: moment().format('YYYY'),
    month: '',
    pageSize: 15,
  })

  const [createVisible, setCreateVisible] = useState(false)

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
      dataIndex: 'reportName',
      title: '标题',
      align: 'left',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
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
      width: 110,
      render: (text: string, record: any, idx: number) => `${record.year}年${record.month}月`
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 90,
      render: (text: string, record: any, idx: number) => {
        if (record.status == '0') return '保存'
        if (record.status == '1') return '发布'
        return ''
      }
    },
    {
      dataIndex: 'creatorName',
      key: 'creatorName',
      title: '创建人',
      align: 'center',
      width: 80
    },
    {
      dataIndex: 'createTime',
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 140
    },
    {
      key: 'operate',
      title: '操作',
      width: 60,
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          {auth && <React.Fragment>
            <span onClick={() => handleEdit(record)}>查看</span>
          </React.Fragment>}
        </DoCon>
      }
    }
  ]

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

  const getList = (query: any) => {
    setLoading(true)
    starRatingReportService.getPage(query).then(res => {
      setLoading(false)
      if (res.data) {
        setTableData(res.data.list)
        setDataTotal(res.data.totalCount)
      }
    }, () => setLoading(false))
  }

  const handleCreate = () => {
    setCreateVisible(true)
  }

  const handleCancel = () => {
    setCreateVisible(false)
  }

  const handleOk = () => {
    handleCancel()
    getList(query)
  }

  const handleEdit = (record: any) => {
    history.push(`/starRatingReportEdit?${qs.stringify({
      wardCode: record.wardCode,
      year: record.year,
      month: record.month
    })}`)
  }

  useEffect(() => {
    if (query.wardCode) getList(query)
  }, [query])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      if (query.wardCode) getList(query)
    }
    return () => { }
  })

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>星级考核报表</PageTitle>
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
        <span>状态:</span>
        <Select
          value={query.status}
          onChange={(status: string) => setQuery({ ...query, status })}
          style={{ width: '95px' }}>
          <Option value=''>全部</Option>
          <Option value='0'>保存</Option>
          <Option value='1'>发布</Option>
        </Select>
        <span>科室:</span>
        <DeptSelect onChange={(wardCode) => setQuery({ ...query, wardCode })} />
        <Button onClick={handleSearch} type="primary">查询</Button>
        {auth && <Button type="primary" onClick={handleCreate}>添加</Button>}
        {/* <Button >导出</Button> */}
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleEdit(record)
          }
        }}
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
    <ReportCreateModal
      onOk={handleOk}
      visible={createVisible}
      onCancel={handleCancel} />
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
td{
  position: relative;
  word-break: break-all;
  .ellips{
    position: absolute;
    left:0;
    top: 0;
    height: 30px;
    line-height: 30px;
    right: 0;
    padding: 0 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
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