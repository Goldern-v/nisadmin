import moment from 'moment'
import store from 'src/stores'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker } from 'antd'

export interface Props extends RouteComponentProps {}

export default React.forwardRef(function TopCon(props: any, ref: any) {
  let history = store.appStore.history
  let startDate = moment().subtract(1, 'M')
  let endDate = moment()
  return (
    <Wrapper>
      <span>日期:</span>
      <DatePicker.RangePicker defaultValue={[startDate, endDate]} style={{ width: 220, margin: '0 10px' }} ref={ref} />
      <Button type='primary' style={{ marginRight: 10 }} onClick={() => props.refreshData()}>
        查询
      </Button>
      <Button onClick={() => props.refExport()}>导出excl</Button>
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
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`
