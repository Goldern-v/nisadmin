import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
// 二级标题
export default observer(function TextareaSection2(props: Props) {
  let { sectionId, sectionTitle, keyName } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value=data ? data.value :{}
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle}/>
      <TextCon>{value&&value[keyName]}</TextCon>
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;

  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
