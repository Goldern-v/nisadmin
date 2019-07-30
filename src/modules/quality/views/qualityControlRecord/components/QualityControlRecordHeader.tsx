import moment from 'moment'
import store, { authStore } from 'src/stores'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import FormSelect from 'src/modules/quality/views/qualityControlRecord/components/common/FormSelect.tsx'
import StateSelect from 'src/modules/quality/views/qualityControlRecord/components/common/StateSelect.tsx'
import { qualityControlRecordVM } from '../QualityControlRecordVM'
import { qualityControlRecordApi } from '../api/QualityControlRecordApi'
import { Select } from 'src/vendors/antd'

export interface Props extends RouteComponentProps {}

export default observer(function TopCon(props: any) {
  return (
    <Wrapper>
      <span style={{ margin: '0 3px 0 0' }}>质控日期:</span>
      <DatePicker.RangePicker
        value={qualityControlRecordVM.filterDate}
        onChange={(value) => {
          qualityControlRecordVM.filterDate = value
          props.refreshData()
        }}
        style={{ width: 220 }}
      />

      <span style={{ margin: '0 3px 0 26px' }}>科室:</span>
      {/* <DeptSelect onChange={onChange} /> */}
      <Select
        showSearch
        style={{ width: 200 }}
        value={qualityControlRecordVM.filterDeptCode}
        onChange={(value: any) => {
          qualityControlRecordVM.filterDeptCode = value
          props.refreshData()
        }}
      >
        {qualityControlRecordVM.filterDeptList.map((item: any) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span style={{ margin: '0 3px 0 26px' }}>检查小组:</span>
      {/* <DeptSelect onChange={onChange} /> */}
      <FormSelect refreshData={props.refreshData} />

      <span style={{ margin: '0 3px 0 26px' }}>状态:</span>
      <StateSelect refreshData={props.refreshData} />
      <Button type='primary' style={{ marginLeft: 10 }} onClick={() => props.refreshData()}>
        查询
      </Button>
      {/* <Button onClick={() => props.refExport()}>导出excl</Button> */}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 50px;
  /* background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4; */
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
  z-index: 1;
  .ant-calendar-range-picker-separator {
    position: relative;
    top: 5px;
  }
`
const QualityControlCon = styled.div`
  /* margin-left: 30px; */
  /* display: flex; */
`
