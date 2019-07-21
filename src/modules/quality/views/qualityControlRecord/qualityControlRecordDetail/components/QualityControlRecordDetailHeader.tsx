import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
const BG = require('../../../../images/顶部背景.png')
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'

interface Props {
  detailData: any
}

export default function qualityControlRecordDetailHeader(props: Props) {
  const topHeaderBack = () => {
    appStore.history.push(`/quality/qualityControlRecord`)
  }
  let master = props.detailData.master || {}
  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            {
              name: '质控记录',
              link: '/quality/qualityControlRecord'
            },
            {
              name: '记录详情'
            }
          ]}
        />
        <div className='topHeaderTitle'>
          <div className='title'>{master.qcName}</div>
          <div className='topHeaderButton'>
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
        <div className='topHeaderStatus'>
          状态：<span style={{ color: '#6767ff' }}>{master.nextNodePendingName}</span>
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
  position: relative;
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
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`
