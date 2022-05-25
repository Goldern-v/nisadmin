import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
import MultiFileUploader from 'src/components/MultiFileUploader'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}

export default observer(function FileUploaderSection(props: Props) {
  let { sectionId, sectionTitle, keyName } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value: any[] = (data ? data.value : []) || []
  
  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <div className="contain">
        <MultiFileUploader data={value} readOnly={true} />
      </div>
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
  .contain {
    padding: 0 30px 5px;
  }

`

