import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { Report } from '../../types'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 检查重点弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let report: Report = (data ? data.report : {}) || {}

  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        report: { ...report, keyCheckItemDesc: e.target.value }
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <TextArea value={report.keyCheckItemDesc} onChange={updateData} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
