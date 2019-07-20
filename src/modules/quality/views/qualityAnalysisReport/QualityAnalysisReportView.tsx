import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from './QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
export interface Props extends RouteComponentProps {}

export default observer(function QualityAnalysisReportView() {
  useEffect(() => {
    qualityAnalysisReportViewModal.init()
  }, [])
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '分析报告', link: '/quality/analysis' }, { name: '目录设置', link: '' }]} />
        <div className='title'>2019年3月份XXXXXXXX表单分析报告</div>
        <div className='aside'>
          <span>由王大锤创建，最后修改于2019-01-01 10:00:00</span>
          <span>阅读 1000 赞 299</span>
        </div>
        <div className='tool-con'>
          <Button>删除</Button>
          <Button>预览</Button>
          <Button>发布</Button>
          <Button>打印</Button>
          <Button>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Page>
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
