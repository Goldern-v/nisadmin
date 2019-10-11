import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { checkWardReportViewModal } from '../../CheckWardReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem, Report } from '../../types'
import ImgCon from '../common/ImgCon'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 本月查房详情模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = checkWardReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []
  let report: Report = checkWardReportViewModal.getDataInAllData('report')
  let allData = checkWardReportViewModal.dataList || []

  return (
    <Wrapper>
      <OneLevelTitle text='二、本月查房详情' />
      <div className='text-box'>
        {/* {allData.map((item: any, index: number) => (
        ))} */}
        <div className='aside'>肿瘤一：护士着装不规范护士着装不规范护士着装不规范护士着装不规范</div>
        <ImgCon />
      </div>
      {/* <EditButton onClick={() => checkWardReportViewModal!.openEditModal(sectionId)}>编辑</EditButton> */}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
  }
  button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-top: 5px;
  }
`
