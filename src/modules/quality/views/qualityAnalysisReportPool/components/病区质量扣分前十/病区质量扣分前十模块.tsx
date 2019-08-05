import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 病区质量考核前十模块(props: Props) {
  const { sectionId } = props;
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId);
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  const Title = () => {
    let str = '';
    if (report.type == 'month') {
      str = `${report.indexInType}月`
    } else {
      let seasonCn = '';
      switch (report.indexInType) {
        case 1:
          seasonCn = '一'; break;
        case 2:
          seasonCn = '二'; break;
        case 3:
          seasonCn = '三'; break;
        case 4:
          seasonCn = '四'; break;
      }
      str = `第${seasonCn}季度`
    }
    return str
  }
  console.log(data.list);
  const TwoColTable = () => {
    const splitIdx = Math.ceil(data.list.length / 2);

    return <div className="two-col-table">
      <table className="left">
        <colgroup></colgroup>
      </table>
      <table className="right">

      </table>
    </div>
  }
  return <Wrapper>
    <TextCon>
      <span>2.{Title()}病区质量扣分前十名的科室</span>
    </TextCon>
    {TwoColTable()}
    <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
  </Wrapper>
})

const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .sup-title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  /* &:hover {
    button {
      display: block;
    }
  } */
  button {
    /* display: none; */
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
    }
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`