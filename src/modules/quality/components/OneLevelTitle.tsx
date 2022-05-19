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
  font-size: 17px;
  font-weight: bold;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 6px;
    background: ${(p) => p.theme.$mtc};
  }
`
