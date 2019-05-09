import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import SettingViewModel from 'src/modules/setting/SettingViewModel'
// 中文化
// tslint:disable-next-line: no-duplicate-imports
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
const { MonthPicker, RangePicker } = DatePicker
import emitter from 'src/libs/ev'
const dateFormat = 'YYYY'

export default function SelectData () {
  const [dataValue, setDataValue] = useState(() => {
    let nowDate = new Date()
    let firstDay = nowDate.setDate(1)
    SettingViewModel.selectYear = moment(firstDay).format(dateFormat)
    return SettingViewModel.selectYear
  })
  // const selectYearChange = (e: any, value: any) => {
  //   setDataValue(value)
  //   SettingViewModel.selectYear = value
  // }

  useEffect(() => {}, [])

  return (
    <SelectCon>
      <span className='label'>年度：</span>
      <LocaleProvider locale={zh_CN}>
        <MonthPicker
          defaultValue={moment(dataValue, dateFormat)}
          format={dateFormat}
          onChange={(e: any, value: any) => {
            SettingViewModel.selectYear = value
            setDataValue(value)
          }}
        />
      </LocaleProvider>
    </SelectCon>
  )
}

const SelectCon = styled.div`
  display: flex;
  align-items: center;
  .ant-calendar-picker-input {
    /* width: 280px; */
  }
`
