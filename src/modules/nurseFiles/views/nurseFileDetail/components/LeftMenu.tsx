import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

const BG = require('../../../images/侧边背景.png')

export default function LeftMenu () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <Li>基本信息</Li>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  background: url(${BG});
  background-size: 100% auto;
  background-repeat: no-repeat;
`
const Li = styled.div`
  height: 32px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 30px;
  padding: 0 16px;
  font-size: 13px;
  color: #333;
`
