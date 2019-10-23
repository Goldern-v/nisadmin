import styled from 'styled-components'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker, Button, message } from './vendors/antd'
import { Provider, KeepAlive } from 'react-keep-alive'
import Demo1 from './demo1'
import { authStore, appStore } from './stores'
// import XLSX from 'xlsx'
// import { downloadExl } from './excel'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  // var wb = XLSX.utils.book_new()
  // var ws = XLSX.utils.aoa_to_sheet([['a', 'b'], [1, 2, 3]])
  // XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  const ref: any = React.createRef()

  const onClick = () => {
    message.error(<pre>123 \\\\n 123 \n 123</pre>)
  }
  useLayoutEffect(() => {
    console.log(ref, 'refref')
  }, [])
  return (
    <Wrapper>
      <KeepAlive name='Test' disabled={(appStore.history && appStore.history.action) !== 'POP'}>
        <Demo1 />
      </KeepAlive>

      {/* <img src={aaa} alt='' /> */}
      <div>
        <input id='myCar' list='cars' />
        <datalist id='cars'>
          <option value='BMW' />
          <option value='Ford' />
          <option value='Volvo' />
        </datalist>
      </div>
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
