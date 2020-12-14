import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
import { Report } from '../../types'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 亮点弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let text = data ? data.text : ''

  const updateData = (e: any) => {
    if (setData) {
      setData({
        text: e.target.value
      })
    }
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      <TextArea value={text} onChange={updateData} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
