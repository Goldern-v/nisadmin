import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ScrollBox } from 'src/components/common'
import { numberToArray } from 'src/utils/array/array'
export interface Props {}

export default function RightCon() {
  return (
    <Wrapper>
      <TabCon>
        <div className='tab-item'>已读（0）</div>
        <div className='tab-item active'>未读（10）</div>
      </TabCon>
      <ScrollListCon>
        {numberToArray(0, 100).map(() => (
          <UserBox>
            <img src='' alt='' className='head-img' />
            <div className='name'>111</div>
          </UserBox>
        ))}
      </ScrollListCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
`
const TabCon = styled.div`
  height: 36px;
  border-bottom: 1px solid #dedede;
  display: flex;
  .tab-item {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #26a680;
    }
    &.active {
      color: #26a680;
      border-bottom: 3px solid #25a680;
    }
  }
`

const ScrollListCon = styled(ScrollBox)`
  padding: 15px 0;
  height: calc(100% - 36px);
`

const UserBox = styled.div`
  width: 33%;
  float: left;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px auto;
    display: block;
    background: red;
  }
  .name {
    font-size: 13px;
    color: #666666;
    text-align: center;
    margin-bottom: 5px;
  }
`
