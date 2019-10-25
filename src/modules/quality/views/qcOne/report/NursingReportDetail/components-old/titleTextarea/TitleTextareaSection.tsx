import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function TitleTextareaSection(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let textarea = data ? data.textarea : ''

  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <TextCon>{textarea}</TextCon>
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
