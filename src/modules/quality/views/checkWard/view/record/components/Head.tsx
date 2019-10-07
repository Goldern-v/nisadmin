import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'
import { recordViewModal } from '../RecordViewModal'
import { observer } from 'src/vendors/mobx-react-lite'

const { RangePicker } = DatePicker
export interface Props {}

export default observer(function Head() {
  return (
    <Wrapper>
      <span>查房日期：</span>
      <RangePicker
        style={{ width: 250 }}
        value={recordViewModal.selectedDate}
        onChange={(date) => {
          recordViewModal.selectedDate = date
          recordViewModal.onload()
        }}
      />

      <span>查房科室：</span>
      <Select
        value={recordViewModal.selectedDept}
        onChange={(val: string) => {
          recordViewModal.selectedDept = val
          recordViewModal.onload()
        }}
      >
        <Select.Option value=''>全院</Select.Option>
        {recordViewModal.deptList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span>类型：</span>
      <Select
        value={recordViewModal.selectedWardRound}
        onChange={(val: string) => {
          recordViewModal.selectedWardRound = val
          recordViewModal.onload()
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {recordViewModal.WardRoundList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span>状态：</span>
      <Select
        value={recordViewModal.selectedCheckState}
        onChange={(val: string) => {
          recordViewModal.selectedCheckState = val
          recordViewModal.onload()
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {recordViewModal.checkStateList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Place />

      <Button onClick={() => recordViewModal.onload()}>查询</Button>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
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
`
