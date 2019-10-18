import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
export interface Props { }

const RangePicker = DatePicker.RangePicker

export default function NursingWorkPlainList() {
  const [dateRange, setDateRange] = useState(crrentMonth() as any)

  const [query, setQuery] = useState({
    deptCode: '',
    pageIndex: 1,
    pageSize: 15,
    startDate: `${dateRange[0].format('YYYY-MM-DD')} 00:00`,
    endDate: `${dateRange[1].format('YYYY-MM-DD')} 23:59`,
  })

  const [dataTotal, setDataTotal] = useState(0)


  const handleRangeChange = (range: any) => {
    setDateRange(range)
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  useEffect(() => {
    if (query.deptCode && dateRange) {
      setQuery({
        ...query,
        startDate: `${dateRange[0].format('YYYY-MM-DD')} 00:00`,
        endDate: `${dateRange[1].format('YYYY-MM-DD')} 23:59`,
        pageIndex: 1
      })
    }
  }, [dateRange])

  useEffect(() => {
    console.log(query)
    if (query.deptCode && query.endDate && query.startDate) console.log('data')
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>护理工作计划</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          format="YYYY-MM-DD"
          value={dateRange}
          onChange={handleRangeChange}
          allowClear={false} />
        <span>科室:</span>
        <DeptSelect onChange={(deptCode) => setQuery({ ...query, deptCode })} />
        <Button type="primary">新建</Button>
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        surplusHeight={185}
        dataSource={[]}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
        columns={[] as ColumnProps<any>[]}
      />
    </TableWrapper>
  </Wrapper>
}
const TableWrapper = styled(TabledCon)`
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

`
const Wrapper = styled.div``

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
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