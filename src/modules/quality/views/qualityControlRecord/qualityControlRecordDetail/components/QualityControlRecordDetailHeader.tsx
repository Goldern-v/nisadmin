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
        <span style={{ cursor: 'pointer' }} onClick={qualityControlClick}>
          当前位置；护理质量检查>
        </span>{' '}
        <span style={{ cursor: 'pointer' }} onClick={qualityControlClick}>
          质控记录>
        </span>{' '}
        <span>记录详情</span>
        <div className='topHeaderTitle'>
          20190129-SJNK-003 护理基础质量检查表
          <div className='topHeaderButton'>
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
        <div className='topHeaderStatus'>状态：护士长已评</div>
      </TopHeader>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  background: url(${BG});
  padding-left: 20px;
`
const TopHeader = styled.div`
  height: 36px;
  line-height: 36px;
  .topHeaderTitle {
    margin: 6px 0;
    height: 28px;
    line-height: 28px;
    font-size: 30px;
    font-weight: bold;
    .topHeaderButton {
      margin-right: 20px;
      float: right;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #6767ff;
  }
`
