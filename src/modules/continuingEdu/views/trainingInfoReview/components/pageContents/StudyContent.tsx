import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseSetting from '../pageItems/BaseSetting'
import Participation from '../pageItems/Participation'
import FileUploadReview from '../pageItems/FileUploadReview'
import TestInfo from '../pageItems/TestInfo'
import PrecticeSetting from '../pageItems/PrecticeSetting'
import OperateSetting from '../pageItems/OperateSetting'
export interface Props { }

export default function StudyContent() {

  return <Wrapper>
    <div className="main-title">《中医自学》</div>
    <BaseSetting />
    <Participation />
    <FileUploadReview />
    <TestInfo />
    <PrecticeSetting />
    <OperateSetting />
  </Wrapper>
}
const Wrapper = styled.div``