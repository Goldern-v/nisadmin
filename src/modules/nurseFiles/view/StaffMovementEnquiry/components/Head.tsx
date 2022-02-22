import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Input, Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place } from 'src/components/common'
import { retiredRetireesViewModal } from '../StaffMovementEnquiryModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { authStore } from 'src/stores'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const Option = Select.Option;

export interface Props {}

export default observer(function Head() {
  const deptOptions = () => {
    if (authStore.isDepartment) {
      return [
        <Option value='' key="">全部</Option>,
        retiredRetireesViewModal.deptAllList.map((item: any, idx: number) =>
          <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
      ]
    } else {
      return authStore.deptList.map((item: any, idx: number) =>
        <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
    }
  }
  return (
    <Wrapper>
      <Title>人员调动查询</Title>
      <div className='right'>
        <span>现科室：</span>
        {/* <Select
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
        </Select> */}
        <Select
          style={{ width: 180 }}
          value={retiredRetireesViewModal.deptCode}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value: any) => {
            retiredRetireesViewModal.deptCode = value
            retiredRetireesViewModal.onload()
          }}>
          {deptOptions()}
        </Select>
        <span>日期：</span>
        <RangePicker
          style={{ width: 250 }}
          value={retiredRetireesViewModal.selectedDate}
          onChange={(date) => {
            retiredRetireesViewModal.selectedDate = date
            retiredRetireesViewModal.onload()
          }}
        />
        <Input
          style={{ width: 180, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入工号或姓名"
          value={retiredRetireesViewModal.keyWord}
          onChange={(e: { target: { value: string } }) => {
            retiredRetireesViewModal.keyWord = e.target.value;
            retiredRetireesViewModal.onload()
          }}
        />
        <Place />
        <Button onClick={() => retiredRetireesViewModal.onload()} type='primary'>
          查询
        </Button>
        <Button onClick={() => retiredRetireesViewModal.export()}>导出</Button>
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 15px 12px 15px;
  line-height: 32px;
  .right{
    display: flex;
  }
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
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    overflow: hidden;
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`
