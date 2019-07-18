import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function Schedule2View () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    
  })
  return <Wrapper>22222{count}</Wrapper>
}
const Wrapper = styled.div``
