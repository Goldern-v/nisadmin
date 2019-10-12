import styled from 'styled-components'
import React from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'
import { recordViewModal } from '../RecordViewModal'
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

        <Button type='primary' onClick={() => recordViewModal.onload()} className='checkButton'>查询</Button>
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
