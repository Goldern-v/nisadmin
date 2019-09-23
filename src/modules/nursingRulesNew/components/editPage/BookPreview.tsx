import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
export interface Props { }

export default observer(function BookPreview() {

  return <Wrapper>
    <div className="row">
      <div className="label">书籍名称：</div>
      <div className="content">书籍名称</div>
    </div>
    <div className="row">
      <div className="label">文件数：</div>
      <div className="content">共120个文件,总大小为300MB</div>
    </div>
    <div className="row">
      <div className="label">章节数：</div>
      <div className="content">12章</div>
    </div>
    <div className="row">
      <div className="label">书籍介绍：</div>
      <div className="content">书籍介绍</div>
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
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
  }
  .content{
    flex: 1;
    line-height: 30px;
    font-size: 14px;
  }
}
`