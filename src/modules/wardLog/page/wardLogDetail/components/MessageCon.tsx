import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  pageData: any
}

interface CommentItem {
  commentTime: string
  content: string
  empName: string
  empNo: string
  nearImageUrl: string
}

export default function MessageCon(props: Props) {
  return (
    <Wrapper>
      <div className='title'>评价（{props.pageData.comments.length}）</div>
      {props.pageData.comments.map((item: CommentItem, index: number) => (
        <MessageItem key={index}>
          <HeaderBox>
            <img src={item.nearImageUrl || require('src/assets/images/护士默认头像.png')} alt='' className='head-img' />
            <div className='text-con'>
              <div className='name'>{item.empName}</div>
              <div className='time'>{item.commentTime}</div>
            </div>
          </HeaderBox>
          <div className='message'>{item.content}</div>
        </MessageItem>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 17px;
    color: #333333;
    margin-bottom: 10px;
  }
`
const MessageItem = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0;
  .message {
    margin-left: 52px;
    font-size: 14px;
    color: #666666;
    margin-top: 5px;
  }
`

const HeaderBox = styled.div`
  height: 42px;
  display: flex;
  .head-img {
    height: 42px;
    width: 42px;
    object-fit: contain;
  }
  .text-con {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .name {
      font-size: 15px;
      color: #333333;
    }
    .time {
      font-size: 13px;
      color: #666666;
    }
  }
`
