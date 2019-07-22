import moment from 'moment'
import store from 'src/stores'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import FormSelect from 'src/modules/quality/views/qualityControlRecord/components/common/FormSelect.tsx'
import StateSelect from 'src/modules/quality/views/qualityControlRecord/components/common/StateSelect.tsx'
import { qualityControlRecordVM } from '../QualityControlRecordVM'
export interface Props extends RouteComponentProps {}

export default observer(function TopCon(props: any) {
  let history = store.appStore.history
  let startDate = moment().subtract(1, 'M')
  let endDate = moment()
  const onChange = (value: string) => {
    // nurseFilesListViewModel.loadNursingList()
  }
  return (
    <Wrapper>
      <span style={{ margin: '0 3px 0 0' }}>质控日期:</span>
      <DatePicker.RangePicker
        value={qualityControlRecordVM.filterDate}
        onChange={(value) => (qualityControlRecordVM.filterDate = value)}
        style={{ width: 220 }}
      />

      <span style={{ margin: '0 3px 0 26px' }}>质控科室:</span>
      <DeptSelect onChange={onChange} />

      <span style={{ margin: '0 3px 0 26px' }}>表单:</span>
      {/* <DeptSelect onChange={onChange} /> */}
      <FormSelect />
      <span style={{ margin: '0 3px 0 26px' }}>状态:</span>
      <StateSelect />
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
`
const QualityControlCon = styled.div`
  /* margin-left: 30px; */
  /* display: flex; */
`
