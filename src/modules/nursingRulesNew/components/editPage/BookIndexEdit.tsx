import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
export interface Props { }

export default observer(function BookIndexEdit() {
  let fileRef = React.createRef<HTMLInputElement>()
  let { indexParams } = editPageModel;

  const handleUpload = () => {
    if (fileRef.current) fileRef.current.click();
  }

  return <Wrapper>
    <div className="row">
      <div className="label">目录上传：</div>
      <div className="content">
        <Button onClick={handleUpload}>点击上传</Button>
        <span className="tips"> (需要按照目录模板格式，点击此处<span className="template-download">下载</span>目录模板)</span>
        <input ref={fileRef} type="file" accept=".xls" />
      </div>
    </div>
    <div className="index-list">
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
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 10px;
  .row{
    width: 800px;
    display: flex;
    margin-bottom: 10px;
    &>div{
    line-height: 30px;
    }
    .label{
      width: 80px;
      font-size: 14px;
      text-align: right;
      margin-right: 10px;
    }
    .content{
      flex: 1;
    }
  }
  .index-list{
    padding: 10px;
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
  }
  .tips{
    color: #999;
  }
  .template-download{
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    :hover{
      font-weight: bold;
    }
  }
  input[type="file"]{
    display: none;
  }
`