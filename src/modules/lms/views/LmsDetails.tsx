import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BackCon from '../components/BackCon'
export interface Props extends RouteComponentProps {}

export default function LmsDetails () {
  
  useEffect(() => {
    
  })
  return (
    <Wrapper>
      <BackCon />
      <ScrollCon>
        <ImgCon>
          <Img src={require('../images/物流平台详情.png')} />
        </ImgCon>
      </ScrollCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${(p) => p.theme.$mcp};
`

const Img = styled.img``

const ImgCon = styled.div`
  width: 750px;
  height: 775px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
  margin: 15px auto;
  text-align: center;
  padding: 15px 0;
`
