import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import BaseTable from 'src/components/BaseTable'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
}

export default observer(function NursingJobEvalTableSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value: any[] = (data ? data.value : []) || []
  
  const columns = [
    {
      key: 'deptName',
      title: '科室',
      width: 110,
    },
    {
      key: 'empName',
      title: '护士长',
      width: 80,
    },
    {
      key: 'score',
      title: '得分',
      width: 80,
    },
    {
      key: 'mq',
      title: '主要问题',
      width: 200,
    },
  ]
  
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle}/>
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <BaseTable dataSource={value} columns={columns} />
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
