import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, message } from 'antd'
import { Document, Page } from 'react-pdf'
import Watermark from 'src/components/Watermark'

export interface Props {
  file: string
  width: number
}

export default function PdfViewer(props: Props) {
  const { file, width } = props

  // const [pdfjsLib, setPdfjsLib] = useState({} as any)

  // useEffect(() => {
  //   let _window = window as any

  //   if (!_window.pdfjsLib) {
  //     let $script = document.createElement('script') as HTMLScriptElement
  //     $script.type = 'text/javascript'
  //     $script.src = '/pdfJs/pdf.js'
  //     $script.id = 'pdfJs'
  //     $script.onload = () => {
  //       setPdfjsLib(_window.pdfjsLib)
  //     }

  //     document.body.appendChild($script)
  //   } else {
  //     setPdfjsLib(_window.pdfjsLib)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (pdfjsLib.getDocument) {
  //     pdfjsLib.getDocument(file).promise.then((res: any) => {
  //       // console.log(res.numPages)
  //     }).catch((err:any)=>{})
  //   }
  // }, [pdfjsLib, file])

  // const [page, setPage] = useState(1);
  const [pages, setPages] = useState([] as number[]);

  useEffect(() => {
    setPages([])
  }, [file])

  const handleSuccess = (info: any) => {
    let pages = info.numPages;
    let pageArr = [] as number[];

    while (pages--) {
      pageArr.push(pages)
    }
    setPages(pageArr)
  }

  const handleError = (err: any) => {
    // console.log(err)
    message.error(`${err.name}: ${err.message}`)
  }

  const currentStyle = {
    height: `${width * 1.4}px`,
    lineHeight: `${width * 1.4 / 2 + 100}px`
  }

  const noData = <div className="message" style={currentStyle}>
    <Icon type="stop" />
    <span> 暂无文件</span>
  </div>

  const loading = <div className="message" style={currentStyle}>
    <Icon type="loading" />
    <span> PDF载入中...</span>
  </div>

  const error = <div className="message error" style={currentStyle}>
    <Icon type="close-circle" />
    <span> PDF加载失败</span>
  </div>

  return <Wrapper>
    <Document
      file={file}
      onLoadSuccess={handleSuccess}
      onLoadError={handleError}
      noData={noData}
      loading={loading}
      error={error}>
      {pages.map((item: number, idx: number) =>
        <Watermark key={idx}>
          <Page
            pageNumber={idx + 1}
            width={width}
            loading={<div className="page-loading"> </div>} />
          <div className="page-info">
            {`第${idx + 1}页/共${pages.length}页`}
          </div>
        </Watermark>)}
    </Document>
  </Wrapper>
}
const Wrapper = styled.div`
  .react-pdf__Document{
    border:none;
    background-color: rgba(0,0,0,0);
    &>div{
      background: #fff;
      border: 1px solid #ddd;
      margin-bottom: 15px;
    }
  }
  .message{
    /* position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%); */
    font-size: 16px;
    text-align:center;
    &>*{
      vertical-align: middle;
    }
    &.error{
      color: red;
    }
  }
  .page-info {
    width: 100%;
    margin: 0 auto;
    border-top: 0;
    padding: 10px 0;
    text-align: center;
  }
`