import styled from 'styled-components'
import React from 'react'
export interface Props {
  text: any
}

export default function OneLevelTitle(props: Props) {
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
