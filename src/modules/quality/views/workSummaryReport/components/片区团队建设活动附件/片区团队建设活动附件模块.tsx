import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { workSummaryReportViewModal } from '../../WorkSummaryReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 片区团队建设活动附件模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = workSummaryReportViewModal.getSectionData(sectionId)
  let list: any[] = data.list || []

  return (
    // <Wrapper>
    //   <TextCon>
    //     <div className="img-group">
    //       {list.map((item, index: number) => (
    //         <div className="img-contain">
    //           <img src={item.attachUrl} alt="" className="img" key={index} />
    //         </div>
    //       ))}
    //     </div>
    //   </TextCon>
    //   <EditButton onClick={() => workSummaryReportViewModal!.openEditModal(sectionId)}>附件编辑</EditButton>
    // </Wrapper>
    <React.Fragment>
      <Wrapper>
        <div className="hidden"></div>
        <div>
          {list.map((item, index: number) => (
            <div className="img-contain" key={index}>
              <img src={item.attachUrl} alt="" className="img" />
            </div>
          ))}
        </div>
        <EditButton onClick={() => workSummaryReportViewModal!.openEditModal(sectionId)}>附件编辑</EditButton>
      </Wrapper>
    </React.Fragment>
  )
})

const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  overflow: hidden;
  .sup-title {
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
    color: #000;
    margin-bottom: 5px;
  }
  .hidden{
    height:30px;
    width: 100%;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .img-contain{
    width: 305px;
    height: 200px;
    margin-bottom: 10px;
    float: left;
    position: relative;
    page-break-inside: avoid;
    &:nth-of-type(2n-1){
      margin-right: 10px;
      margin-left: 50px;
    }
    /* .img {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50%,-50%);
    } */
    .img {
      width: 100%;
      height: 100%;
    }
  }
`
