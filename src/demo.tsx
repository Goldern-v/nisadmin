import styled from 'styled-components'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker, Button, message } from './vendors/antd'
import { Provider, KeepAlive } from 'react-keep-alive'
import Demo1 from './demo1'
import { authStore, appStore } from './stores'
import ExportNurseFile from './modules/nurseFiles/view/nurseFiles-hj/views/exportNurseFile/ExportNurseFile'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  return (
    <Wrapper>
      <ExportNurseFile empNo={'0531'} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
