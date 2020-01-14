import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { getFilePrevImg, getFileType } from 'src/utils/file/file'
export interface Props { }

export default function StudyUpload() {

  return <Wrapper>
    <div className="content-item-title">上传文档</div>
    <div className="content-item-pannel">
      <div className="file-item">
        <img
          src={getFilePrevImg('abc.pdf')}
          className='type-img'
          style={{ cursor: 'pointer' }}
          alt='' />
        <div className="file-title">2019年新职工培训教学计划.doc</div>
        <div className="file-size">1.3MB</div>
        <Button className="preview-btn" size="small">预览</Button>
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  .content-item-pannel{
    padding: 0 12px;
  }
  .file-item{
    background: #eee;
    border-radius: 5px;
    padding: 10px;
    height: 80px;
    width: 100%;
    position: relative;
    .type-img{
      width: 60px;
      height: 60px;
    }
  }
  .file-title{
    font-size: 13px;
    position: absolute;
    top: 15px;
    left: 80px;
    right: 80px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .file-size{
    font-size: 13px;
    position: absolute;
    color: #999;
    top: 45px;
    left: 80px;
  }
  .preview-btn{
    position: absolute;
    right: 10px;
    top: 15px;
  }
`