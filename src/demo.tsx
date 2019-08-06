import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker, Button } from './vendors/antd'
import YearPicker from './components/YearPicker'
import { formatIdCord } from './utils/idCard/idCard'
import FullPageLoading from './components/loading/FullPageLoading'
import { BaseStepBox, BaseStepCon } from './components/BaseStep'
import YearMonthRangePicker from './components/YearMonthRangePicker'
import { numToChinese } from './utils/number/numToChinese'
import YearRangePicker from './components/YearRangePicker'
import AgePicker from './components/AgeRangePicker'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  const data = useRef(1000)
  const [state, setState]: any = useState(1000)
  console.log(data.current, 'render')
  return (
    <Wrapper>
      <AgePicker />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;

  iframe {
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: block;
    pointer-events: none;
  }
`
