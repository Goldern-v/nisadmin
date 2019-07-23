import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 追踪督导模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data: Report = qualityAnalysisReportViewModal.getSectionData(sectionId)
  // let textarea = data.textarea || []

  return (
    <Wrapper>
      <div className='title'>{sectionTitle}</div>
      <div className='text-box'> 3.1 {data.checkDeptDesc}</div>
      <TextCon>{data.followUpDeptDesc}</TextCon>
      <div className='text-box'>3.2 科护士长督导以上科室问题整改。</div>
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
  }
  button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-bottom: 5px;
    padding-top: 5px;
  }
`

const TextCon = styled.pre`
  margin: 0px 65px;
  min-height: 20px;
  white-space: pre-wrap;
`
