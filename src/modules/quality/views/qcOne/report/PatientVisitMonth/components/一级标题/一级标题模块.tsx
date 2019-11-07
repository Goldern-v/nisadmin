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

export default observer(function 一级标题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitMonthModel.getSectionData(sectionId)
  useEffect(() => { })
  return (
    // <Wrapper className='page-title'>
    <Wrapper>
      <span className='sup-title'>{data.text || sectionTitle}</span>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  position: relative;
  padding: 10px 0 0;
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
  .sup-title {
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
    color: #000;
    margin-bottom: 10px;
  }
`
