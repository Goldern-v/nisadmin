import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Document, Page } from 'react-pdf'

export interface Props {
  file: string
  width: number
}

export default function PdfViewer(props: Props) {
  const { file, width } = props

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
      {pages.map((item: number, idx: number) => <Page
        pageNumber={idx + 1}
        width={width} key={idx}
        loading={<div className="page-loading"> </div>} />)}
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