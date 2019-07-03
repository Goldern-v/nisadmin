import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function InfoList() {
  return (
    <Wrapper>
      <Head>
        <div className='title'>收件箱</div>
        <div className='btn'>编辑</div>
      </Head>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  left: 200px;
  top: 50px;
  bottom: 0;
  width: 350px;
  background: #ffffff;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 13px;
  border-bottom: 1px solid #dddddd;
  height: 34px;
  .title {
    font-size: 13px;
  }
`
