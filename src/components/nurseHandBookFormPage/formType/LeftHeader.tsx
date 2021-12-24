import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import menuOperation from '../function/menuOperation';
import SelectModal from '../selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any 
}
export default function LeftHeader(props: Props) {
  const { queryObj } = appStore
  const { masterInfo } = props
  let lcr = {
    "left": "start",
    "center": "center",
    "right": "end"
  }
  return (
    <Wrapper>
      <div>
        {/* {masterInfo.leftHead.map((item: any, Idx: any) =>
          <div className="leftHeader"
            key={Idx}
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              ...item.style,
              'WebkitBoxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
              'boxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
              'cursor': item.key == "serialNumber" ? 'no-drop' : 'auto'
            }} 
          >
            111
        </div>)} */}
        <div 
          className="leftHeader" 
          style={{
            width: '100px',
            height: '100px',
            'WebkitBoxPack': 'center',
            'boxPack': 'center',
          }}>
          月工作总结</div>
          <div 
          className="leftHeader" 
          style={{
            width: '100px',
            height: '100px',
            'WebkitBoxPack': 'center',
            'boxPack': 'center',
          }}>
          本月工作亮点</div>
          <div 
          className="leftHeader" 
          style={{
            width: '100px',
            height: '100px',
            'WebkitBoxPack': 'center',
            'boxPack': 'center',
          }}>
          下月改进重点</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.leftHeader {
  border: 1px solid #000;
  font-size: 16px;
  min-height: 35px;
  text-align: center;
  outline: none;
  margin-right:-1px; 
  margin-bottom:-1px;
  display: -webkit-box;
  display: box;
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
`