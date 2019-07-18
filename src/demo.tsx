import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker } from './vendors/antd'
import YearPicker from './components/YearPicker'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  const [ifh, setIfh] = useState(1000)

  const onScroll = (e: any) => {
    e.persist()
    if (e.target.offsetHeight - e.target.scrollTop < 1000 && ifh - e.target.scrollTop < 1000) {
      setIfh(ifh + 1000)
    }
  }
  return (
    <Wrapper style={props.style} onScroll={onScroll}>
      <YearPicker />
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
