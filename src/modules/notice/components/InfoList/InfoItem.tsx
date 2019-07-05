import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { InfoListItem } from '../../type'
export interface Props {
  data: InfoListItem
  onClick: () => any
  active: boolean
}

export default function InfoItem(props: Props) {
  let { data, onClick, active } = props
  return (
    <Wrapper onClick={onClick} className={active ? 'active' : ''}>
      <img src={data.nearImageUrl || require('src/assets/images/护士默认头像.png')} className='head-img' alt='' />
      <TextCon>
        <div className='title'>{data.title}</div>
        <div className='aside'>{data.content}</div>
      </TextCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 42px;
  padding: 12px;
  box-sizing: content-box;
  cursor: pointer;
  .head-img {
    float: left;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  &.active,
  &:hover {
    background: #eeeeee;
  }
`
const TextCon = styled.div`
  margin-left: 52px;
  .title,
  .aside {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title {
    margin-right: 30px;
    font-size: 15px;
    color: #333333;
    margin-bottom: 3px;
    font-weight: bold;
  }
  .aside {
    font-size: 13px;
    color: #666666;
  }
`
