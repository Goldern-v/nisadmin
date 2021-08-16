import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import FillingQuestionTemplate from 'src/modules/questionBankManagement/components/fillingQuestion/FillingQuestionTemplate'

export interface Props {
  editable?: boolean,
  value?: string,
  orginValue: string,
  onChange?: Function,
  className?: string,
  style?: React.CSSProperties,
  radioStyle?: React.CSSProperties,
  children?: any,
}

export default function RadioItem(props: any) {
  const {
    editable,
    value,
    orginValue,
    className,
    radioClassName,
    onChange,
    style,
    radioStyle,
    children
  } = props

  const checked = value === orginValue

  return (
    <CustomRadio
      className={['radio-item', className].join(' ')}
      style={style}
      onClick={() => {
        if (!editable) return

        let newVal = checked ? '' : orginValue
        onChange && onChange(newVal)
      }}>
      <span
        className={['radio-wrapper', radioClassName].join(' ')}
        style={radioStyle}>
        {checked && <span className="radio-fill"></span>}
      </span>
      {children}
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
      border-radius: 50%;
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