import styled from 'styled-components'
import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
// import React, { useState, useEffect } from 'react'
const { RangePicker } = DatePicker
import emitter from 'src/libs/ev'
// 日期格式
const dateFormat = 'YYYY/MM/DD'
export default function PerformanceDataSelect () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log(count, setCount)
  // })
  return (
    <div>
      <SelectCon>
        <RangePicker
          // defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
          defaultValue={[moment('2019/01/01', dateFormat), moment('2019/09/01', dateFormat)]}
          onChange={(e: any, value: any) => {
            // statisticViewModel.startDate = value[0]
            // statisticViewModel.endDate = value[1]
            // setStartDate(value[0])
            // setEndDate(value[1])
            emitter.emit('设置护理绩效日期', value)
          }}
          format={dateFormat}
        />
      </SelectCon>
    </div>
  )
}

const SelectCon = styled.div`
  margin: 0 auto;
  width: 95%;
  display: flex;
  align-items: center;
  .ant-calendar-picker-input {
  }
  .ant-calendar-picker {
    flex: 1;
  }
`
