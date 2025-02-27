import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import DetailsPage from './DetailsPage'
import { ScrollBox } from 'src/components/common'
import { observer } from 'mobx-react-lite'
import { noticeViewModel } from '../../NoticeViewModel'
import { Spin } from 'src/vendors/antd'

export default observer(function MainDetail() {
  return (
    <Wrapper>
      {noticeViewModel.detailObj.id ? (
        <Spin spinning={noticeViewModel.detailLoading}>
          <DetailsPage data={noticeViewModel.detailObj} />
        </Spin>
      ) : (
        <NullBg />
      )}
    </Wrapper>
  )
})
const NullBg = () => {
  const ImgCon = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    text-align: center;
    height: 400px;
    img {
      width: 144px;
      height: 144px;
      margin-bottom: 12px;
    }
    .text {
      font-size: 22px;
      color: #999999;
    }
  `
  return (
    <ImgCon>
      <img src={require('./images/暂无消息.png')} />
      <div className='text'>未选择通知公告~</div>
    </ImgCon>
  )
}

const Wrapper = styled(ScrollBox)`
  position: fixed;
  left: 480px;
  top: 50px;
  bottom: 0;
  right: 0;
`
