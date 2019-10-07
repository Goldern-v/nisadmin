import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function ImgCon() {
  return (
    <Wrapper>
      <img src='' alt='' />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 10px 30px;
  img {
    max-width: 200px;
    max-height: 200px;
    margin-right: 20px;
  }
`
