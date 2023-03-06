
import React from "react"
import { Checkbox, DatePicker } from "antd"
import { DatePickerProps } from "antd/es/date-picker/interface"
import styled from "styled-components"
import moment, { Moment } from 'moment'
import { useEffect, useState } from "react"

export interface Props extends DatePickerProps {
  text: string
}
export default function (props: Props) {
  const { text, ...other } = props
  const [checked, setChecked] = useState(false)
  const onCheck = (e: any) => {
    const value: any = e?.target?.checked ? text : ''
    props.onChange && props.onChange(value, value)
  }
  useEffect(() => {
    if ((props.value as unknown) == text) {
      return setChecked(true)
    }
    setChecked(false)

  }, [props.value])

  return <Wrapper>
    {(props.value as unknown) !== text ?
      <DatePicker {...other} value={moment.isMoment(other.value)? other.value : undefined} /> : ''}
    <Checkbox checked={checked} onChange={e => onCheck(e)}>{text}</Checkbox>
  </Wrapper>
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  .ant-checkbox-wrapper {
    margin-left: 5px;
  }
`