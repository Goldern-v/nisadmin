import styled from 'styled-components'
import React, { useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import BaseTable from 'src/components/BaseTable'
import moment from 'moment'
import { ColumnProps } from 'antd/es/table'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
}

export default observer(function EmWorkStatisticTableSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let value: any[] = (data ? data.value : []) || []
  let Year:string = moment().format('YYYY')
  const columns: ColumnProps<any>[] = [
    {
      key: 'deptName',
      dataIndex: 'deptName',
      title: '项目',
      width: 110,
    },
    {
      key: 'mq',
      dataIndex: 'mq',
      title: Number(Year) - 1 + '年' ,
      width: 200,
    },
    {
      key: 'empName',
      dataIndex: 'empName',
      title: Year + '年',
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

