import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'
import { retiredRetireesViewModal } from '../RetiredRetireesViewModal'
import { appStore } from 'src/stores'
import { observer } from 'src/vendors/mobx-react-lite'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
export interface Props { }

export default observer(function Head() {
  return (
    <Wrapper>
      <span>片区：</span>
      <Select
        value={retiredRetireesViewModal.selectedBigDept}
        onChange={(val: string) => {
          retiredRetireesViewModal.selectedBigDept = val
          retiredRetireesViewModal.onChangeBigDept(val)
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {retiredRetireesViewModal.bigDeptList.map((item: any, index: number) => (
          <Select.Option value={item.code} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <span>科室：</span>

      <Select
        mode='multiple'
        showSearch
        allowClear
        style={{ width: 200 }}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={retiredRetireesViewModal.selectedDept}
        onChange={(value: any) => {
          if (value.length > 1) {
            if (value[value.length - 1] == '全院') {
              value = ['全院']
            } else if (value.includes('全院')) {
              value = value.filter((item: any) => item != '全院')
            } else if (value[value.length - 1] == '全部') {
              value = ['全部']
            } else if (value.includes('全部')) {
              value = value.filter((item: any) => item != '全部')
            }
          }
          retiredRetireesViewModal.selectedDept = value
          retiredRetireesViewModal.onload()
        }}
      >
        {!retiredRetireesViewModal.deptList.find((item: any) => item.code == '') && (
          <Select.Option value='全部'>全部</Select.Option>
        )}

        {retiredRetireesViewModal.deptList.map((item: any, index: number) => (
          <Select.Option value={item.code || '全部'} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <span>日期：</span>
      <RangePicker
        style={{ width: 210 }}
        value={retiredRetireesViewModal.selectedDate}
        onChange={(date) => {
          retiredRetireesViewModal.selectedDate = date
          retiredRetireesViewModal.onload()
        }}
      />
      <span>状态：</span>
      <Select
        value={retiredRetireesViewModal.selectedStatus}
        onChange={(val: string) => {
          retiredRetireesViewModal.selectedStatus = val
          retiredRetireesViewModal.onload()
        }}
      >
        {retiredRetireesViewModal.stateList.map((item: any, index: number) => (
          <Select.Option value={item} key={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      {appStore.HOSPITAL_ID == 'nys' &&
        <React.Fragment>
          <span>离职原因：</span>
          <Input
            style={{ width: 210 }}
            placeholder="请输入离职原因"
            defaultValue={retiredRetireesViewModal.remark}
            onBlur={(e: any) => {
              retiredRetireesViewModal.remark = e.target.value
              retiredRetireesViewModal.onload()
            }} />
        </React.Fragment>}
      <Place />
      <Button onClick={() => retiredRetireesViewModal.onload()} type='primary'>
        查询
      </Button>
      <Button onClick={() => retiredRetireesViewModal.export()}>导出</Button>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
  &>*{
    vertical-align:middle;
    display:inline-block;
  }
  .ant-select {
    width: 150px;
    margin-right: 10px;
    position: relative;
    bottom: 3px;
  }
  .ant-calendar-picker {
    margin-right: 10px;
  }
  button {
    margin-left: 10px;
  }
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    overflow: hidden;
  }
`
