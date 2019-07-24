import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from './QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps {}

export default observer(function QualityAnalysisReportView() {
  const pageRef: any = useRef<HTMLElement>()
  useEffect(() => {
    qualityAnalysisReportViewModal.init()
  }, [])
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  const onPrint = () => {
    // console.log(pageRef, 'pageRef.current')
    printing(pageRef.current, {
      injectGlobalCss: true,
      scanStyles: false
    })
  }
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '分析报告', link: '/quality/analysis' }, { name: '报告详情', link: '' }]} />
        <div className='title'>{report.reportName}</div>
        <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}</span>}
          </span>
        </div>
        <div className='tool-con'>
          <Button>删除</Button>
          <Button>预览</Button>
          <Button>发布</Button>
          <Button onClick={onPrint}>打印</Button>
          <Button onClick={() => appStore.history.push('/quality/analysis')}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Page ref={pageRef}>
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
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
