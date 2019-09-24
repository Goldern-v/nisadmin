import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
export interface Props { }

export default function IndexPannel() {

  return <Wrapper>
    <Row>
      <Col span={24}><div className="h1">主标题</div></Col>
    </Row>
    <Row className="split">
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
    </Row>
  </Wrapper>
}
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