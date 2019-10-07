import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker } from 'src/vendors/antd'
export interface Props {
  value?: any
  onChange?: any
  style?: any
}

export default function YearPicker(props: Props) {
  let { value, onChange } = props
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime]: any = useState(value)

  useEffect(() => {
    setTime(value)
  }, [value])

  return (
    <DatePicker
      style={props.style || {}}
      value={time}
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
