import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { PageTitle, Place, PageHeader } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { ColumnProps, DatePicker } from 'src/vendors/antd'
import { qcFormGzsrmService } from './api/qcFormGzsrmService'
import { appStore } from 'src/stores'
import moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'

const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 问题原因措施汇总() {
  const { queryObj } = appStore
  const [startDate, endDate] = currentMonth()

  const [query, setQuery] = useState({
    qcLevel: queryObj.qclevel || '3',
    beginDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
  })

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      align: 'center',
      width: 180,
      render: (text: string, record: any) => ({
        props: { rowSpan: record.rowSpan1 || 0, },
        children: text
      }),
    },
    {
      title: '年月',
      dataIndex: 'yearAndMonth',
      align: 'center',
      width: 100,
      render: (text: string, record: any) => ({
        props: { rowSpan: record.rowSpan1 || 0, },
        children: text
      }),
    },
    {
      title: '重点内容（质控、教学、日常管理）',
      dataIndex: 'groupName',
      align: 'center',
      width: 120,
    },
    {
      title: '存在问题',
      dataIndex: 'problem',
      align: 'left',
      width: 200,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '原因分析',
      dataIndex: 'cause',
      align: 'left',
      width: 220,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '整改措施',
      dataIndex: 'measure',
      align: 'left',
      width: 220,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '质控、教学、日常管理复查情况（含上周一级质控存在问题）',
      dataIndex: 'rectificationResult',
      align: 'left',
      width: 220,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
  ]

  const formatGroupTableData = (orginData: any[]) => {
    let formatList = [...orginData] as any[]
    let currentWardCode = ''
    let currentYearAndMonth = ''
    let currentWardItem = null as any
    let currentYearAndMonthItem = null as any

    formatList.forEach((item: any) => {
      let wardCode = item.wardCode
      let yearAndMonth = item.yearAndMonth
      if (currentWardCode === wardCode) {
        currentWardItem.rowSpan0++

        if (currentYearAndMonth === yearAndMonth) {
          currentYearAndMonthItem.rowSpan1++
        } else {
          currentYearAndMonth = yearAndMonth
          currentYearAndMonthItem = item
          item.rowSpan1 = 1
        }
      } else {
        currentWardItem = item
        currentYearAndMonthItem = item
        currentWardCode = wardCode
        currentYearAndMonth = yearAndMonth
        item.rowSpan0 = 1
        item.rowSpan1 = 1
      }
    })

    return formatList
  }

  const getTableData = () => {
    setLoading(true)
    qcFormGzsrmService
      .problemCauseMeasureSummary(query)
      .then(res => {
        let data = res.data
        let newTableData = formatGroupTableData(data)

        setTableData(newTableData)
        setLoading(false)
      }, () => setLoading(false))
  }

  const handleExport = () =>
    qcFormGzsrmService
      .problemCauseMeasureSummaryExport(query)

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <PageHeader>
      <PageTitle>{numToChinese(Number(queryObj.qclevel || '3'))}质控问题原因措施汇总</PageTitle>
      <Place></Place>
      <span>汇总时间：</span>
      <RangePicker
        allowClear={false}
        style={{ width: 220, marginRight: 15 }}
        value={[moment(query.beginDate), moment(query.endDate)]}
        onChange={([moment0, moment1]: any[]) =>
          setQuery({
            ...query,
            beginDate: moment0.format('YYYY-MM-DD'),
            endDate: moment1.format('YYYY-MM-DD')
          })} />
      <Button onClick={() => getTableData()} type="primary">查询</Button>
      <Button onClick={() => handleExport()}>导出</Button>
    </PageHeader>
    <TableCon>
      <BaseTable
        loading={loading}
        surplusWidth={1000}
        surplusHeight={185}
        dataSource={tableData}
        columns={columns}
      />
    </TableCon>
  </Wrapper>
})

const Wrapper = styled.div``

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
  padding: 0 15px;
`

const PreCon = styled.pre`
  padding-top: 2px;
  word-wrap: break-word;
  white-space: pre-wrap;
`