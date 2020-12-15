import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { getFilePrevImg, getFileType } from 'src/utils/file/file'
import service from 'src/services/api'
import { getFileSize } from 'src/utils/file/file'
import { trainingInfoReviewService } from './../../api/TrainingInfoReviewService'

import createModal from 'src/libs/createModal'
import PreviewModal from 'src/modules/continuingEdu/views/onlineLearning/modal/PreviewModal'
import TestPageModal from '../TestPageModal/TestPageModal'
export interface Props {
  info: any
}

export default function StudyUpload(props: Props) {
  const { info } = props
  const fileList = info.attachmentList || []
  const previewModal = createModal(PreviewModal)
  const testPageModal = createModal(TestPageModal)

  const showReview = (file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path,
      videoQuestionList: fileList,
      id: file.id,
    })
  }

  const downFile = (path: string, name: string) => {
    // service.commonApiService.getFileAndDown(path, name)
    trainingInfoReviewService.downloadPage(path, name)
  }

  return <Wrapper>
    <div className="content-item-title">上传文档</div>
    <div className="content-item-pannel">
      {fileList.map((item: any, idx: number) =>
        <div key={idx} className="file-item">
          <img
            src={getFilePrevImg(item.name)}
            className='type-img'
            style={{ cursor: 'pointer' }}
            alt='' />
          <div className="file-title" title={item.name}>{item.name}</div>
          <div className="file-size">{getFileSize(item.size)}</div>
          <Button
            className="download-btn"
            size="small"
            onClick={() => downFile(item.path, item.name)}>
            下载
          </Button>
          <Button
            className="preview-btn"
            size="small"
            onClick={() => showReview(item)}>
            预览
          </Button>
          {(item.viQuestionList && item.viQuestionList.length > 0) &&
            <Button
              className="video-page-btn"
              size="small"
              onClick={() => {
                testPageModal.show({
                  teachingMethodName: info.teachingMethodName,
                  title: `${item.name} 视频题目`,
                  videoQuestionList: item.viQuestionList,
                  // hideAnwserInfo: true,
                })
              }}>
              题目查看
          </Button>}
        </div>)}
    </div>
    <previewModal.Component />
    <testPageModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  .content-item-pannel{
    padding: 0 12px;
  }
  .file-item{
    background: #eee;
    margin-bottom: 8px;
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
    right: 186px;
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
    right: 65px;
    top: 15px;
  }
  .download-btn{
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .video-page-btn{
    position: absolute;
    right: 122px;
    top: 15px;
  }
`