import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import IndexList from './../IndexList'
import { observer } from 'mobx-react-lite'
import { detailPageModel } from './../../models/detailPageModel'
export interface Props { }

export default observer(function IndexPannel() {
  const { indexList } = detailPageModel

  return <Wrapper>
    <IndexList indexList={indexList} />
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 10px;
  min-height:100%;
  .h1{
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  .h2{
    padding-right: 8px;
    line-height: 30px;
  }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
  }
`