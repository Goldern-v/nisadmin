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
import emitter from 'src/libs/ev'
const dateFormat = 'YYYY年MM月DD日'

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
      {/* <span className='label'>日期：</span> */}
      <LocaleProvider locale={zh_CN}>
        <DatePicker
          defaultValue={moment(dataValue, dateFormat)}
          format={dateFormat}
          onChange={(e: any, value: any) => {
            SettingViewModel.holidayDate = value
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
    width: 100%;
  }
  .ant-calendar-picker {
    width: 100%;
  }
`
