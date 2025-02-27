import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message } from 'src/vendors/antd'
import { starRatingReportEditModel } from './model/StarRatingReportEditModel'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { Report } from './types'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { starRatingReportService } from './api/StarRatingReportService'
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function StarRatingReportEdit() {
  const pageRef: any = useRef<HTMLElement>()
  const { isRoleManage, isSupervisorNurse, isDepartment } = authStore
  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))

    starRatingReportEditModel.init(query)
  }, [])

  let report: Report = starRatingReportEditModel.getDataInAllData('report')

  let reportName = starRatingReportEditModel.getSectionData('报告名称')!.text || report.reportName

  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
    let title = document.title
    document.title = reportName
    printFun(pageRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
         .ant-btn,.hidden {
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
         .img-group{
           margin-top: 0 !important;
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
      starRatingReportService.delete(qs.parse(appStore.query)).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/starRatingReport')
        }, 500)
      })
    })
  }
  const onPublish = () => {
    globalModal.confirm('提交确认', '你确定要提交该报告吗？').then((res) => {
      starRatingReportService.publish(qs.parse(appStore.query)).then((res) => {
        message.success('提交成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/starRatingReport')
        }, 500)
      })
    })
  }
  const onCancelPublish = () => {
    globalModal.confirm('撤销确认', '你确定要撤销该报告吗？').then((res) => {
      starRatingReportService.cancelPublish(qs.parse(appStore.query)).then((res) => {
        message.success('撤销成功')
        setTimeout(() => {
          appStore.history.push('/qcOne/starRatingReport')
        }, 500)
      })
    })
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb
          data={[{ name: '星级考核报表', link: '/qcOne/starRatingReport' }, { name: '报告详情', link: '' }]}
        />
        <div className='title'>{reportName}</div>
        <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}</span>}
          </span>
        </div>
        <div className='tool-con'>
          {(isRoleManage && !isSupervisorNurse && !isDepartment) && <React.Fragment>
            <Button onClick={onDelete}>删除</Button>
            {report.status == '1' ? (
              <Button onClick={onCancelPublish}>撤销</Button>
            ) : (
                <Button onClick={onPublish}>提交</Button>
              )}
          </React.Fragment>}
          {(isRoleManage || isSupervisorNurse || isDepartment) && <Button onClick={() => onPrint(true)}>打印</Button>}
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Page ref={pageRef} className='print-page'>
          {starRatingReportEditModel.sectionList.map((item, index) => {
            if (item.sectionId) {
              let Components = starRatingReportEditModel.getSection(item.sectionId)
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
        {starRatingReportEditModel.baseModal && <starRatingReportEditModel.baseModal.Component />}
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
