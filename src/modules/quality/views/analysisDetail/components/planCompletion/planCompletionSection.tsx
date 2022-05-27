import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import { MainCon } from './style'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}

export default observer(function planCompletionSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let ygznr=data.text&&data.text.ygznr
  let wcqk=data.text&&data.text.wcqk
  let report: Report = (data ? data.report : {}) || {}

  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div className='context_box'>
        <MainCon>
          <div className='title-top'>
            月工作内容
          </div>
          <div className="title-top">
            完成情况
          </div>
          <div className='ipt'>
            <div className='text'>
              <div className='title'> 1.工作计划:</div>
              <span>
                {ygznr&&ygznr.gzjh}
              </span>
            </div>
            <div className='text'>
              <div className='title'> 2.培训计划:</div>
              <span>
              {ygznr&&ygznr.pxjh}
              </span>
            </div>
          </div>
          <div className='ipt'>
            <div className='text'>
              <div className='title'> 1.工作计划:</div>
              <span>
              {wcqk&&wcqk.gzjh}
              </span>
            </div>
            <div className='text'>
              <div className='title'> 2.培训计划:</div>
              <span>
              {wcqk&&wcqk.pxjh}
              </span>
            </div>
          </div>
        </MainCon>
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
`
