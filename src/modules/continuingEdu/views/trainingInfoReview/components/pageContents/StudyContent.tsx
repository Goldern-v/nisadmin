import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseSetting from '../pageItems/BaseSetting'
import Participation from '../pageItems/Participation'
import FileUploadReview from '../pageItems/FileUploadReview'
import TestInfo from '../pageItems/TestInfo'
import PrecticeSetting from '../pageItems/PrecticeSetting'
import OperateSetting from '../pageItems/OperateSetting'
import OuterLink from '../pageItems/OuterLink'
import Questionnaire from '../pageItems/Questionnaire'
import StudyNote from '../pageItems/studyNote'
import {scheduleStore } from 'src/stores'

export interface Props {
  data: any
}

export default function StudyContent(props: Props) {
  const { data } = props

  const otherContent = () => {
    switch (data.teachingMethodName) {
      case '学习':
        return <React.Fragment>
          <FileUploadReview info={data}/>
          <OuterLink info={data}/>
          <GradientBand/>
          <StudyNote info={data}/>
        </React.Fragment>
      case '培训':
        return <React.Fragment>
          <FileUploadReview info={data}/>
          <Questionnaire info={data}/>
          <GradientBand/>
          <StudyNote info={data}/>
        </React.Fragment>
      case '考试':
        return <TestInfo info={data}/>
      case '练习':
        return <PrecticeSetting info={data}/>
      case '实操':
        return <OperateSetting info={data}/>
      default:
        return <FileUploadReview info={data}/>
    }
  }
  useEffect(()=>{
    scheduleStore.getPrintHtml(document.getElementById('print-detail-container') as HTMLDivElement)
  },[data.title])
  return <Wrapper>
    <div id='print-detail-container'>
      <div className="main-title">
        {data.title && <span>《{data.title}》</span>}
      </div>
      <BaseSetting info={data}/>
      <Participation info={data}/>
      {/* <FileUploadReview info={data} />
    <TestInfo />
    <PrecticeSetting />
    <OperateSetting /> */}
      {otherContent()}
    </div>
  </Wrapper>
}
const Wrapper = styled.div``
const GradientBand = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 5px;
  background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);
`
