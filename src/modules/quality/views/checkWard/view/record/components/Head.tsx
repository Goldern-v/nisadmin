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
  const handleSearch: any = (val: any) => {
    recordViewModal.selectedWardRoundText = val
    let data: any = recordViewModal.deptList.filter((item: any) => item.name.indexOf(val) > -1)
    recordViewModal.selectedWardRoundArray = data || []
  }

  const setColorRed: any = (val: any) => {
    let array: any = val.split('')
    return array.map((item: any, i: any) => {
      let isRed = recordViewModal.selectedWardRoundText.indexOf(item) > -1
      return isRed ? <span key={i}>{item}</span> : <span key={i}>{item}</span>
    })
  }

  const handleChange: any = (val: any) => {
    recordViewModal.selectedDept = val === '全院' ? '' : val === '全部' ? recordViewModal.string : val
    recordViewModal.selectedWardRoundText = val
    recordViewModal.onload()
  }
  const options = recordViewModal.selectedWardRoundArray.map((d: any) => (
    <Select.Option key={d.name} value={d.code}>
      {setColorRed(d.name)}
    </Select.Option>
  ))
  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>特殊时段查房记录</PageTitle>
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
          allowClear={false}
        />

        <span>查房科室：</span>
        <Select
          showSearch
          value={recordViewModal.selectedDept}
          placeholder='请输入要查询的科室'
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
        >
          {options}
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
            recordViewModal.pageIndex = 1
            recordViewModal.onload()
          }}
        >
          <Select.Option value=''>全部</Select.Option>
          <Select.Option value='1'>待病区处理</Select.Option>
          <Select.Option value='1,2'>待科护士长审核</Select.Option>
          <Select.Option value='3'>待护理部审核</Select.Option>
          <Select.Option value='4'>已完成</Select.Option>
          {/* {recordViewModal.checkStateList.map((item: any, index: number) => (
            <Select.Option value={item.code} key={item.code}>
              {item.code}
            </Select.Option>
          ))} */}
        </Select>
        <Place />

        <Button type='primary' onClick={() => recordViewModal.onload()} className='checkButton'>
          查询
        </Button>
      </RightIcon>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0;
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
