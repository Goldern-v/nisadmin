import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
const columns: ColumnProps<any>[] = [
  {
    title: '指标',
    dataIndex: 'zb',
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
    title: '原因分析',
    dataIndex: 'yyfx',
    width: 100,
    align: 'left'
  },
  {
    title: '整改措施',
    dataIndex: 'zgcs',
    width: 100,
    align: 'left'
  },
  {
    title: '效果评价',
    dataIndex: 'xgpj',
    width: 100,
    align: 'left'
  },
]
export default observer(function ProblemImpSection(props: Props) {
  let { sectionId, sectionTitle} = props 
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let conclusion:any=data&&data.value
  let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div className='context'>共 <div className='inp'>  {conclusion&&conclusion.overallIndicator}  </div> 项指标，达标<div className='inp'>  {conclusion&&conclusion.standardIndicators}  </div>项，未达标<div className='inp'>  {conclusion&&conclusion.nonComplianceIndicators}  </div>项</div>
      <div className='context'>科室不达标指标分析改进：</div>
      <BaseTable columns={columns} dataSource={data.list&&data.list.tableData}/>
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
  .context {
    margin-left:26px;
  }
  .inp {
    display: inline-block;
    width: 60px;
    text-align: center;
    border-bottom: 1px solid #000;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
