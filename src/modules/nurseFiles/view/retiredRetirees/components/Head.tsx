import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
export interface Props {}

export default function Head() {
  return (
    <Wrapper>
      <span>片区：</span>
      <Select>
        <Select.Option value='全部'>全部</Select.Option>
      </Select>
      <span>科室：</span>
      <Select>
        <Select.Option value='全部'>全部</Select.Option>
      </Select>
      <span>日期：</span>
      <RangePicker />
      <span>状态：</span>
      <Select>
        <Select.Option value='全部'>全部</Select.Option>
      </Select>
      <Place />
      <Button>查询</Button>
      <Button>导出</Button>
    </Wrapper>
  )
}
const Wrapper = styled(TableHeadCon)`
  .ant-select {
    width: 200px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
`
