import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
export interface Props {}

export default function Null () {
  
  useEffect(() => {
    
  })
  return (
    <Wrapper>
      <NullImg src={require('./images/开发中.png')} />
      <div>功能正在开发，敬请期待～</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text-align: center;
  margin: 180px 0 0;
  font-size: 20px;
  color: #999;
`

const NullImg = styled.img`
  width: 143px;
  margin-bottom: 15px;
`
