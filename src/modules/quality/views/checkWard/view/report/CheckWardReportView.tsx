import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, message, DatePicker, Spin, Modal } from 'src/vendors/antd'
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
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import { numberToArray } from 'src/utils/array/array'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'

export interface Props extends RouteComponentProps { }

export default observer(function CheckWardReportView() {
  const pageRef: any = useRef<HTMLElement>()
  useEffect(() => {
    checkWardReportViewModal.init()
  }, [])
  let report: Report = checkWardReportViewModal.getDataInAllData('report')
  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
    // let title = document.title
    // document.title = report.reportName
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
    // setTimeout(() => {
    //   document.title = title
    // }, 500)
  }

  const { year, month, status, id } = appStore.queryObj
  const { pageLoading } = checkWardReportViewModal

  const handlePublish = () => {
    Modal.confirm({
      title: '提示',
      content: '你确定要发布该报告吗？',
      centered: true,
      onOk: () => {

        checkWardReportViewModal.setPageLoading(true)
        checkWardReportService.publishReport(id).then(res => {
          checkWardReportViewModal.setPageLoading(false)
          message.success('发布成功', 1, () => {
            appStore.history.replace('/checkWard/checkWardReportList')
          })
        }, () => checkWardReportViewModal.setPageLoading(false))

      }
    })


  }

  const handleDelete = () => {
    Modal.confirm({
      title: '提示',
      content: '你确定要删除该报告吗？',
      centered: true,
      onOk: () => {
        checkWardReportViewModal.setPageLoading(true)
        checkWardReportService.deleteReport(id).then(res => {
          checkWardReportViewModal.setPageLoading(false)
          message.success('删除成功', 1, () => {
            appStore.history.replace('/checkWard/checkWardReportList')
          })
        }, () => checkWardReportViewModal.setPageLoading(false))
      }
    })

  }

  const handleCancel = () => {
    Modal.confirm({
      title: '提示',
      content: '你确定要撤销该报告吗？',
      centered: true,
      onOk: () => {
        checkWardReportViewModal.setPageLoading(true)
        checkWardReportService.cancelPublishReport(id).then(res => {
          checkWardReportViewModal.setPageLoading(false)
          message.success('撤销成功', 1, () => {
            appStore.history.replace('/checkWard/checkWardReportList')
          })
        }, () => checkWardReportViewModal.setPageLoading(false))
      }
    })

  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb
          data={[{ name: '特殊时段查房报告', link: '/checkWard/checkWardReportList' }, { name: '报告详情', link: '' }]}
        />
        <div className='title'>
          {year}年{month}月 特殊时段查房报告
        </div>
        <div className='tool-con'>
          {/* <span className='label'>年度：</span>
          <YearPicker
            style={{ width: '100px', marginRight: '15px' }}
            value={checkWardReportViewModal.selectedYear}
            onChange={(date: any) => {
              checkWardReportViewModal.selectedYear = date
              checkWardReportViewModal.onload()
            }}
            allowClear={false}
          />

          <span className='label'>月份：</span>
          <Select
            style={{ width: '100px', marginRight: '5px' }}
            value={checkWardReportViewModal.selectedMonth}
            onChange={(date: any) => {
              checkWardReportViewModal.selectedMonth = date
              checkWardReportViewModal.onload()
            }}
          >
            {numberToArray(11).map((item) => (
              <Select.Option value={item + 1} key={item}>
                {item + 1}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={() => checkWardReportViewModal.onload()}>查询</Button> */}
          {(!pageLoading) && id && <Button onClick={handleDelete}>删除</Button>}
          {(!pageLoading) && id && status && status === '0' && <React.Fragment>
            <Button onClick={handlePublish}>发布</Button>
          </React.Fragment>}
          {(!pageLoading) && id && status && status === '1' && <React.Fragment>
            <Button onClick={handleCancel}>撤销</Button>
          </React.Fragment>}
          <Button onClick={() => onPrint(true)}>打印</Button>
          <Button onClick={() => appStore.history.replace('/checkWard/checkWardReportList')}>返回</Button>
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
  height: 78px;
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
    bottom: 7px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`
const Page = styled.div`
  width: 720px;
  margin: 20px auto 0px;
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
  height: calc(100vh - 50px);
  .example {
    position:absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display:flex; 
    align-items:center; 
    justify-content:center
  }
`
