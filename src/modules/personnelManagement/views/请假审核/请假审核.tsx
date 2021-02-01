import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, message, Select } from 'antd'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import moment from 'src/vendors/moment'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react'
import BaseTable, { DoCon } from 'src/components/BaseTable'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export interface Props { }

export default observer(function 请假审核() {
  const { deptList } = authStore
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    type: '',
    status: '',
    deptCode: '',
    beginDate: currentMonth()[0],
    endDate: currentMonth()[1],
    pageIndex: 1,
    pageSize: 20,
  })

  const [tableData, setTableData] = useState([] as any[])

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const typeList = [
    { name: '事假', code: '1' },
    { name: '病假', code: '2' },
    { name: '年假', code: '3' },
    { name: '婚假', code: '4' },
    { name: '产假', code: '5' },
    { name: '陪产假', code: '6' },
    { name: '丧假', code: '7' },
    { name: '调休', code: '8' },
    { name: '其他', code: '9' },
  ]

  const statusList = [
    { name: '审核通过', code: '1' },
    { name: '审核驳回', code: 'w' },
    { name: '待审核', code: 'e' },
  ]

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
      title: '申请人',
      dataIndex: 'empName',
      align: 'center',
      width: 80,
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 80,
    },
    {
      title: '请假类型',
      dataIndex: 'type',
      align: 'center',
      width: 80,
    },
    {
      title: '开始时间',
      dataIndex: 'beginDate',
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
      title: '请假时长',
      dataIndex: '请假时长',
      align: 'center',
      width: 80,
    },
    {
      title: '请假事由',
      dataIndex: '请假事由',
      align: 'center',
      width: 180,
    },
    {
      title: '审核状态',
      dataIndex: '审核状态',
      align: 'center',
      width: 80,
    },
    {
      title: '审核操作',
      dataIndex: '审核操作',
      align: 'center',
      width: 80,
      render: (text: any) => {
        return <DoCon>
          <span>审核</span>
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    let randomSec = Math.random() / 4 * 10
    setLoading(true)

    setTimeout(() => {
      setSelectedRowKeys([])
      setTableData([])
      setTotal(0)
      setLoading(false)
    }, randomSec * 1000)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <div className="top">
      <div className="topbar">
        <BreadcrumbBox
          data={[
            {
              name: '请假管理',
              link: '/personnelManagement/请假管理/请假审核'
            },
            {
              name: '请假审核'
            }
          ]}
        />
        <div className="float-left">请假审核</div>
        <div className="float-right">
          <span className="item">
            <span className="label">请假时间：</span>
            <span className="content">
              <RangePicker
                className="content-item"
                style={{ width: 220 }}
                value={[moment(query.beginDate), moment(query.endDate)]}
                ranges={{
                  '本月': _currentMonth,
                  '本季度': _currentQuater,
                  '本年度': _currentYear,
                }}
                onChange={(payload: any) => {
                  setQuery({
                    ...query,
                    beginDate: payload[0].format('YYYY-MM-DD'),
                    endDate: payload[1].format('YYYY-MM-DD'),
                    pageIndex: 1,
                  })
                }}
                allowClear={false} />
            </span>
          </span>
          <span className="item">
            <span className="label">科室：</span>
            <span className="content">
              <Select
                style={{ minWidth: 180 }}
                className="content-item"
                value={query.deptCode}
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={(deptCode: string) => setQuery({ ...query, deptCode, pageIndex: 1 })}>
                <Option value={''}>全部</Option>
                {deptList.map((dept: any, idx: number) =>
                  <Option key={idx} value={dept.code}>{dept.name}</Option>
                )}
              </Select>
            </span>
          </span>
          <span className="item">
            <span className="label">请假类型：</span>
            <span className="content">
              <Select
                style={{ minWidth: 80 }}
                value={query.type}
                onChange={(type: string) => setQuery({ ...query, type, pageIndex: 1 })}>
                <Option value={''}>全部</Option>
                {typeList.map((item: any, idx: number) => (
                  <Option key={idx} value={item.code}>{item.name}</Option>
                ))}
              </Select>
            </span>
          </span>
          <span className="item">
            <span className="label">状态：</span>
            <span className="content">
              <Select
                style={{ minWidth: 80 }}
                value={query.status}
                onChange={(status: string) => setQuery({ ...query, status, pageIndex: 1 })}>
                <Option value={''}>全部</Option>
                {statusList.map((item: any, idx: number) => (
                  <Option key={idx} value={item.code}>{item.name}</Option>
                ))}
              </Select>
            </span>
          </span>
          <span className="item">
            <Button
              loading={loading}
              onClick={() => setQuery({ ...query, pageIndex: 1 })}>
              查询
            </Button>
          </span>
          <span className="item">
            <Button
              disabled={loading}
              onClick={() => {
                if (selectedRowKeys.length <= 0) message.warn('未勾选审核条目')
              }}
              type="primary">
              批量审核
            </Button>
          </span>
        </div>
      </div>
    </div>
    <div className="main">
      <div className="table-content">
        <BaseTable
          surplusHeight={220}
          columns={columns}
          loading={loading}
          dataSource={tableData}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys: any, selectedRows: any) => {
              setSelectedRowKeys(selectedRows)
            }
          }}
          pagination={{
            pageSize: query.pageSize,
            current: query.pageIndex,
            total,
            onChange: () => (pageIndex: number, pageSize: number) =>
              setQuery({ ...query, pageIndex: pageIndex }),
            onShowSizeChange: (pageIndex: number, pageSize: number) =>
              setQuery({ ...query, pageIndex: 1, pageSize, })
          }} />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  background: #fff;

  .top {
    margin-top: -80px;
    /* // padding: 10px 15px; */
    height: 68px;
    .nav {
      margin-bottom: 5px;
    }
    .topbar {
      overflow: hidden;
      .float-left {
        float: left;
        font-size: 20px;
        line-height: 32px;
        font-weight: bold;
        margin-left: 15px;
      }
      .float-right {
        float: right;
        margin-right: 15px;
        .item {
          margin-left: 10px;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    padding-top: 0;
    .table-content {
      height: 100%;
      background: #fff;
    }
  }
`