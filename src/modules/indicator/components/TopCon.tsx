import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import store from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { DatePicker, Button } from 'antd'
export interface Props extends RouteComponentProps {}

export default observer(function TopCon () {
  let history = store.appStore.history
  let startDate = moment().subtract(1, 'M')
  let endDate = moment()
  return (
    <Wrapper>
      <span>日期:</span>
      <DatePicker.RangePicker defaultValue={[startDate, endDate]} style={{ width: 220, margin: '0 10px' }} />
      <Button type='primary' style={{ marginRight: 10 }}>
        查询
      </Button>
      <Button>导出excl</Button>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 45px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`
