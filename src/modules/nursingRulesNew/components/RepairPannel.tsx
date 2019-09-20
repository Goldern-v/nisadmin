import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props { }

export default function RepairPannel() {

  return <Wrapper>
    <div className="item">
      <div className="main-title">标题</div>
      <div className="sub">
        <div className="sub-item">
          <span className="icon"></span>
          <span>上传:</span>
          <span>2019-08-10</span>
          <span>王大锤</span>
        </div>
        <div className="sub-item">
          <span className="icon"></span>
          <span>审核:</span>
          <span>2019-08-10</span>
          <span>王大锤</span>
        </div>
      </div>
      <div className="desc">书籍描述</div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
.item{
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
  .main-title{
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  .sub-item{
    display: inline-block;
    margin-right: 10px;
    >span{
      margin-right: 5px;
    }
  }
  .desc{
    margin-top: 5px;
  }
`