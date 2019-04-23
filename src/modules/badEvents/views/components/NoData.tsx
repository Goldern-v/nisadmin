import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Breadcrumb } from 'antd'
import store from 'src/stores'
// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { observer } from 'mobx-react-lite'
export interface Props extends RouteComponentProps {}

// const BG = require('../../../images/顶部背景.png')

const P1 = require('src/modules/badEvents/views/EventAlanysis/images/1.png')
const P2 = require('src/modules/badEvents/views/EventAlanysis/images/2.png')
const P3 = require('src/modules/badEvents/views/EventAlanysis/images/3.png')
const P4 = require('src/modules/badEvents/views/EventAlanysis/images/4.png')
const P5 = require('src/modules/badEvents/views/EventAlanysis/images/5.png')

const pages = [P1, P2, P3, P4, P5]

// const DEFAULT_HEADIMG = require('../../../images/护士默认头像.png')

// const WARNNING_ICON = require('../../../images/注意.png')

export default observer(function NoData () {
  let history = store.appStore.history

  console.log('history', history, history.location.pathname)

  return (
    <Wrapper>
      {/* <NoDataBox>暂无分析报告～</NoDataBox> */}
      <PagesBox>
        {pages.map((p: any) => (
          <PageImg src={p} />
        ))}
      </PagesBox>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 45px;
  width: 100%;
  padding: 0;
  /* box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1); */
  /* border-bottom: 1px solid #dbe0e4; */
  font-size: 13px;
  position: relative;
`
const BreadcrumbCon = styled.div`
  padding: 12px 15px;
`

const A = styled.span`
  color: #666666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`

const HeadImg = styled.img`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  left: 15px;
  bottom: 15px;
  object-fit: cover;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  top: 58px;
  left: 100px;
  position: absolute;
`
const Info = styled.div`
  font-size: 13px;
  color: #666;
  top: 88px;
  left: 100px;
  position: absolute;
`

const Tip = styled.div`
  font-size: 13px;
  color: #333;
  position: absolute;
  right: 20px;
  bottom: 30px;
  img {
    width: 14px;
    margin-right: 4px;
    margin-top: -4px;
  }
`
const ClickSpan = styled.span`
  cursor: pointer;
  color: #5472c4;
  margin: 0px 4px;
  display: inline-block;
  border-bottom: 1px solid #5472c4;
`

const NoDataBox = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20%;
`

const PagesBox = styled.div`
  width: 100%;
  margin: auto auto;
  text-align: center;
  z-index: -1;
`

const PageImg = styled.img`
  width: 750px;
  margin: 20px 0;
  padding: 20px 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`
