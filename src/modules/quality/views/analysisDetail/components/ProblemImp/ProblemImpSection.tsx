import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { ColumnProps } from 'antd/lib/table'
import BaseTable from 'src/components/BaseTable'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}

export default observer(function ProblemImpSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value = data?.value
  let tableData = value ? [{ ultQuestion: value&&value.ultQuestion, improveFeedback: value&&value.improveFeedback }] : []
  const columns: ColumnProps<any>[] = [
    {
      title: '上月问题',
      dataIndex: 'ultQuestion',
      align: 'center',
      width: 60,
      
    },
    {
      title: '问题反馈',
      dataIndex: 'improveFeedback',
      width: 100,
      align: 'center'
    },
  ]
  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <BaseTable dataSource={tableData} columns={columns}/>
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
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
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
