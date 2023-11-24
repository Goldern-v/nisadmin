import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import TitleItem from './TitleItem'
import FileCon from './FileCon'
import MessageCon from './MessageCon'
import { Input, Button } from 'antd';
import { appStore } from "src/stores";

const { TextArea } = Input;
export interface Props {
  pageData: any,
  commentSubmit?: (content:any) => void,
}

interface logItem {
  content: string
  id: string
  indexNo: string
  name: string
  type: string
  rowOne :number | undefined
}

export default React.forwardRef(function MainPage(props: Props, ref: any) {
  const [content, setContent] = useState('')
  const listData = props.pageData.logDetail
  let wardLogType =  sessionStorage.getItem('wardLogType')

  const _commentSubmit = async() => {
    props.commentSubmit && props.commentSubmit(content)
    setContent('')
  }
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
        <TitleItem rowOne={item.rowOne} title={item.name} type={item.type} aside={item.content} key={index} />
      ))}
      <TitleItem title={'备注'} aside={props.pageData?.detail?.remark || ''} />
      <Line />
      <FileCon pageData={props.pageData} />
      <BlockLine />
      <MessageCon pageData={props.pageData} />
      { wardLogType === '3' && appStore.HOSPITAL_ID ==='qhwy'  && <Line />}
      { wardLogType === '3' && appStore.HOSPITAL_ID ==='qhwy' && <Comment>
        <TextArea value={content} onChange={(e: any) => {
          setContent(e.target.value)
        }} rows={3} />
        <Button className='button' type="primary" onClick={_commentSubmit} disabled={content === ''}>发送</Button>
      </Comment>}
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

const Comment = styled.div`
  text-align: right;
  .button{
    margin-top: 10px;
  }
`