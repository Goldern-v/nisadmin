import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import { dataTool } from 'echarts'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
const columns: ColumnProps<any>[] = [
  {
    title: '质量项目',
    dataIndex: 'zlxm',
    align: 'left',
    width: 60
  },
  {
    title: '主要问题',
    dataIndex: 'zywt',
    width: 100,
    align: 'left'
  },
  {
    title: '原因分析及整改措施',
    dataIndex: 'yyfx',
    width: 100,
    align: 'left'
  },
  {
    title: '效果评价',
    dataIndex: 'zgcs',
    width: 100,
    align: 'left'
  },
  
]
export default observer(function ImprovementsSection(props: Props) {
  let { sectionId, sectionTitle} = props 
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <BaseTable columns={columns} dataSource={dataTool&&data.list}/>
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
  a {
    line-height: 40px;
    width:100px;
    text-decoration: underline;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
