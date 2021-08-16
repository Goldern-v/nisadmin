import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  editable?: boolean,
  value?: string,
  onChange?: Function,
  className?: string,
  disabled?: boolean,
  style?: React.CSSProperties
}

export default function InputItem(props: Props) {
  const { editable, value, className, onChange, style, disabled } = props

  return editable ?
    (<input
      type="text"
      className={['input-item', className].join(' ')}
      value={value}
      style={style}
      disabled={disabled}
      onInput={(e) => onChange && onChange(e)} />) :
    (<CustomSpan className={['input-item', className].join(' ')} style={style}>{value}</CustomSpan>)
}

const CustomSpan = styled.span`
  display: inline-block;
  height: 17px;
`