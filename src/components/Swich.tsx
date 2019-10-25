import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker, Switch } from 'src/vendors/antd'

export interface Props {
  value?: any
  onChange?: any
  style?: any
}

export default function SwitchField(props: Props) {
  let { value, onChange } = props

  return <Switch checked={value} onChange={onChange} />
}
const Wrapper = styled.div``
