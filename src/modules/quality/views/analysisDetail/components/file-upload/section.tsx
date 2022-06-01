import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
import MultiFileUploader from 'src/components/MultiFileUploader'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
}

export default observer(function FileUploaderSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let list: any = (data ? data.list : []) || []
  
  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div className="contain">
        <MultiFileUploader data={list || []} readOnly={true} />
      </div>
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
  .contain {
    padding: 0 30px 35px;
  }

`

