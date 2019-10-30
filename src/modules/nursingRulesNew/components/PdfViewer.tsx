import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
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
  //     })
  //   }
  // }, [pdfjsLib, file])

  // const [page, setPage] = useState(1);
  const [pages, setPages] = useState([] as number[]);

  const handleSuccess = (info: any) => {
    let pages = info.numPages;
    let pageArr = [] as number[];

    while (pages--) {
      pageArr.push(pages)
    }
    setPages(pageArr)
  }

  const noData = <div className="message">暂无文件</div>

  const loading = <div className="message">文件载入中</div>

  const error = <div className="message">文件加载失败</div>

  return <Wrapper>
    <Document file={file} onLoadSuccess={handleSuccess} noData={noData} loading={loading} error={error}>
      {pages.map((item: number, idx: number) =>
        <Watermark key={idx}>
          <Page
            pageNumber={idx + 1}
            width={width}
            loading={<div className="page-loading"> </div>} />
        </Watermark>)}
    </Document>
  </Wrapper>
}
const Wrapper = styled.div`
  .message{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%);
    font-size: 14px;
  }
`