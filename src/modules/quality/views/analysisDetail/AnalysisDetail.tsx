import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message } from 'src/vendors/antd'
import { getModal } from './AnalysisDetailModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { appStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { analysisDetailApi } from './api'
import Header from '../analysisDetail/components/header/headerSection'
import { routePath, checkRole } from './util/tool'
export interface Props extends RouteComponentProps {}

export default observer(function AnalysisDetail() {
  const pageRef: any = useRef<HTMLElement>()
  // 根据params获取对应实例
  const analysisDetailModal = useRef(getModal())
  const { queryObj } = appStore
  useEffect(() => {
    analysisDetailModal.current.init()
  }, [])

  let report: Report = analysisDetailModal.current.getDataInAllData('pageInfo')
  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
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
  }
  const onDelete = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      analysisDetailApi.deleteReport(queryObj.id).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push(routePath())
        }, 500)
      })
    })
  }
  const onPublish = () => {
    globalModal.confirm('发布确认', '你确定要发布该报告吗？').then((res) => {
      analysisDetailApi.publishReport(queryObj.id).then((res) => {
        message.success('发布成功')
        setTimeout(() => {
          appStore.history.push(routePath())
        }, 500)
      })
    })
  }
  const onCancelPublish = () => {
    globalModal.confirm('撤销发布确认', '你确定要撤销发布该报告吗？').then((res) => {
      analysisDetailApi.revokeReport(queryObj.id).then((res) => {
        message.success('撤销成功')
        setTimeout(() => {
          appStore.history.push(routePath())
        }, 500)
      })
    })
  }
  return (
    <Wrapper>
      <HeadCon>
        {/* check: 需要修改 */}
        <BaseBreadcrumb data={[{ name: '分析报告', link: routePath() }, { name: '报告详情', link: '' }]} />
        <div className='title'>{report.reportName}</div>
        <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}{report.status=='0'?<span className='status_save'>保存</span>:<span className='status_publish'>发布</span>}</span>}
          </span>
        </div>
        <div className='tool-con'>
          {report.status == '0'&&checkRole()&&(<Button onClick={onDelete}>删除</Button>)}
          {/* <Button onClick={() => onPrint(false)}>预览</Button> */}
          {report.status == '1' && checkRole() && (
            <Button onClick={onCancelPublish}>撤销</Button>
          )}
          { report.status != '1' && checkRole() && (
            <Button onClick={onPublish}>发布</Button>
          )}

          <Button onClick={() => onPrint(true)}>打印</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon status={report.status}>
        <Page ref={pageRef} className='print-page' >
          <Header sectionTitle={report.reportName}></Header>
          {analysisDetailModal.current.sectionList.map((item: any, index: number) => {
            if (item.sectionId) {
              let Components = analysisDetailModal.current.getSection(item.sectionId)
              if (Components && Components.section) {
                return (
                  <Components.section
                    key={index}
                    sectionId={item.sectionId}
                    modalTitle={item.modalTitle}
                    sectionTitle={item.sectionTitle}
                    keyName={item.keyName}
                  />
                )
              }
            }
          })}
        </Page>
        {analysisDetailModal.current.baseModal && <analysisDetailModal.current.baseModal.Component />}
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
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
  .status_save {
    color:red;
    font-size: 14px;
    margin-left:10px
  }
  .status_publish {
    color:rgb(74, 164, 234);
    font-size: 14px;
    margin-left:10px
  }
  
`
const Page = styled.div`
  width: 720px;
  margin: 20px auto 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;

`
const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
  .ant-btn {
    display:${props => props.status=='1' ? "none" : "block"};
    
  }
  input {
    -moz-appearance: textfield;
  }
`
