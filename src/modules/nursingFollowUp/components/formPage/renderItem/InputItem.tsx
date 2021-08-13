import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  editable?: boolean,
  value?: string,
  onChange?: Function,
  className?: string,
}

export default function InputItem(props: Props) {
  const { editable, value, className, onChange } = props

  return editable ?
    (<input type="text" className={className} value={value} onInput={(e) => onChange && onChange(e)} />) :
    (<span className={className} >{value}</span>)
}