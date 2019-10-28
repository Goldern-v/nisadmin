import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useKeepAliveEffect } from 'react-keep-alive'
export interface Props {}

export default function demo1() {
  const [text, setText] = React.useState('')
  useKeepAliveEffect(() => {
    console.log('mounted')
    return () => {
      console.log('unmounted')
    }
  })
  return (
    <Wrapper>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      {text}
    </Wrapper>
  )
}
const Wrapper = styled.div``
