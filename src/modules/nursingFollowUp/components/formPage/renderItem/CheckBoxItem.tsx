import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import FillingQuestionTemplate from 'src/modules/questionBankManagement/components/fillingQuestion/FillingQuestionTemplate'
import { Tracing } from 'trace_events'

export interface Props {
  editable?: boolean,
  value?: string,
  originValue: string,
  onChange?: Function,
  className?: string,
  checkboxClassName?: string,
  style?: React.CSSProperties,
  checkboxStyle?: React.CSSProperties,
  showValue?: boolean,
  children?: any,
}

export default function CheckBoxItem(props: Props) {
  const {
    editable,
    value,
    originValue,
    className,
    checkboxClassName,
    onChange,
    style,
    checkboxStyle,
    showValue,
    children
  } = props

  const valueArr = (value || '').split(',') as string[]

  const getCheckStatus = (): boolean => {
    if (valueArr.length < 0 || !value) return false

    if (valueArr.includes(originValue)) {
      return true
    } else {
      return false
    }
  }

  const checked = getCheckStatus()

  return (
    <CustomCheckbox
      className={['checkbox-item', className].join(' ')}
      style={style}
      onClick={() => {
        if (!editable || !originValue) return

        let newVal = ''
        let newValueArr = [...valueArr]

        if (checked) {
          let spliceIdx = valueArr.indexOf(originValue)
          newValueArr.splice(spliceIdx, 1)
        } else {
          newValueArr.push(originValue)
        }
        newVal = newValueArr.filter((str: string) => str).join(',')
        onChange && onChange(newVal)
      }}>
      <span
        className={['checkbox-wrapper', checkboxClassName].join(' ')}
        style={checkboxStyle}>
        {checked && <span className="checkbox-fill"></span>}
      </span>
      {showValue ? (<span>{originValue}</span>) : children}
    </CustomCheckbox>
  )
}

const CustomCheckbox = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
  &>*{
    vertical-align: middle;
  }
  .checkbox-wrapper{
    border: 1px solid #00A680;
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    margin-right: 5px;
    .checkbox-fill{
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #00A680;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`