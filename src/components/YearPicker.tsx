import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker } from 'src/vendors/antd'
export interface Props {
  value?: any
  onChange?: any
  style?: any
  allowClear?: any,
  disabled?: boolean,
  className?: string
}

export default function YearPicker(props: Props) {
  let { value, onChange, className } = props
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime]: any = useState(value)

  useEffect(() => {
    setTime(value)
  }, [value])

  return (
    <DatePicker
      className={className}
      style={props.style || {}}
      allowClear={props.allowClear !== undefined ? props.allowClear : true}
      value={time}
      disabled={props.disabled}
      open={isOpen}
      mode='year'
      placeholder='请选择年份'
      format='YYYY'
      onOpenChange={(status: boolean) => {
        if (status) {
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      }}
      onPanelChange={(v: any) => {
        setTime(v)
        setIsOpen(false)
        onChange(v)
      }}
      onChange={() => {
        onChange && onChange(null)
      }}
    />
  )
}
const Wrapper = styled.div``
