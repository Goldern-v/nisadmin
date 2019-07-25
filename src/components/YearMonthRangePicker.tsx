import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker } from 'src/vendors/antd'
const { RangePicker } = DatePicker
export interface Props {
  value?: any
  onChange?: any
}

export default function YearMonthRangePicker(props: Props) {
  let { value, onChange } = props
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime]: any = useState(value)

  useEffect(() => {
    setTime(value)
  }, [value])

  return (
    <RangePicker
      value={time}
      open={isOpen}
      mode={['month', 'month']}
      format='YYYY-MM'
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
        onChange && onChange(v)
      }}
    />
  )
}
const Wrapper = styled.div``
