import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Null from 'src/components/null/Null'
export interface Props extends RouteComponentProps {}

export default function noticeView() {
  
  useEffect(() => {
    
  })
  return (
    <Wrapper>
      <Null />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 0 auto;
`
