import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import { ScrollBox } from 'src/components/common'
import MainPage from './components/MainPage'
import RightCon from './components/RightCon'
import { useRef } from 'src/types/react'
import printing from 'printing'
import { wardLogService } from '../../services/WardLogService'
import { Spin } from 'src/vendors/antd'
import { fileDownload } from 'src/utils/file/file'

export interface Props { }

export default function WardLogDetail() {
  const [pageData, setPageData]: any = useState({
    comments: [],
    themeName: '',
    detail: {
      attachmentList: []
    },
    logDetail: [],
    progressDrop: [],
    readReceiver: [],
    unreadReceiver: []
  })
  const [pageLoading, setPageLoading] = useState(false)
  const printRef: any = useRef(null)
  const onPrint = () => {
    let _title = document.title
    document.title = pageData.themeName
    printing(printRef.current, {
      scanStyles: false,
      injectGlobalCss: true,
      css: `
         @page {
           margin: 10mm;
         }
         #wardLogPrintPage {
           margin: 0;
           border: 0;
         }
      `
    })
    setTimeout(() => {
      document.title = _title
    }, 500)
  }

  const onLoad = () => {
    setPageLoading(true)
    wardLogService.getDetail(appStore.queryObj.id).then((res) => {
      setPageLoading(false)

      setPageData(res.data)
    }, err => setPageLoading(false))
  }

  const onExport = () => {
    setPageLoading(true)

    wardLogService
      .exportDetail(pageData)
      .then(res => {
        setPageLoading(false)

        fileDownload(res)
      }, err => setPageLoading(false))
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Wrapper>
      <Spin spinning={pageLoading} style={{ height: '100vh', maxHeight: '100vh' }}>
        <HeadCon className='healthEducationHeadCon'>
          <BaseBreadcrumb data={[{ name: '病区日志', link: '/wardLog' }, { name: '日志详情', link: '' }]} />
          <div className='title'>{pageData.themeName}</div>
          <div className='aside'>日期：{pageData.detail.createTime}</div>
          <div className='tool-con'>
            <Button onClick={() => onPrint()}>打印</Button>
            <Button onClick={() => onExport()}>导出</Button>
            <Button onClick={() => appStore.history.goBack()}>返回</Button>
          </div>
        </HeadCon>
        <LeftPart>
          <MainPage ref={printRef} pageData={pageData} />
        </LeftPart>
        <RightPart>
          <RightCon pageData={pageData} />
        </RightPart>
      </Spin>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`

const LeftPart = styled(ScrollBox)`
  position: fixed;
  left: 0;
  top: 150px;
  right: 300px;
  bottom: 0;
  background: #eeeeee;
`
const RightPart = styled.div`
  position: fixed;
  width: 300px;
  top: 150px;
  right: 0;
  bottom: 0;
  background: #ffffff;
  border-left: 1px solid #dedede;
`
