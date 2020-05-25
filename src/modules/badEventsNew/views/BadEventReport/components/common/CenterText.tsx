import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  text: string
}

export default function (props: Props) {
  const { text } = props
  return <Wrapper>{text}</Wrapper>
}
const Wrapper = styled.div`
  text-align:center;
  font-size: 12px;
`