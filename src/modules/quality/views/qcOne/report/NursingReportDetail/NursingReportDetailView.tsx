import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from './QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { qualityAnalysisReportPoolService } from './services/QualityAnalysisReportPoolService'
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  const { isRoleManage, isDepartment, isSupervisorNurse, isOnlyRoleManage } = authStore
  const pageRef: any = useRef<HTMLElement>()
  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    qualityAnalysisReportViewModal.init(query)
  }, [])
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
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
         table { page-break-inside:auto }
         tr{ page-break-inside:avoid; page-break-after:auto }
      `
    })
    setTimeout(() => {
      document.title = title
    }, 500)
  }
  const onDelete = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      qualityAnalysisReportPoolService.deleteReport().then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/nursingReportList')
        }, 500)
      })
    })
  }
  const onPublish = () => {
    globalModal.confirm('提交确认', '你确定要提交该报告吗？').then((res) => {
      qualityAnalysisReportPoolService.publishReport().then((res) => {
        message.success('提交成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/nursingReportList')
        }, 500)
      })
    })
  }
  const onCancelPublish = () => {
    globalModal.confirm('撤销确认', '你确定要撤销该报告吗？').then((res) => {
      qualityAnalysisReportPoolService.cancelPublishReport().then((res) => {
        message.success('撤销成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/nursingReportList')
        }, 500)
      })
    })
  }
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '病区护理工作报表', link: '/qcOne/nursingReportList' }, { name: '报告详情', link: '' }]} />
        <div className='title'>{report.reportName}</div>
        <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}</span>}
          </span>
        </div>
        <div className='tool-con'>
          {isOnlyRoleManage && <Button onClick={onDelete}>删除</Button>}
          {/* <Button onClick={() => onPrint(false)}>预览</Button> */}
          {/* {report.status == '1' ? (
            <Button onClick={onCancelPublish}>撤销</Button>
          ) : (
              <Button onClick={onPublish}>提交</Button>
            )} */}
          {isRoleManage && <Button onClick={() => onPrint(true)}>打印</Button>}
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Page ref={pageRef} className='print-page'>
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
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
