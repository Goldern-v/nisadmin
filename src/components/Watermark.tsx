import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { authStore } from 'src/stores'
export interface Props {
  children: React.ReactNode
}

let list = ['5%', '45%', '80%']

let markList: any[] = []

for (let i = 0; i < list.length; i++) {
  for (let j = 0; j < list.length; j++) {
    markList.push({
      top: list[i],
      left: list[j]
    })
  }
}
console.log(markList, 'markList')
export default function Watermark(props: Props) {
  return (
    <Wrapper>
      {props.children}
      {markList.map((item: any, index: number) => (
        <div className='mark' key={index} style={item}>
          {authStore!.user!.empName + '_' + authStore!.user!.empNo}
          <br />
          {moment().format('YYYY-MM-DD')}
        </div>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  .mark {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(45deg);
    color: #999;
    display: inline-block;
    width: 0;
    white-space: nowrap;
    pointer-events: none;
  }
`
