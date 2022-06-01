import styled from 'styled-components'
import React from 'react'
export interface Props {
  text: any
}

export default function OneLevelTitle(props: Props) {
  return <Wrapper>{props.text}</Wrapper>
}
const Wrapper = styled.div`
  padding-left: 20px;
  padding-bottom: 5px;
  position: relative;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  font-size: 17px !important;
  font-weight: bold;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 20px;
    width: 6px;
    transform: translateY(-50%);
    background: ${(p) => p.theme.$mtc};
  }
`
