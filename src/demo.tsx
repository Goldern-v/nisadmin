import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker } from './vendors/antd'
import YearPicker from './components/YearPicker'
import { formatIdCord } from './utils/idCard/idCard'
import FullPageLoading from './components/loading/FullPageLoading'
import { BaseStepBox, BaseStepCon } from './components/BaseStep'
import YearMonthRangePicker from './components/YearMonthRangePicker'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  const [ifh, setIfh] = useState(1000)
  console.log(formatIdCord('44081119950313033x'))
  const onScroll = (e: any) => {
    e.persist()
    if (e.target.offsetHeight - e.target.scrollTop < 1000 && ifh - e.target.scrollTop < 1000) {
      setIfh(ifh + 1000)
    }
  }
  return (
    <Wrapper style={props.style} onScroll={onScroll}>
      {/* <FullPageLoading /> */}
      {/* <BaseStepCon>
        <BaseStepBox success={true}>1111</BaseStepBox>
        <BaseStepBox success={false}>1111</BaseStepBox>
      </BaseStepCon> */}
      {/* <YearMonthRangePicker /> */}
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
