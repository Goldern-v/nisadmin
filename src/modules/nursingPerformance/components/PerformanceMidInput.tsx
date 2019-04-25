import styled from 'styled-components'
import React from 'react'
import { Input } from 'antd'
// import React, { useState, useEffect } from 'react'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log(count, setCount)
  // })
  return (
    <div>
      <Con>
        <div className='inputItem'>
          奖金总额 <Input size='small' placeholder='128302.1' />
        </div>
        <div className='inputItem'>
          奖金总额 <Input size='small' placeholder='38490.46' />
          (30%)
        </div>
        <div className='inputItem rightSetClass'>
          奖金总额 <Input size='small' placeholder='89811.47' />
          (70%)
        </div>
      </Con>
    </div>
  )
}

const Con = styled.div`
  width: 100%;
  display:flex;
  .inputItem {
    height:60px;
    line-height:60px;
    flex:1;
    width:0;
    /* height: 30px; */
  .ant-input {
    width: 150px;
    height:30px;
    background:rgba(239,239,239,1);
  }
  .rightSetClass{
    text-align:right;
  }
`
