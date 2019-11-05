import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  title: string
  aside: string
}

export default function TitleItem(props: Props) {
  const { title, aside } = props
  return (
    <Wrapper>
      <div className='title'>{title}</div>
      <div className='aside'>{aside}</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin-bottom: 20px;
  .title {
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    margin-bottom: 5px;
  }
  .aside {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
`
