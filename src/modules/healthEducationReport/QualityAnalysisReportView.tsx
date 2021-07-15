import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from './QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { qualityAnalysisReportService } from './services/QualityAnalysisReportService'
import { addCSS } from 'src/utils/css/css'
import $ from 'jquery'
export interface Props extends RouteComponentProps { }

export default observer(function QualityAnalysisReportView() {
  const pageRef: any = useRef<HTMLElement>()
  useEffect(() => {
    qualityAnalysisReportViewModal.init()
  }, [])
  let instance: any = qualityAnalysisReportViewModal.getDataInAllData('instance')
  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
    let title = document.title
    document.title = instance.title

    addCSS(
      window,
      `
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
    .footer-title {
      min-height: 0;
      margin-bottom: 0;
    }
    .NavBar, .healthEducationHeadCon {
      display: none !important;
    }
    #root {
      width: 920px;
    }
    .healthEducationScrollCon {
      height: 100%;
    }
    .MainLayoutRouterViewCon, .healthEducationScrollCon {
      overflow: visible;
    }
    .MainLayoutWrapper  {
      position: static;
    }
    `,
      'healthEducationStyle'
    )
    window.print()
    setTimeout(() => {
      document.title = title
      $('#healthEducationStyle').remove()
    }, 500)
  }
  const onDelete = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      qualityAnalysisReportService.deleteReport().then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/setting/healthEducationReportList')
        }, 500)
      })
    })
  }
  const onPublish = () => {
    globalModal.confirm('发布确认', '你确定要发布该报告吗？').then((res) => {
      qualityAnalysisReportService.publishReport().then((res) => {
        message.success('发布成功')
        setTimeout(() => {
          appStore.history.push('/setting/healthEducationReportList')
        }, 500)
      })
    })
  }
  const onCancelPublish = () => {
    globalModal.confirm('撤销发布确认', '你确定要撤销发布该报告吗？').then((res) => {
      qualityAnalysisReportService.cancelPublishReport().then((res) => {
        message.success('撤销成功')
        setTimeout(() => {
          appStore.history.push('/setting/healthEducationReportList')
        }, 500)
      })
    })
  }
  return (
    <Wrapper>
      <Spin spinning={qualityAnalysisReportViewModal.pageLoading}>
        <HeadCon className='healthEducationHeadCon'>
          <BaseBreadcrumb
            data={[{ name: '分析报告', link: '/setting/healthEducationReportList' }, { name: '报告详情', link: '' }]}
          />
          <div className='title'>{instance.title}</div>
          <div className='aside'>
            <span>
              由{instance.creatorName}创建{instance.updateTime && <span>，最后修改于{instance.updateTime}</span>}
            </span>
          </div>
          <div className='tool-con'>
            <Button onClick={onDelete}>删除</Button>
            {/* <Button onClick={() => onPrint(false)}>预览</Button> */}
            {instance.status == '1' ? (
              <Button onClick={onCancelPublish}>撤销</Button>
            ) : (
              <Button onClick={onPublish}>发布</Button>
            )}

            <Button onClick={() => onPrint(true)}>打印</Button>
            <Button onClick={() => appStore.history.push('/setting/healthEducationReportList')}>返回</Button>
          </div>
        </HeadCon>
        <ScrollCon className='healthEducationScrollCon'>
          <Page ref={pageRef} className='print-page'>
            <div className='hospital-name'>{appStore.HOSPITAL_Name}</div>
            {qualityAnalysisReportViewModal.sectionList.map((item, index) => {
              if (item.sectionId) {
                let Components = qualityAnalysisReportViewModal.getSection(item.sectionId)
                if (Components && Components.section) {
                  return (
                    <Components.section
                      key={index}
                      sectionId={item.sectionId}
                      modalTitle={item.modalTitle}
                      sectionTitle={item.sectionTitle}
                    />
                  )
                }
              }
            })}
          </Page>
          {qualityAnalysisReportViewModal.baseModal && <qualityAnalysisReportViewModal.baseModal.Component />}
        </ScrollCon>
      </Spin>
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
  width: 920px;
  margin: 20px auto 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  img {
    max-width: 200px;
    max-height: 200px;
  }
  .hospital-name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
  }
`
// @ts-ignore
const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
