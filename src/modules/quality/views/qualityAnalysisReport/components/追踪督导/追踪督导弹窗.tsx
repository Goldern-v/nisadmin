import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { Report } from '../../types'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: Report
  setData: any
}

export default function 追踪督导弹窗(props: Props) {
  let { sectionId, setData, data } = props

  const updateData1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        ...data,
        checkDeptDesc: e.target.value
      })
    }
  }
  const updateData2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        ...data,
        followUpDeptDesc: e.target.value
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <TextArea value={data.checkDeptDesc} onChange={updateData1} autosize={true} />
      <TextArea value={data.followUpDeptDesc} onChange={updateData2} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
    margin-bottom: 10px;
  }
`
