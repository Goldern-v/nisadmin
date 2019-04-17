import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

const { RangePicker } = DatePicker
import emitter from 'src/libs/ev'

const dateFormat = 'YYYY年MM月DD日'
// const monthFormat = 'YYYY/MM'

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
export default function SelectData () {
  const [count, setCount] = useState(0)
  const [startDate, setstartDate] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)
    statisticViewModel.startDate = moment(firstDay).format(dateFormat)
    return moment(firstDay).format(dateFormat)
  })
  const [endDate, setendDate] = useState(() => {
    let date = new Date()
    statisticViewModel.endDate = moment(date).format(dateFormat)
    return date
  })
  useEffect(() => {
    console.log(count, setCount, setstartDate, setendDate)
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
        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
        onChange={(e: any, value: any) => {
          statisticViewModel.startDate = value[0]
          statisticViewModel.endDate = value[1]
          setstartDate(value[0])
          setendDate(value[1])
          emitter.emit('设置统计页日期', value)
        }}
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
