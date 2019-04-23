import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const dateFormat = 'YYYY年MM月DD日'
// const monthFormat = 'YYYY/MM'

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
export default function SelectData () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <SelectCon>
      <span className='label'>日期：</span>
      {/* <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
      <br />
      <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
      <br />
      <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
      <br /> */}
      <RangePicker
        defaultValue={[moment('2019年01月01日', dateFormat), moment('2019年09月01日', dateFormat)]}
        format={dateFormat}
      />
    </SelectCon>
  )
}

const SelectCon = styled.div`
  display: flex;
  align-items: center;
  .ant-calendar-picker-input {
    width: 280px;
  }
`
