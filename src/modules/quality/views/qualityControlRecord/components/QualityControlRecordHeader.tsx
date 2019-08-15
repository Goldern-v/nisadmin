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
import { Select, Radio } from 'src/vendors/antd'

export interface Props extends RouteComponentProps {}

export default observer(function TopCon(props: any) {
  // const [readWay, setReadWay] = useState(1)
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
      <span style={{ margin: '0 3px 0 20px' }}>类型:</span>
      <Select
        showSearch
        style={{ width: 110 }}
        value={qualityControlRecordVM.filterTypeCode}
        onChange={(value: any) => {
          qualityControlRecordVM.filterTypeCode = value
          props.refreshData()
        }}
      >
        {qualityControlRecordVM.filterTypeList.map((item: any) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      {qualityControlRecordVM.formSelectList.length >= 1 && (
        <div className='radio-con'>
          <Radio.Group
            name='radiogroup'
            value={qualityControlRecordVM.readWay}
            onChange={(e) => {
              qualityControlRecordVM.readWay = e.target.value
              props.refreshData()
            }}
          >
            <Radio value={1}>按科室查看</Radio>
            <Radio value={2}>按质控组查看</Radio>
          </Radio.Group>
        </div>
      )}

      {qualityControlRecordVM.readWay == 1 && (
        <React.Fragment>
          <span style={{ margin: '0 3px 0 20px' }}>科室:</span>
          <Select
            showSearch
            style={{ width: 140 }}
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
        </React.Fragment>
      )}

      {qualityControlRecordVM.readWay == 2 && (
        <React.Fragment>
          <span style={{ margin: '0 3px 0 20px' }}>检查小组:</span>
          <FormSelect refreshData={props.refreshData} />
        </React.Fragment>
      )}

      <span style={{ margin: '0 3px 0 20px' }}>状态:</span>
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
  .radio-con {
    background: #fff;
    border: 1px solid #ddd;
    white-space: nowrap;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px 0 10px;
    margin-left: 20px;
  }
`
const QualityControlCon = styled.div`
  /* margin-left: 30px; */
  /* display: flex; */
`
