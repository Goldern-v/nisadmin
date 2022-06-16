import styled from 'styled-components'
import React, { useRef } from 'react'
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

export default observer(function ProblemImproveTableSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value: any[] = (data ? data.value : []) || []
  const columns = [
    {
      key: 'deptName',
      title: '质量项目',
      width: 110,
    },
    {
      key: 'deptName',
      title: '主要问题（汇总A、B-A类问题）',
      width: 110,
    },
    {
      key: 'empName',
      title: '原因分析及整改措施',
      width: 200,
    },
    {
      key: 'score',
      title: '效果评价',
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
`

