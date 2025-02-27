import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
// 中文化
// tslint:disable-next-line: no-duplicate-imports
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
const { RangePicker } = DatePicker
import emitter from 'src/libs/ev'

const dateFormat = 'YYYY-MM'
// const monthFormat = 'YYYY/MM'

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
export default function SelectData () {
  const [startDate, setStartDate] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)
    statisticViewModel.startDate = moment(firstDay).format(dateFormat)
    return moment(firstDay).format(dateFormat)
  })
  const [endDate, setEndDate] = useState(() => {
    let date = new Date()
    statisticViewModel.endDate = moment(date).format(dateFormat)
    return date
  })
  const [mode, setMode] = useState(['month', 'month']) // 时间展示样式
  const [valueM, setValueM] = useState([])
  const handleChange = (value: any) => {
    setValueM(value)
  }
  const handlePanelChange = (value: any, mode: any) => {
    setValueM(value)
    setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]])
  }
  return (
    <SelectCon>
      <span className='label'>日期：</span>
      {/* <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
      <br />
      <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
      <br />
      <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
      <br /> */}
      <LocaleProvider locale={zh_CN}>
        <RangePicker
          defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
          // onChange={(e: any, value: any) => {
          //   statisticViewModel.startDate = value[0]
          //   statisticViewModel.endDate = value[1]
          //   setStartDate(value[0])
          //   setEndDate(value[1])
          //   emitter.emit('设置统计页日期', value)
          // }}
          value={valueM}
          onChange={handleChange}
          onPanelChange={handlePanelChange}
          format={dateFormat}
          mode={mode}
        />
      </LocaleProvider>
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
