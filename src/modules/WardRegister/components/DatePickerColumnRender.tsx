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

  return <DatePicker
    disabled={cellDisabled(record)}
    style={{ width: '100%', minWidth: '0px!important' }}
    defaultValue={dateStr ? moment(dateStr) : undefined}
    placeholder=" "
    showTime={showTime}
    format={_format}
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
    className={`${className} ${queryClassName}`}
    onChange={(val: any) => {
      let newVal = val ? val.format(_format) : ''

      record[itemCode] = newVal
      record.modified = true

      //跳转下一个输入框
      if (newVal && !showTime) setTimeout(() => {
        let target = document.querySelector(`.${queryClassName} input`)
        if (target) handleNextIptFocus(null, target)
      }, 500)

      if (
        registerCode == 'QCRG_19_2' ||
        registerCode == 'QCRG_11'
      ) {

        let sumItemCode = '总计天数'
        let diffUnit = 'd' as 'd' | 'h'
        if (registerCode == 'QCRG_11') {
          sumItemCode = '合计时间（小时）'
          diffUnit = 'h'
        }
        //时间差计算
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
          let m = endTimeDate.diff(currentDate, diffUnit)
          if (m >= 0 && diffUnit == 'd') m += 1
          newSum = m.toString()
        }

        if (newSum) {
          record[sumItemCode] = newSum
          updateDataSource(true)

          setTimeout(() => {
            let dpEl = document.querySelector(`.${queryClassName}`)
            let sumEl = null
            if (dpEl) {
              let trEl = dpEl?.parentElement?.parentElement
              sumEl = trEl?.querySelector(`[data-key="${sumItemCode}"]`) as HTMLInputElement

              if (sumEl) {
                sumEl.value = newSum
                sumEl.innerHTML = newSum
              }
            }

          }, 600)
        } else {
          updateDataSource()
        }

        // } else if (registerCode == 'QCRG_06') {
        //   //紫外线空气消毒登记本
        //   //1.选择开始时间 默认结束时间为开始时间的后一小时
        //   //2.时间选择后自动计算累计时间(单位:小时)
        //   //累计时间为 起止时间加上上一条记录的累计时间
        //   //更换灯光|酒精擦拭灯管 后累计时间为0
        //   if (itemCode == '开始时间' && newVal) {
        //     let endTime = moment(newVal)
        //     endTime.add(1, 'h')
        //     record['结束时间'] = endTime.format(_format)
        //   }

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
        //     let m = endTimeDate.diff(currentDate, "h")

        //     //计算并加上起止时间
        //     newSum = m.toString()

        //     if (newSum) {
        //       record['累计时间'] = newSum
        //       updateDataSource(true)

        //       setTimeout(() => {
        //         let dpEl = document.querySelector(`.${queryClassName}`)
        //         let sumEl = null
        //         if (dpEl) {
        //           let trEl = dpEl?.parentElement?.parentElement
        //           sumEl = trEl?.querySelector('[data-key="累计时间"]') as HTMLInputElement

        //           if (sumEl) {
        //             sumEl.value = newSum
        //             sumEl.innerHTML = newSum
        //           }
        //         }

        //       }, 600)
        //     } else {
        //       updateDataSource(true)
        //     }
        //   }
      } else {
        updateDataSource()
      }

    }} />
}