import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
import { getFileSize } from 'src/utils/file/file'
export interface Props { }

export default observer(function BookPreview() {
  const { indexParams, baseParams, fileList } = editPageModel

  const totalSize = () => {
    let size = 0;
    for (let i = 0; i < fileList.length; i++) {
      size += parseInt(fileList[i].fileSize.toString())
    }
    return getFileSize(size)
  }

  const indexSize = () => {
    let size = 0;
    for (let i = 0; i < indexParams.length; i++) {
      for (let j = 0; j < indexParams[i].childrenList.length; j++) {
        size++
      }
    }

    return size
  }

  return <Wrapper>
    <div className="row">
      <div className="label">书籍名称：</div>
      <div className="content">{baseParams.bookName}</div>
    </div>
    <div className="row">
      <div className="label">文件数：</div>
      <div className="content">共{fileList.length}个文件,总大小为{totalSize()}</div>
    </div>
    <div className="row">
      <div className="label">章节数：</div>
      <div className="content">{indexSize()}章</div>
    </div>
    <div className="row">
      <div className="label">书籍介绍：</div>
      <div className="content">{baseParams.bookBrief}</div>
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