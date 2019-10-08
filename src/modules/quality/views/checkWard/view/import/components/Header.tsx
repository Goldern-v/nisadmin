import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { checkWardService } from '../../../services/CheckWardService'
import { fileDownload } from 'src/utils/file/file'
const BG = require('../../../../../images/顶部背景.png')

export default function Header() {

  //模版下载
  const roomDownload = () => {
    checkWardService.searchRoomDownload().then((res) => {
      fileDownload(res)
    })
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
              name: '护理质量',
              link: '/quality'
            },
            {
              name: '查房计划表',
              link: '/quality/checkWard/schedule'
            },
            {
              name: '导入计划'
            }
          ]}
        />
        <div className='topHeaderTitle'>
          <div className='title'>导入查房计划</div>
          <div className='topHeaderButton'>
            <Button onClick={roomDownload}>查房计划模版下载</Button>
            <Button onClick={() => {appStore.history.push(`/quality/checkWard/schedule`)}}>返回</Button>
          </div>
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
      top: 30px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`
