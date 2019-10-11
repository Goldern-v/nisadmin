import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, DatePicker, Spin } from 'src/vendors/antd'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
import { checkWardReportViewModal } from './CheckWardReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { checkWardReportService } from './services/CheckWardReportService'
export interface Props extends RouteComponentProps {}

export default observer(function CheckWardReportView() {
  const pageRef: any = useRef<HTMLElement>()
  useEffect(() => {
    checkWardReportViewModal.init()
  }, [])
  let report: Report = checkWardReportViewModal.getDataInAllData('report')
  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
    let title = document.title
    document.title = report.reportName
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
         .footer-title {
           min-height: 0;
           margin-bottom: 0;
         }
      `
    })
    setTimeout(() => {
      document.title = title
    }, 500)
  }
  const onDelete = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      checkWardReportService.deleteReport().then((res: any) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/quality/analysis')
        }, 500)
      })
    })
  }
  const onPublish = () => {
    globalModal.confirm('发布确认', '你确定要发布该报告吗？').then((res) => {
      checkWardReportService.publishReport().then((res: any) => {
        message.success('发布成功')
        setTimeout(() => {
          appStore.history.push('/quality/analysis')
        }, 500)
      })
    })
  }
  const onCancelPublish = () => {
    globalModal.confirm('撤销发布确认', '你确定要撤销发布该报告吗？').then((res) => {
      checkWardReportService.cancelPublishReport().then((res: any) => {
        message.success('撤销成功')
        setTimeout(() => {
          appStore.history.push('/quality/analysis')
        }, 500)
      })
    })
  }
  return (
    <Wrapper>
      <HeadCon>
        <div className='title'>护理查询分析报告</div>
        <div className='tool-con'>
          <span className='label'>查房日期：</span>
          <RangePicker
            style={{ width: 250 }}
            value={checkWardReportViewModal.selectedDate}
            onChange={(date) => {
              checkWardReportViewModal.selectedDate = date
              checkWardReportViewModal.onload()
            }}
          />
          <Button type='primary' onClick={() => checkWardReportViewModal.onload()}>查询</Button>
          <Button onClick={() => onPrint(true)}>打印</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Page ref={pageRef} className='print-page'>
          {checkWardReportViewModal.sectionList.map((item, index) => {
            if (item.sectionId) {
              let Components = checkWardReportViewModal.getSection(item.sectionId)
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
        <div className="example">
          <Spin spinning={checkWardReportViewModal.pageLoading} size="large"></Spin>
        </div>
        </Page>
        {checkWardReportViewModal.baseModal && <checkWardReportViewModal.baseModal.Component />}
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
  height: 50px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .tool-con {
    margin-right: 20px;
    button {
      margin-left: 15px;
    }
  }
`
const Page = styled.div`
  width: 720px;
  margin: 20px auto 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  img {
    max-width: 200px;
    max-height: 200px;
  }
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
  .example {
    position:absolute;
    left: 0;
    top: 0;
    /* background: rgba(0, 0, 0, 0.05); */
    width: 100%;
    height: 100%;
    display:flex; 
    align-items:center; 
    justify-content:center
  }
`
