import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 标题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitMonthModel.getSectionData(sectionId)
  let text = data ? data.text : ''
  useEffect(() => { })
  return (
    <Wrapper className='page-title'>
      <div className='title'>{text}</div>
      <EditButton border={true} onClick={() => patientVisitMonthModel.openEditModal(sectionId)}>
        编辑名称
      </EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 40px 30px 20px;
  position: relative;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
    color: #000;
  }
  button {
    position: absolute;
    top: 40px;
    right: 20px;
  }
`
