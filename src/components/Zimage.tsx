import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import ReactZmage from 'react-zmage'
export interface Props {}

export default function Zimage (props: any) {
  let option = Object.assign({}, props)
  if (option.text) {
    return (
      <Wrapper>
        <Text>{option.text}</Text>
        <ReactZmage {...option} />
      </Wrapper>
    )
  }
  return <ReactZmage {...option} />
}
const Wrapper = styled.div`
  img {
    position: absolute;
  }
`

const Text = styled.div`
  color: ${(p: any) => p.theme.$mtc};
  font-size: 14px;
`
