import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import FillingQuestionTemplate from 'src/modules/questionBankManagement/components/fillingQuestion/FillingQuestionTemplate'

export interface Props {
  editable?: boolean,
  value?: string,
  originValue: string,
  onChange?: Function,
  className?: string,
  radioClassName?: string,
  style?: React.CSSProperties,
  radioStyle?: React.CSSProperties,
  showValue?: boolean,
  children?: any,
}

export default function RadioItem(props: Props) {
  const {
    editable,
    value,
    originValue,
    className,
    radioClassName,
    onChange,
    style,
    radioStyle,
    showValue,
    children
  } = props

  const getCheckStatus = (): boolean => {
    if (!originValue) return false
    if (value !== originValue) return false

    return true
  }

  const checked = getCheckStatus()

  return (
    <CustomRadio
      className={['radio-item', className].join(' ')}
      style={style}
      onClick={() => {
        if (!editable) return

        let newVal = checked ? '' : originValue
        onChange && onChange(newVal)
      }}>
      <span
        className={['radio-wrapper', radioClassName].join(' ')}
        style={radioStyle}>
        {checked && <span className="radio-fill"></span>}
      </span>
      {showValue ? (<span>{originValue}</span>) : children}
    </CustomRadio>
  )
}

const CustomRadio = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
  &>*{
    vertical-align: middle;
  }
  .radio-wrapper{
    border: 1px solid #00A680;
    border-radius: 50%;
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    margin-right: 5px;
    .radio-fill{
      display: inline-block;
      border-radius: 100%;
      width: 4px;
      height: 4px;
      border:4px solid #00A680;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`