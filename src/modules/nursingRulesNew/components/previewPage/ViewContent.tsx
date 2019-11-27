import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Icon, Upload, message } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Watermark from 'src/components/Watermark'
import PdfViewer from './../PdfViewer'
import { nursingRulesApiService } from './../../api/nursingRulesNewService'

export interface Props {
  contentWidth: number,
  contentHeight: number,
  loading: boolean,
  pageUrl: string,
  chapter: any,
  chapterTitle: string,
  onLoading?: (loading: boolean) => void
}

const Dragger = Upload.Dragger

export default observer(function ViewContent(props: Props) {
  const { queryObj, history } = appStore
  const search = queryObj
  const viewType = search.viewType
  const {
    contentWidth,
    contentHeight,
    pageUrl,
    loading,
    chapter,
    chapterTitle,
    onLoading
  } = props;

  const defaultStyle = {
    width: `${contentWidth || 720}px`,
    height: `${contentHeight}px`
  }

  const uploadFile = (file: File) => {
    if (file) {
      if (file.name !== chapter.fileName) {
        message.error(`上传的文件名${file.name}与目录指定的文件名${chapter.fileName}不一致`)
        return false
      }
      onLoading && onLoading(true)
      nursingRulesApiService.upLoadChapterBodyFile({
        bookId: search.bookId || '',
        nodeNum: chapter.nodeNum || '',
        remark: '',
        bodyFile: file
      }).then(res => {
        onLoading && onLoading(false)
        message.success('文件已提交,待护理部审核', 1, () => {
          // history.replace(`/nursingRulesNewDetail?bookId=${search.bookId}`)
          history.goBack()
        })
      }, () => onLoading && onLoading(false))
    }
    return false
  }

  const ViewContent = () => {
    if (!pageUrl && loading) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          lineHeight: `${contentHeight / 2 + 100}px`,
          ...defaultStyle
        }}>
        <Icon type="loading" /> 载入中...
        </div>
    }

    if (!viewType && chapter && !chapter.isFileUploaded) {
      return <div className='content-message page-item' style={defaultStyle}>
        <ChapterTitleCon className="no-border">{chapterTitle}</ChapterTitleCon>
        <UploadCon>
          <Dragger
            accept="image/*,.pdf"
            className="ant-dragger"
            beforeUpload={uploadFile}>
            <p className="ant-upload-drag-icon">
              <Icon type="cloud-upload" />
            </p>
            <p className="ant-upload-text">未上传文件</p>
            <p className="ant-upload-hint">请上传 {chapter.fileName || ''}</p>
          </Dragger>
        </UploadCon>
      </div>
    }

    if (!viewType && chapter && chapter.isFileUploaded == 1 && chapter.fileStatus == 1) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          color: '#00A680',
          lineHeight: `${contentHeight / 2 + 100}px`,
          ...defaultStyle
        }}>
        <Icon type="solution" /> 文件已上传,待审核
      </div>
    }

    if (!pageUrl) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          color: 'red',
          lineHeight: `${contentHeight / 2 + 100}px`,
          ...defaultStyle
        }}>
        <Icon type="stop" /> 无预览文件
        </div>
    }

    let pageUrlArr = pageUrl.split('.')
    let type = pageUrlArr[pageUrlArr.length - 1]
    let url = `/crNursing/asset${pageUrl}`

    switch (type) {
      case 'jpg':
      case 'gif':
      case 'jpeg':
      case 'png':
        return <Watermark>
          <ChapterTitleCon>{chapterTitle}</ChapterTitleCon>
          <img src={url} width='100%' className="page-item" />
        </Watermark>
      case 'pdf':
        return <React.Fragment>
          <ChapterTitleCon>{chapterTitle}</ChapterTitleCon>
          <PdfViewer file={url} width={contentWidth - 2} />
        </React.Fragment>
      default:
        return <div
          className='content-message page-item'
          style={{
            fontSize: '16px',
            color: 'red',
            lineHeight: `${contentHeight / 2 + 100}px`,
            ...defaultStyle
          }}>
          <ChapterTitleCon className="no-border">{chapterTitle}</ChapterTitleCon>
          <Icon type="stop" /> 该文件格式不支持预览
        </div>
    }
  }

  return <Wrapper
    style={{
      width: defaultStyle.width,
      minHeight: defaultStyle.height
    }}>
    {ViewContent()}
  </Wrapper>
})

const Wrapper = styled.div`
  margin: 0 auto;
  &>*{
    margin: 0 auto;
    position: relative;
  }
  .page-item{
    background: #fff;
    border: 1px solid #ddd;
  }
  img {
    width: 100%;
  }
  .content-message {
    text-align: center;
    font-size: 14px;
  }
`

const ChapterTitleCon = styled.div`
  height: 31px;
  line-height: 31px;
  font-size: 16px;
  font-weight: bold;
  min-height: 0!important;
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  border-bottom: 0;
  position: relative;
  bottom: -1px;
  z-index: 1;
  &.no-border{
    border: none;
  }
`

const UploadCon = styled.div`
  margin: 0 auto;
  margin-top: 250px;
  width: 200px;
  .ant-upload {
    border-width: 2px!important;
    background: rgba(0,0,0,0.004)!important;
  }
  .ant-upload-list{
    display: none;
  }
`