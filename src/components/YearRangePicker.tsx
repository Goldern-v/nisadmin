import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker } from 'src/vendors/antd'
export interface Props {
  value?: any
  onChange?: any
}

export default function YearRangePicker(props: Props) {
  let { value, onChange } = props
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime]: any = useState(value)

  useEffect(() => {
    setTime(value)
  }, [value])

  return (
    <DatePicker.RangePicker
      value={time}
      open={isOpen}
      mode={['year', 'year']}
      placeholder={['开始年份', '结束年份']}
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
    />
  )
}
const Wrapper = styled.div``
