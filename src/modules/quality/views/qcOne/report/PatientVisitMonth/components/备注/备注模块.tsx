import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import { Report } from '../../types'
import createModal from 'src/libs/createModal'
import service from 'src/services/api'
import OneLevelTitle from '../common/OneLevelTitle'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 备注模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitMonthModel.getSectionData(sectionId)
  let report: Report = patientVisitMonthModel.getDataInAllData('report')
  const previewModal = createModal(PreviewModal)

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text="备注" />
      <EditButton onClick={() => patientVisitMonthModel.openEditModal(sectionId)}>编辑</EditButton>
      <pre>{data.text || ''}</pre>
      <previewModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 5px 0;
  position: relative;

  .sup-title {
    color: #000;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  pre{
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 15px 50px;
    padding-bottom:0;
  }
`
