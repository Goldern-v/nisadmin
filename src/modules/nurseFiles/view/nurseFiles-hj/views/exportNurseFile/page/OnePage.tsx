import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
export interface Props {}

export default function OnePage() {
  return (
    <Wrapper>
      <div className='title-1 title'>东莞市厚街医院</div>
      <div className='title-2 title'>护理人员信息档案</div>
      <div className='input-con'>
        <div className='label'>姓&nbsp;&nbsp;名：</div>
        <div className='input' />
      </div>
      <div className='input-con'>
        <div className='label'>姓&nbsp;&nbsp;名：</div>
        <div className='input' />
      </div>
      <div className='aside'>东莞市厚街医院</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 46px;
    text-align: center;
    font-weight: bold;
    font-family: '黑体' !important;
  }
  .title-1 {
    padding-top: 100px;
  }
  .title-2 {
    padding-top: 50px;
    padding-bottom: 300px;
  }
  .input-con {
    text-align: center;
    margin-bottom: 5px;
  }
  .label {
    font-size: 25px;
    font-weight: bold;
    display: inline-block;
  }
  .input {
    display: inline-block;
    width: 220px;
    height: 25px;
    border-bottom: 1px solid #000;
  }
  .aside {
    font-size: 20px;
    text-align: center;
    margin-top: 135px;
  }
`
