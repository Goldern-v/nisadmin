import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
const BG = require('../../../../../images/顶部背景.png')
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import createModal from 'src/libs/createModal'

interface Props {
  detailData: any
  onload: any
}


export default function Header(props: Props) {
  // let Title = props.detailData.record

  useEffect(() => {
    console.log(props.detailData)
  }, [])

  //根据当前状态和角色显示按钮名称
  const onRole = (nodeName: string) => {
    switch (nodeName) {
      case '质控组长审核':
      {
      }
      break
      case '护理部评价':
      {
      }
      break
    }
  }

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
              name: '护理质量检查',
              link: '/quality'
            },
            {
              name: '查房记录',
              link: '/quality/checkWard/record'
            },
            {
              name: '记录详情'
            }
          ]}
        />
        <div className='topHeaderTitle'>
          <div className='title'> 护理中夜班查房记录表</div>
          <div className='topHeaderButton'>
            {/* {nextNode.nodeName && (
              <Button onClick={() => onAduit(nextNode.nodeName)} type='primary' disabled={!nextNode.canHandle}>
                {nextNode.nodeName}
              </Button>
            )} */}
            <Button onClick={() => {appStore.history.push(`/quality/checkWard/record`)}}>返回</Button>
          </div>
        </div>
        <div className='topHeaderStatus'>
          状态：<span style={{ color: '#6767ff' }}>待质控组长审核</span>
        </div>
      </TopHeader>
    </Con>
  )
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
`
const TopHeader = styled.div`
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
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
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
