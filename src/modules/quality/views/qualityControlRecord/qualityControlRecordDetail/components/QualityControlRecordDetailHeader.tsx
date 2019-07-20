import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
const BG = require('../../../../images/顶部背景.png')
import { Button } from 'antd'
export default function qualityControlRecordDetailHeader() {
  let sendPath = '111111111111111'
  const qualityControlClick = () => {
    appStore.history.push(`/quality/qualityControlRecord`)
  }
  const topHeaderBack = () => {
    appStore.history.push(`/quality/qualityControlRecord`)
  }
  return (
    <Con>
      <TopHeader>
        <div className='topHeaderClass'>
          <span className='topHeaderSpan1' onClick={qualityControlClick}>
            护理质量
          </span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span className='topHeaderSpan2' onClick={qualityControlClick}>
            质控记录
          </span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#6767FF' }}>记录详情</span>
        </div>
        <div className='topHeaderTitle'>
          20190129-SJNK-003 护理基础质量检查表
          <div className='topHeaderButton'>
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
        <div className='topHeaderStatus'>
          状态：<span style={{ color: '#6767ff' }}>护士长已评</span>
        </div>
      </TopHeader>
    </Con>
  )
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  /* background: url(${BG}); */
  /* background:linear-gradient(180deg,rgba(248,248,252,1) 0%,rgba(235,236,240,1) 100%); */
  padding-left: 20px;
  /* border-bottom: 1px solid #ddd; */
`
const TopHeader = styled.div`
  /* height: 26px;
  line-height: 26px; */
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    color: black;
    /* font-weight: bold; */
    .topHeaderButton {
      margin-right: 20px;
      float: right;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`
