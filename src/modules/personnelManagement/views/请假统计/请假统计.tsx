import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {
  Button, DatePicker,
  // message, Select 
} from 'antd'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import moment from 'src/vendors/moment'
import { observer } from 'mobx-react'
import BaseTable from 'src/components/BaseTable'
import { leaveStatisticsService } from './service/LeaveStatisticsService'

const RangePicker = DatePicker.RangePicker
// const Option = Select.Option

export interface Props { }

export default observer(function 请假统计() {
  // const { deptList } = authStore
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    // deptCode: '',
    queryBeginTime: _currentMonth[0].format('YYYY-MM-DD'),
    queryEndTime: _currentMonth[1].format('YYYY-MM-DD'),
  })

  const [tableData, setTableData] = useState([] as any[])

  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'deptCode',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        idx + 1
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 180,
    },
    {
      title: '请假总数',
      dataIndex: 'totalLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '事假数',
      dataIndex: 'personalLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '病假数',
      dataIndex: 'sickLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '年假数',
      dataIndex: 'annualLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '婚假数',
      dataIndex: 'maritalLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '产假数',
      dataIndex: 'maternityLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '陪产假数',
      dataIndex: 'paternityLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '丧假数',
      dataIndex: 'funeralLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '调休数',
      dataIndex: 'compensatoryLeaveCount',
      align: 'center',
      width: 80,
    },
    {
      title: '其他数',
      dataIndex: 'otherLeaveCount',
      align: 'center',
      width: 80,
    },
  ]

  const getTableData = () => {
    setLoading(true)

    leaveStatisticsService
      .queryStatDatasGroupByDept(query)
      .then(res => {
        setLoading(false)
        setTableData(res.data || [])
      }, () => setLoading(false))
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
              link: '/personnelManagement/请假管理/请假统计'
            },
            {
              name: '请假统计'
            }
          ]}
        />
        <div className="float-left">请假统计</div>
        <div className="float-right">
          <span className="item">
            <span className="label">请假时间：</span>
            <span className="content">
              <RangePicker
                className="content-item"
                style={{ width: 220 }}
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
                  })
                }}
                allowClear={false} />
            </span>
          </span>
          {/* <span className="item">
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
          </span> */}
          <span className="item">
            <Button
              loading={loading}
              onClick={() => setQuery({ ...query })}>
              查询
            </Button>
          </span>
        </div>
      </div>
    </div>
    <div className="main">
      <div className="table-content">
        <BaseTable
          surplusHeight={190}
          surplusWidth={500}
          columns={columns}
          loading={loading}
          dataSource={tableData} />
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