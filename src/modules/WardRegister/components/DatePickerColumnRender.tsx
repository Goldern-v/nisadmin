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
  handleNextIptFocus: Function,
  updateDataSource: Function,
  registerCode: any,
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
    registerCode
  } = props

  //处理时间选择类型
  let dateStr = record[itemCfg.itemCode] || ''
  let qeuryClassName = `${itemCfg.itemCode}-${index}`

  return <DatePicker
    disabled={cellDisabled(record)}
    style={{ width: '100%' }}
    defaultValue={dateStr ? moment(dateStr) : undefined}
    placeholder=" "
    allowClear
    dropdownClassName="disable-date-ipt"
    onOpenChange={(status) => {
      if (status) {
        setTimeout(() => {
          let el = document.querySelector('.disable-date-ipt')
          if (el) {
            let ipt = el.querySelector('.ant-calendar-input') as HTMLInputElement
            if (ipt) ipt.readOnly = true
          }
        }, 300)
      }
    }}
    className={`${className} ${qeuryClassName}`}
    onChange={(val: any) => {
      let newVal = val ? val.format('YYYY-MM-DD') : ''

      record[itemCfg.itemCode] = newVal
      record.modified = true

      //跳转下一个输入框
      if (newVal) setTimeout(() => {
        let target = document.querySelector(`.${qeuryClassName} input`)
        if (target) handleNextIptFocus(null, target)
      }, 500)

      //时间差计算
      if (registerCode == 'QCRG_19_2') {
        let newSum = ''

        let current = record['开始时间'] || ''
        let endTime = record['结束时间'] || ''

        var currentDate = moment(current)
        var endTimeDate = moment(endTime)

        if (
          currentDate.isValid() &&
          endTimeDate.isValid() &&
          current && endTime
        ) {
          let m = endTimeDate.diff(currentDate, "d")
          if (m >= 0) m += 1
          newSum = m.toString()
        }

        if (newSum) {
          record['总计天数'] = newSum
          updateDataSource(true)

          setTimeout(() => {
            let dpEl = document.querySelector(`.${qeuryClassName}`)
            let sumEl = null
            if (dpEl) {
              let trEl = dpEl?.parentElement?.parentElement
              sumEl = trEl?.querySelector('[data-key="总计天数"]') as HTMLInputElement

              if (sumEl) {
                sumEl.value = newSum
                sumEl.innerHTML = newSum
              }
            }

          }, 600)
        }
      } else {
        updateDataSource()
      }

    }} />
}