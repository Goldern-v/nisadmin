import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
const logo=require('./logo/logo.png')
import { observer } from 'src/vendors/mobx-react-lite'

export interface Props {
  sectionTitle:string
}
export default function Header(props: Props) {
  let { sectionTitle } = props
  useEffect(() => {})
  return (
    <Wrapper>
      <img src={logo}/>
      <div className='title'>武汉亚洲心脏病医院</div>
      <div className='titleName'>{sectionTitle}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 60px;
  padding: 40px 30px 20px;
  position: relative;
  img {
    max-width: 138px;
    max-height: 200px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .title {
    font-size: 38px;
    font-weight: bold;
    margin-top: -25px;
    text-align:center;
    color:black;
  }
  .titleName {
    font-size: 28px;
    text-align: center;
    color: #000;
  }
`