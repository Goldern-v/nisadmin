import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function demo() {
  const [count, setCount] = useState(0)
  const iframeRef = useRef<any>(null)

  useEffect(() => {
    console.log(count, setCount)
  })
  const onload = () => {
    let wid: any = iframeRef.current.contentWindow
    console.log([wid.document.querySelector('embed')], 'iframeRef')
  }
  return (
    <Wrapper>
      <iframe
        ref={iframeRef}
        src='/crNursing/nursingInstitution/20190701/20190701184652OLkTunpr.pdf#toolbar=0'
        onLoad={onload}
      />
      {/* <div className='mask' /> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 500px;
  position: relative;
  overflow: hidden;
  iframe {
    width: 100%;
    height: calc(100% + 50px);
    /* margin-top: -50px; */
  }
  .mask {
    width: 500px;
    height: 500px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    background: red;
    pointer-events: none;
    user-select: none;
  }
`
