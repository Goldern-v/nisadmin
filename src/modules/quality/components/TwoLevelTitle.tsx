import React from 'react'
import styled from 'styled-components'

export interface Props {
  text: any
}

export default function TwoLevelTitle(props: Props) {
  return <Wrapper>{props.text}</Wrapper>
}
const Wrapper = styled.div`
  min-height: 20px;
  padding-left: 30px;
  position: relative;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  font-size: 14px;
`
