import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function demo() {
  const [count, setCount] = useState(0)
  const iframeRef = useRef<any>(null)
  const [scroll, setScroll] = useState(true)
  useEffect(() => {
    if (scroll) {
      setTimeout(() => {
        setScroll(false)
      }, 1000)
    }
  }, [])
  const onload = () => {
    let wid: any = iframeRef.current.contentWindow
    console.log(wid, 'wid')
    wid.document.querySelector('#plugin').oncopy = () => alert(12321)
    // console.log([wid.document.querySelector('embed')], 'iframeRef')
  }
  return (
    <Wrapper onClick={() => alert(1)}>
      <iframe
        ref={iframeRef}
        src='/crNursing/nursingInstitution/20190701/20190701184652OLkTunpr.pdf#toolbar=0'
        onLoad={onload}
      />
      {/* <div className='mask' style={scroll ? { pointerEvents: 'none' } : {}} onWheel={() => setScroll(true)}>
        {scroll + ''}
      </div> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 500px;
  position: relative;
  /* overflow: hidden; */
  iframe {
    width: 100%;
    height: 5000px;
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
  }
`
