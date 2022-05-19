import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'src/vendors/antd'
import { Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function TextareaModal(props: Props) {
  let { sectionId, setData, data } = props
  const analysisDetailModal = useRef(getModal())

  let report: Report = (data ? data.report : {}) || {}
  let section = analysisDetailModal.current.getSection(sectionId)
  const keyName = section?.keyName ? section.keyName : ''
  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        report: { ...report, [keyName]: e.target.value }
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <TextArea value={report[keyName]} onChange={updateData} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
