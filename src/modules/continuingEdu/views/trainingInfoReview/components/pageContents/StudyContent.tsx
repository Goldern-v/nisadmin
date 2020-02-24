import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseSetting from '../pageItems/BaseSetting'
import Participation from '../pageItems/Participation'
import FileUploadReview from '../pageItems/FileUploadReview'
import TestInfo from '../pageItems/TestInfo'
import PrecticeSetting from '../pageItems/PrecticeSetting'
import OperateSetting from '../pageItems/OperateSetting'
export interface Props {
  data: any
}

export default function StudyContent(props: Props) {
  const { data } = props

  const otherContent = () => {
    switch (data.teachingMethodName) {
      case '考试':
        return <TestInfo info={data} />
      case '练习':
        return <PrecticeSetting info={data} />
      case '实操':
        return <OperateSetting info={data} />
      default:
        return <FileUploadReview info={data} />
    }
  }
  return <Wrapper>
    <div className="main-title">
      {data.title && <span>《{data.title}》</span>}
    </div>
    <BaseSetting info={data} />
    <Participation info={data} />
    {/* <FileUploadReview info={data} />
    <TestInfo />
    <PrecticeSetting />
    <OperateSetting /> */}
    {otherContent()}
    <TestInfo />
  </Wrapper>
}
const Wrapper = styled.div``