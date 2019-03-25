import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const { RangePicker } = DatePicker
export interface Props extends RouteComponentProps {}

const dateFormat = 'YYYY/MM/DD'
export default function LeftBar () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  function onChange (date: any, dateString: any) {
    console.log(date, dateString)
  }
  return (
    <Wrapper>
      <label>排班记录</label>
      <SelectCon>
        <RangePicker onChange={onChange} format={dateFormat} locale={locale} />
      </SelectCon>
      <ListCon>第158周 03/01 - 03/07</ListCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const SelectCon = styled.div`
  height: 60px;
  background: #ddd;
  display: flex;
  align-items: center;
  padding: 0 5px;
`
const ListCon = styled.div`
  height: 0;
  flex: 1;
  background: #fff;
`
