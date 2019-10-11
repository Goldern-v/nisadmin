import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { checkWardReportViewModal } from '../../CheckWardReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 标题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = checkWardReportViewModal.getSectionData(sectionId)
  let text = data ? data.text : ''
  useEffect(() => {})
  return (
    <Wrapper className='page-title'>
      <div className='title'>{checkWardReportViewModal.year}年{checkWardReportViewModal.month}月中夜班及特殊时段查房汇总表{text}</div>
      {/* <EditButton border={true} onClick={() => checkWardReportViewModal.openEditModal(sectionId)}>
        编辑
      </EditButton> */}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 40px 30px 20px;
  position: relative;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #000;
  }
  button {
    position: absolute;
    top: 40px;
    right: 20px;
  }
`
