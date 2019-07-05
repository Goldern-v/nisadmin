import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Tooltip } from 'antd'
import { DetailObj } from '../../type'
import { authStore } from 'src/stores'
export interface Props {
  data: DetailObj
}

export default function DetailsPage(props: Props) {
  let { data } = props
  return (
    <Wrapper>
      <ToolCon>
        <Tooltip placement='bottom' title='删除'>
          <div className='item-box'>
            <img src={require('./images/删除.png')} alt='' />
          </div>
        </Tooltip>
        <Tooltip placement='bottom' title='收藏'>
          <div className='item-box'>
            <img src={require('./images/收藏.png')} alt='' />
          </div>
        </Tooltip>
      </ToolCon>
      <HeadCon>{data.title}</HeadCon>
      <PageCon>
        <InfoCon>
          <img
            src={
              data.showType == '收'
                ? data.nearImageUrl
                  ? data.nearImageUrl
                  : require('src/assets/images/护士默认头像.png')
                : authStore.user && authStore.user.nearImageUrl
                ? authStore.user.nearImageUrl
                : require('src/assets/images/护士默认头像.png')
            }
            className='head-img'
            alt=''
          />
          <div className='text-con'>
            <div className='name'>{data.senderName}</div>
            <div className='aside'>{data.sendTime}</div>
          </div>
        </InfoCon>
        {data.showType == '发' && <Aside>8人已读，90人未读</Aside>}

        <Line />
        <TextCon>{data.content}</TextCon>
        <Line />
        <FooterCon>
          <div className='title'>
            <span>附件（）</span>
            <span className='down-all-text'>批量下载</span>
          </div>
          <FileCon>
            <div className='file-box'>
              <div className='file-inner'>
                <img src='' alt='' className='type-img' />
                <div className='file-name'>123213</div>
                <div className='file-size'>12321</div>
              </div>
            </div>
          </FileCon>
        </FooterCon>
      </PageCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 850px;
  position: relative;
  margin: 0 auto;
`

const HeadCon = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
  margin-right: 100px;
  margin-bottom: 14px;
  margin-top: 18px;
  font-weight: bold;
`

const ToolCon = styled.div`
  position: absolute;
  right: 0;
  top: 0px;
  .item-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 13px;
    cursor: pointer;
    &:hover {
      background: #e8e8e8;
    }
    img {
      width: 15px;
      height: 15px;
    }
  }
`

const PageCon = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(204, 204, 204, 1);
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  min-height: calc(100vh - 130px);
`

const InfoCon = styled.div`
  height: 42px;
  padding: 12px 0;
  box-sizing: content-box;
  .head-img {
    float: left;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .text-con {
    margin-left: 52px;
    .name,
    .aside {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      margin-right: 30px;
      font-size: 15px;
      color: #333333;
      font-weight: bold;
    }
    .aside {
      font-size: 13px;
      color: #999;
    }
  }
`

const Aside = styled.div`
  font-size: 12px;
  color: #999;
  margin: 6px 0 8px;
`
const Line = styled.div`
  border-top: 1px dotted #dddddd;
`

const TextCon = styled.pre`
  font-size: 13px;
  color: #333333;
  padding: 12px 0;
  flex: 1;
  white-space: pre-wrap;
`

const FooterCon = styled.div`
  padding-bottom: 20px;
  .title {
    margin: 9px 0 14px;
    span {
      font-size: 13px;
      color: #333;
    }
    .down-all-text {
      color: ${(p) => p.theme.$mtc};
    }
  }
`

const FileCon = styled.div`
  margin: 0 -5px;
  overflow: hidden;
  .file-box {
    width: 25%;
    float: left;
    .file-inner {
      height: 125px;
      background: rgba(246, 246, 246, 1);
      border-radius: 2px;
      border: 1px dotted rgba(0, 166, 128, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 10px;
      .type-img {
        height: 44px;
        width: 44px;
      }
      .file-name {
        font-size: 13px;
        color: #333333;
        margin: 5px 0;
      }
      .file-size {
        font-size: 13px;
        color: #999;
      }
    }
  }
`
