import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import { Place } from 'src/components/common'
import { appStore } from 'src/stores'
import { localityService } from './api/LocalityService'
export interface Props { }

export default function 应急预案学习详情() {
  const { queryObj, history } = appStore
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const getContent = () => {
    setLoading(true)
    localityService
      .getDetailContent(queryObj.id)
      .then(res => {
        if (res.data) setContent(res.data.detailContent || '')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (queryObj.id)
      getContent()
  }, [])

  return <Wrapper>
    <HeaderCon>
      <Title>应急预案学习详情</Title>
      <Place />
      <Button onClick={() => history.goBack()}>返回</Button>
    </HeaderCon>
    <MainCon>
      <Spin spinning={loading}>
        <div className="pannel" style={{ minHeight: 500 }}>
          <div className="text-title">{queryObj.title}</div>
          <div className="text-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </Spin>
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const MainCon = styled.div`
  flex: 1;
  padding: 0 15px;
  padding-top: 0;
  overflow: auto;
  .ant-spin-container{
    overflow: hidden;
  }
  .pannel{
    width: 100%;
    background: #fff;
    min-height: 50px;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .text-title{
      font-size: 16px;
      text-align: center;
      font-weight: bold;
      color: #000;
    }
  }
`

const HeaderCon = styled.div`
  box-sizing: content-box;
  padding: 15px;
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
  .sub{
    margin-left: 10px;
    &:first-of-type{
      margin-left:0;
    }
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`