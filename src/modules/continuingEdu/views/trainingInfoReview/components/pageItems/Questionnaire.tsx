import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import createModal from "src/libs/createModal";
import TestPageModal from './../TestPageModal/TestPageModal'

export interface Props {
  info?: any
}

//问卷设置
export default function PrecticeSetting(props: Props) {
  const { info } = props
  const testPage = createModal(TestPageModal)

  const handleReview = () => {
    testPage.show({
      id: info.id,
      teachingMethodName: info.teachingMethodName,
      title: info.title,
      startTime: info.startTime,
      endTime: info.endTime,
      examDuration: info.examDuration,
      passScores: info.passScores,
      hideAnwserInfo: true,
    })
  }

  return <Wrapper>
    <div className="content-item-title">问卷设置</div>
    {info.questionStat && <React.Fragment>
      {/* <div className="row">
        <span>一份试卷</span>
      </div> */}
      <div className="row">
        <span>《{info.questionStat.questionnaireTitle}》    {info.questionStat.questionCount || 0}题  </span>
        <Button type="primary" size="small" onClick={handleReview}>预览</Button>
      </div>
    </React.Fragment>}
    {!info.questionStat && <div className="row">
      <span style={{ color: '#999' }}>未设置</span>
    </div>}
    <testPage.Component />
  </Wrapper>
}

const Wrapper = styled.div`
  .row{
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    padding-left: 15px;
    .label{
      float: left;
      text-align: right;
      min-height:16px;
      &.w-106{
        width: 106px;
      }
    }
    .content{
      overflow: hidden;
      padding-right: 50px;
    }
  }
`