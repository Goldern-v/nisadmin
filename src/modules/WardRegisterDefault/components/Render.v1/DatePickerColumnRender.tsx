import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

export interface Props {
  itemCfg: any,
  record: any,
  index: number,
  cellDisabled: Function,
  className?: string,
  handleNextIptFocus?: Function,
  updateDataSource: Function,
  registerCode: any,
  format?: string,
  showTime?: boolean,
}

/** 时间选择render组件 */
export default function DatePickerColumnRender(props: Props) {
  const {
    className,
    record, //登记本行
    itemCfg, //当前列配置
    index, //行下标
    cellDisabled, //是否禁用行
    handleNextIptFocus,
    updateDataSource,
    registerCode,
    format,
    showTime,
  } = props

  const { itemCode } = itemCfg

  const _format = format || 'YYYY-MM-DD'

  //处理时间选择类型
  let dateStr = record[itemCode] || ''
  let queryClassName = `${itemCode}-${index}`
  if (format == 'HH:mm') {
    return <TimePicker
      disabled={cellDisabled(record)}
      style={{ width: '100%', minWidth: '0px!important', borderColor: "transparent !important" }}
      defaultValue={dateStr ? moment(dateStr, _format) : undefined}
      placeholder=" "
      format={_format}
      allowClear
      popupClassName="disable-date-ipt"
      onOpenChange={(status) => { }}
      className={[className, queryClassName,].join(' ')}
      onChange={(val: any) => {
        let newVal = val ? val.format(_format) : ''

        record[itemCode] = newVal
        record.modified = true
        updateDataSource()
      }}
    />
  }
  return <DatePicker
    disabled={cellDisabled(record)}
    style={{ width: '100%', minWidth: '0px!important' }}
    defaultValue={dateStr ? moment(dateStr) : undefined}
    placeholder=" "
    showTime={showTime}
    format={_format}
    allowClear
    dropdownClassName="disable-date-ipt"
    onOpenChange={(status) => { }}
    className={[className, queryClassName,].join(' ')}
    onChange={(val: any) => {
      let newVal = val ? val.format(_format) : ''

      record[itemCode] = newVal
      record.modified = true

      // if (
      //   registerCode == 'QCRG_19_2' ||
      //   registerCode == 'QCRG_11' ||
      //   registerCode == 'QCRG_06' ||
      //   registerCode == 'QCRG_11_2'
      // ) {

      //   let sumItemCode = '总计天数'
      //   let diffUnit = 'd' as 'd' | 'h' | 'm'
      //   if (registerCode == 'QCRG_11' || registerCode == 'QCRG_11_2') {
      //     sumItemCode = '合计时间（小时）'
      //     diffUnit = 'm'
      //   }
      //   if (registerCode == 'QCRG_06') {
      //     sumItemCode = '使用时间'
      //     diffUnit = 'm'
      //   }
      //   //时间差计算
      //   let newSum = ''

      //   let current = record['开始时间'] || ''
      //   let endTime = record['结束时间'] || ''

      //   var currentDate = moment(current)
      //   var endTimeDate = moment(endTime)

      //   if (
      //     currentDate.isValid() &&
      //     endTimeDate.isValid() &&
      //     current && endTime
      //   ) {
      //     let m = endTimeDate.diff(currentDate, diffUnit)
      //     if (m >= 0 && diffUnit == 'd') m += 1

      //     if (['QCRG_06', 'QCRG_11', 'QCRG_11_2'].indexOf(registerCode) >= 0) {
      //       newSum = (parseInt((Math.round(m / 60 * 10)).toString()) / 10).toString()
      //     } else {
      //       newSum = m.toString()
      //     }
      //   }

      //   if (newSum) {
      //     record[sumItemCode] = newSum
      //     updateDataSource(true)

      //     setTimeout(() => {
      //       let dpEl = document.querySelector(`.${queryClassName}`)
      //       let sumEl = null
      //       if (dpEl) {
      //         let trEl = dpEl?.parentElement?.parentElement
      //         sumEl = trEl?.querySelector(`[data-key="${sumItemCode}"]`) as HTMLInputElement

      //         if (sumEl) {
      //           sumEl.value = newSum
      //           sumEl.innerHTML = newSum
      //         }
      //       }

      //     }, 600)
      //   } else {
      //     updateDataSource()
      //   }
      // } else {
      updateDataSource()
      // }

    }} />
}