// import * as React from 'react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function LoginView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return <Wrapper>123123</Wrapper>
}

const Wrapper = styled.div``
