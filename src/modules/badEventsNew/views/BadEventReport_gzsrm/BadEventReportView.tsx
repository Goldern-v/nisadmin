import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message,Spin } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { badEventReportService } from './services/BadEventReportService'
import PageContent from "./components/PageContent"
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  const [pageData,setPageData] = useState([])
  const [currentPage,setCurrentPage]:any = useState({})
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint,setIsPrint] = useState(false)
  const [spinning,setSpinning] = useState(false)

  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    query.name = query.name || query.themeName
    setCurrentPage(query)
    setSpinning(true)
    badEventReportService.getReport(query).then((res:any)=>{
      let list = res.data.map((item:any)=>{
        let keys = Object.keys(item.dataMap)
        let dataArr = keys.filter((dataMapItem:any)=>item.dataMap[dataMapItem]['例数']!=0).map((dataMapItem:any)=>{
          return {name:dataMapItem,...item.dataMap[dataMapItem],value:item.dataMap[dataMapItem]['例数']}
        })
        return {keys,dataArr,...JSON.parse(JSON.stringify(item))}
      })
      setPageData(list)
      setSpinning(false)
  })
  }, [])


  const onPrint = (isPrint: boolean) => {
    setIsPrint(isPrint)
    let printFun = isPrint ? printing : printing.preview
    let title = document.title
    document.title = '不良事件分析报告'
    setTimeout(() => {
      printFun(pageRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
           .ant-btn {
             display: none;
           }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 auto;
           }
           .page-title {
             min-height: 20px;
             padding: 0px 30px 20px;
           }
           .page-title .title {
             text-align: center;
             margin-right: 0;
           }
           table, img {
             page-break-inside: avoid;
           }
           pre {
            page-break-after: avoid;
           }
           * {
             color: #000 !important;
           }
           .ant-spin-nested-loading{
             height:auto;
           }
           .footer-title {
             min-height: 0;
             margin-bottom: 0;
           }
           table { page-break-inside:auto }
           tr{ page-break-inside:avoid; page-break-after:auto }
          .chart-con>div{
            display: none;
          }
          .chart-con .chart-con-img{
            max-width: 100%;
            display: inline!important;
          }
        `
      }).then(()=>{
        setIsPrint(false)
      })
    }, 500)

    setTimeout(() => {
      document.title = title
    }, 800)
  }
  const onDelete = () => {
    if(!currentPage.id)return message.warning('此报表尚未保存！')
    setSpinning(true)
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      badEventReportService.deleteReport(currentPage).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/badEventsNew/不良事件分析报告')
        }, 500)
      })
    })
  }
  const onSave = () => {
    setSpinning(true)
    let params = currentPage
      badEventReportService.saveReport(params).then((res) => {
        message.success('保存成功')
        setTimeout(() => {
          appStore.history.push('/badEventsNew/不良事件分析报告')
        }, 500)
      })
  }
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '不良事件分析报告', link: '/home/不良事件分析报告' }, { name: '报告详情', link: '' }]} />
        <div className='title'>{currentPage.name}</div>
        <div className='aside'>
          <span>
            由{currentPage.creatorName}创建于{currentPage.createDate}<span></span>
          </span>
        </div>
        <div className='tool-con'>
          <Button onClick={() => onSave()} loading={spinning}>保存</Button>
          <Button onClick={() => onDelete()} loading={spinning}>删除</Button>
          <Button onClick={() => onPrint(true)} loading={spinning}>打印</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning}>
          <Page ref={pageRef} className='print-page'>
            <div style={{fontSize:'30px',fontWeight:700,textAlign:'center',lineHeight:'60px'}}>{currentPage.name}</div>
            <PageContent isPrint={isPrint} pageData={pageData} currentPage={currentPage}></PageContent>
          </Page>
        </Spin>
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
`

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
const Page = styled.div`
  width: 720px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
