import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'
import { reportViewModal } from '../ReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { PageTitle } from 'src/components/common'

const { RangePicker } = DatePicker
export interface Props {}

export default observer(function Head() {
  return (
    <Wrapper>
      <LeftIcon>
          <PageTitle>查房计划表</PageTitle>
      </LeftIcon>
      <RightIcon>
      <span>查房日期：</span>
      <RangePicker
        style={{ width: 250 }}
        value={reportViewModal.selectedDate}
        onChange={(date) => {
          reportViewModal.selectedDate = date
          reportViewModal.onload()
        }}
      />

      <span>查房科室：</span>
      <Select
        value={reportViewModal.selectedDept}
        onChange={(val: string) => {
          reportViewModal.selectedDept = val
          reportViewModal.onload()
        }}
      >
        <Select.Option value=''>全院</Select.Option>
        {reportViewModal.deptList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span>类型：</span>
      <Select
        value={reportViewModal.selectedWardRound}
        onChange={(val: string) => {
          reportViewModal.selectedWardRound = val
          reportViewModal.onload()
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {reportViewModal.WardRoundList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span>状态：</span>
      <Select
        value={reportViewModal.selectedCheckState}
        onChange={(val: string) => {
          reportViewModal.selectedCheckState = val
          reportViewModal.onload()
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {reportViewModal.checkStateList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Place />

      <Button onClick={() => reportViewModal.onload()} className='checkButton'>查询</Button>
      </RightIcon>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
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
