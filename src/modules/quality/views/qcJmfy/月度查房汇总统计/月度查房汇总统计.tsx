import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { monthCheckWardSummaryStatisticsService } from './services/monthCheckWardSummaryStatisticsService'
import { ColumnProps } from 'src/vendors/antd'

const Option = Select.Option

export interface Props { }

export default function 月度查房汇总统计() {
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const [tableData, setTableData] = useState([] as any[])
  const [loading, setLoading] = useState(false)

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

  console.log(getMonthDates())

  const dateCols: ColumnProps<any>[] = [

  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '科室',
      key: 'wardName',
      width: 50,
      fixed: 'left',
      align: 'center',
    },
    ...dateCols,
    {
      title: '平均分',
      key: 'avg',
      width: 50,
      fixed: 'right',
      align: 'center',
    },
    {
      title: '月度排名',
      key: '月度排名',
      width: 50,
      fixed: 'right',
      align: 'center',
    },
  ]

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    month: moment().format('M'),
    formCode: 'SR0001',
    itemCode: 'SR0001019',
    wardCode: '',
  })

  const handleExport = () => {
    console.log('export')
  }

  const getTableData = () => {
    monthCheckWardSummaryStatisticsService
      .queryFormItemData(query)
      .then(res => {
        console.log(res)
      })
  }

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <PageHeader>
      <PageTitle>月度查房汇总统计</PageTitle>
      <Place />
      <span>年度：</span>
      <YearPicker
        style={{ width: 80 }}
        allowClear={false}
        className="mr-10"
        value={moment(query.year)}
        onChange={(_moment: moment.Moment) =>
          setQuery({
            ...query,
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
            month,
          })}>
        <Option value="">全部</Option>
        {monthList.map((month: string) => (
          <Option key={month}>{month}月</Option>
        ))}
      </Select>
      <Button type="primary">查询</Button>
      <Button onClick={() => handleExport()}>导出</Button>
    </PageHeader>
    <TableCon>
      <BaseTable
        surplusHeight={225}
        surplusWidth={1000}
        loading={loading}
        columns={columns} />
    </TableCon>
  </Wrapper>
}
const Wrapper = styled.div`
  .mr-10{
    margin-right: 10px;
  }
`
const TableCon = styled.div`
  padding: 0 15px;
`