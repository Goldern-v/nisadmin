import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import EditButton from 'src/modules/quality/components/EditButton'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
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
    align: 'center',
    width: 60
  },
  {
    title: '主要问题',
    dataIndex: 'zywt',
    width: 100,
    align: 'center'
  },
  {
    title: '原因分析',
    dataIndex: 'yyfx',
    width: 100,
    align: 'center'
  },
  {
    title: '整改措施',
    dataIndex: 'zgcs',
    width: 100,
    align: 'center'
  },
  {
    title: '效果评价',
    dataIndex: 'xgpj',
    width: 100,
    align: 'center'
  },
]
export default observer(function ProblemImpSection(props: Props) {
  let { sectionId, sectionTitle} = props 
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let conclusion:any=data&&data.list&&data.list.conclusion
  let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div>共 <a>  {conclusion&&conclusion.zb}  </a> 项指标，达标<a>  {conclusion&&conclusion.db}  </a>项，未达标<a>  {conclusion&&conclusion.wdb}  </a>项</div>
      <div>科室不达标指标分析改进：</div>
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
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
