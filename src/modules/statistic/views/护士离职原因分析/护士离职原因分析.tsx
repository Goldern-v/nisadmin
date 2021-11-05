import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Select, Spin } from 'antd'
import CommonLayout from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'src/vendors/moment'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
const RangePicker = DatePicker.RangePicker

const Option = Select.Option

export interface Props { }

export default observer(function 护士离职原因分析() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()

  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode: '',
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })

  const [data, setData] = useState([] as any)

  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'deptName',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '离职人数',
      width: 80,
      dataIndex: 'num',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '离职原因',
      dataIndex: 'remark',
      align: 'left',
      render: (text: any, record: any) => `${record.empName}: ${text || '(无)'}`
    },
    {
      title: '离职率',
      width: 80,
      dataIndex: 'quitRate',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
  ]

  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)

    statisticsApi.countLeaveRemark(query)
      .then((res: any) => {
        setLoading(false)
        if (res.data) {

          let newData = []

          for (let i = 0; i < res.data.length; i++) {
            let item0 = res.data[i]
            let deptName = item0.deptName

            let countLength = (item0.countUsers || []).length || 0

            if (item0.countUsers && countLength > 0)
              for (let j = 0; j < countLength; j++) {
                let item1 = item0.countUsers[j]
                let rowSpan = 0
                if (j == 0) rowSpan = countLength

                newData.push({ ...item0, ...item1, deptName, rowSpan })
              }
            else {
              newData.push({ ...item0, rowSpan: 1 })
            }
          }

          console.log(newData)

          setData(newData)
        }
      }, () => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [query])

  return <CommonLayout
    header={<div>
      <Select
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        <Option value={''}>全院</Option>
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
      <RangePicker
        className="content-item"
        style={{ width: 220 }}
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
          })
        }}
        allowClear={false} />
      <Button type="primary" onClick={handleSearch}>查询</Button>
    </div>}
    body={<Spin spinning={loading}>
      <div className="main-title">护士离职原因分析</div>
      <div className="sub-title">统计日期：{query.startDate} 至 {query.endDate}</div>
      <BaseTable
        surplusWidth={500}
        surplusHeight={320}
        columns={columns}
        dataSource={data} />
    </Spin>} />
})