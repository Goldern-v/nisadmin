import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

const { RangePicker } = DatePicker
import emitter from 'src/libs/ev'

const dateFormat = 'YYYY-MM-DD'
export default function SelectData () {
  const [startDate, setStartDate] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)
    statisticViewModel.startDate = moment(firstDay).format(dateFormat)
    return statisticViewModel.startDate
  })
  const [endDate, setEndDate] = useState(() => {
    let date = new Date()
    statisticViewModel.endDate = moment(date).format(dateFormat)
    return statisticViewModel.endDate
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
        // defaultValue={[moment('2019/01/01', dateFormat), moment('2019/09/01', dateFormat)]}
        onChange={(e: any, value: any) => {
          statisticViewModel.startDate = value[0]
          statisticViewModel.endDate = value[1]
          setStartDate(value[0])
          setEndDate(value[1])
          emitter.emit('设置统计页日期', value)
        }}
        format={dateFormat}
      />
    </SelectCon>
  )
}
const SelectCon = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  .ant-calendar-picker-input {
  }
  .ant-calendar-picker {
    flex: 1;
  }
`
