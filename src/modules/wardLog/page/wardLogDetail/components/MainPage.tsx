import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import TitleItem from './TitleItem'
import FileCon from './FileCon'
import MessageCon from './MessageCon'
export interface Props {
  pageData: any,
}

interface logItem {
  content: string
  id: string
  indexNo: string
  name: string
  type: string
}

export default React.forwardRef(function MainPage(props: Props, ref: any) {
  const listData = props.pageData.logDetail
  return (
    <Wrapper ref={ref} id='wardLogPrintPage'>
      <PrintHead>
        <div className='title'>{props.pageData.themeName}</div>
        <div className='aside-con'>
          <div className='aside'>创建日期: {props.pageData.detail.createTime}</div>
          <div className='aside'>创建人: {props.pageData.detail.senderName}</div>
          <div className='aside'>科室: {props.pageData.detail.wardName}</div>
        </div>
        <div className="hr"></div>
      </PrintHead>
      <div className="sub-title">
        {listData.filter((item: any) => item.type === '7')
          .map((item: any, idx: number) => <div key={idx}>{item.content}</div>)}
      </div>
      <div className="hr"></div>
      {listData.filter((item: any) => item.type !== '7').map((item: logItem, index: number) => (
        <TitleItem title={item.name} aside={item.content} key={index} />
      ))}
      <TitleItem title={'备注'} aside={props.pageData?.detail?.remark || ''} />
      <Line />
      <FileCon pageData={props.pageData} />
      <BlockLine />
      <MessageCon pageData={props.pageData} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  width: 760px;
  min-height: 740px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  margin: 20px auto;
  padding: 20px;
  .sub-title{
    color: #999;
    word-break: break-all;
  }
  .hr{
    margin: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px dashed #aaa;
  }
`

const Line = styled.div`
  border-top: 1px dashed #cccccc;
  margin-top: 10px;
  margin-bottom: 10px;
`
const BlockLine = styled.div`
  border-top: 10px solid #eeeeee;
  margin-top: 10px;
  margin-bottom: 10px;
`

const PrintHead = styled.div`
  display: none;
  color: #000;
  @media print {
    display: block;
  }
  .title {
    text-align: center;
    font-size: 24px;
    padding: 0 5px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .aside-con {
    margin-bottom: 15px;
  }
  .aside {
    font-size: 14px;
    line-height: 22px;
  }
`
