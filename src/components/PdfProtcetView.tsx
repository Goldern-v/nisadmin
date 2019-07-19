import styled from 'styled-components'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

export interface Props {
  style: any
  src: any
}

export default function PdfProtcetView(props: Props) {
  const [ifh, setIfh] = useState(1500)
  let wrapper: any = React.useRef()
  const onScroll = (e: any) => {
    e.persist()
    if (e.target.offsetHeight - e.target.scrollTop < 600 && ifh - e.target.scrollTop < 600) {
      setIfh(ifh + 600)
    }
  }
  useLayoutEffect(() => {
    wrapper.current &&
      (wrapper!.current!.oncontextmenu = () => {
        return false
      })
  })
  return (
    <Wrapper style={props.style} onScroll={onScroll} ref={wrapper}>
      <iframe style={{ height: ifh + 'px' }} scrolling='no' src={props.src + '#toolbar=0'} />
      <div className='mask' style={{ height: ifh + 'px' }} />
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
  .mask {
    position: absolute;
    right: 0;
    top: 2px;
    bottom: 0;
    width: 20px;
    background: #525659;
  }
`
