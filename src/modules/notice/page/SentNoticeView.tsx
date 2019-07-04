import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function SentNoticeView() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <InputBox>
        <div className='label'>主&nbsp;题</div>
        <div className='input-con'>
          <input type='text' className='text-input' placeholder='请输入主题' />
        </div>
      </InputBox>
      <InputBox>
        <div className='label'>
          收件人
          <img src={require('../images/添加.png')} alt='' className='add-icon' />
        </div>
        <div className='input-con'>
          <input type='text' className='text-input' placeholder='请输入主题' />
        </div>
      </InputBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: ${(p) => p.theme.$headerHeight};
  background: #fff;
  padding-top: 5px;
`

const InputBox = styled.div`
  height: 45px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  overflow: hidden;
  .label {
    color: #333333;
    width: 110px;
    padding-left: 30px;
  }
  .input-con {
    flex: 1;
    height: 45px;
  }
  .text-input {
    border: 0;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    &::-webkit-input-placeholder {
      color: #999;
      font-weight: normal;
    }
  }
  .add-icon {
    width: 14px;
    height: 14px;
    float: right;
    margin-top: 2px;
    margin-right: 13px;
  }
`
