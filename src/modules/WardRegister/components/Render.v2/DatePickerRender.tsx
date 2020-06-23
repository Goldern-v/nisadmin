import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

export interface Props {
  itemCfg: any,
  record: any,
  index: number,
  cellDisabled: Function,
  className?: string,
  focusNextIpt?: any,
  onChange: Function,
  format?: string,
  showTime?: boolean,
}

export default function DatePickerRender(props: Props) {
  const {
    className,
    record, //登记本行
    itemCfg, //当前列配置
    index, //行下标
    cellDisabled, //是否禁用行
    focusNextIpt,
    onChange,
    format,
    showTime,
  } = props

  const { itemCode } = itemCfg

  const _format = format || 'YYYY-MM-DD'

  //处理时间选择类型
  let dateStr = record[itemCode] || ''
  let queryClassName = `${itemCode}-${index}`

  return <DatePicker
    disabled={cellDisabled(record)}
    style={{ width: '100%', minWidth: '0px!important' }}
    value={dateStr ? moment(dateStr) : undefined}
    placeholder=" "
    showTime={showTime}
    format={_format}
    allowClear
    dropdownClassName="disable-date-ipt"
    // onOpenChange={(status) => {
    //   if (status) {
    //     setTimeout(() => {
    //       let el = document.querySelector('.disable-date-ipt')
    //       if (el) {
    //         let ipt = el.querySelector('.ant-calendar-input') as HTMLInputElement
    //         if (ipt) ipt.readOnly = true
    //       }
    //     }, 300)
    //   }
    // }}
    className={`${className} ${queryClassName}`}
    onChange={(val: any) => {
      let newVal = val ? val.format(_format) : ''

      //跳转下一个输入框
      // if (newVal && !showTime) setTimeout(() => {
      //   let target = document.querySelector(`.${queryClassName} input`)
      //   if (target) focusNextIpt&&focusNextIpt(null, target)
      // }, 500)

      onChange(newVal, itemCode, index)

    }} />
}