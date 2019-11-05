import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function FileCon() {
  return (
    <Wrapper>
      <div className='title'>附件</div>
      <div className='list'>
        <div className='file-Item' />
        <div className='file-Item' />
        <div className='file-Item' />
        <div className='file-Item' />
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 17px;
    color: #333333;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .list {
    overflow: hidden;
  }
  .file-Item {
    float: left;
    width: 80px;
    height: 80px;
    background: red;
    margin-bottom: 10px;
    & + .file-Item {
      margin-left: 10px;
    }
  }
`
