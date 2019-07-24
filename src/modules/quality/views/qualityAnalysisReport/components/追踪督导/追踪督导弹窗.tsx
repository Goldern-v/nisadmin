import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Report } from '../../types'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 追踪督导弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let report: Report = (data ? data.report : {}) || {}
  const updateData1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        report: { ...report, checkDeptDesc: e.target.value }
      })
    }
  }
  const updateData2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        report: { ...report, followUpDeptDesc: e.target.value }
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <div className='title'>科室：</div>
      <TextArea value={report.followUpDeptDesc} onChange={updateData2} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 60px !important;
    resize: none;
    margin-bottom: 10px;
  }
  .title {
    font-weight: bold;
    margin-bottom: 4px;
  }
`
