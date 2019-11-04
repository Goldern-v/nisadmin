import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import OnePage from './page/OnePage'
import TwoPage from './page/TwoPage'
import PrintPage from './components/PrintPage'
import BaseInfo from './page/BaseInfo'
import LevelChange from './page/LevelChange'
import ContinuingEducation from './page/ContinuingEducation'
import Writings from './page/Writings'
import Awards from './page/Awards'
import BadEvent from './page/BadEvent'
import ExaminationResults from './page/ExaminationResults'
import ThreeBases from './page/ThreeBases'
import WorkRegistrationForm from './page/WorkRegistrationForm'
import { nurseFilesService } from '../../services/NurseFilesService'
export interface Props {
  empNo: string
}

export default function ExportNurseFile(props: Props) {
  const [baseInfo, setBaseInfo]: any = useState({})
  const getData = () => {
    Promise.all([nurseFilesService.nurseInformation(props.empNo).then((res) => setBaseInfo(res.data))])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper>
      <PrintPage>
        <OnePage baseInfo={baseInfo} />
      </PrintPage>
      <PrintPage pageIndex={2}>
        <TwoPage />
      </PrintPage>
      <PrintPage pageIndex={3}>
        <BaseInfo baseInfo={baseInfo} />
      </PrintPage>
      <PrintPage pageIndex={4}>
        <LevelChange />
      </PrintPage>
      <PrintPage pageIndex={5}>
        <ContinuingEducation />
      </PrintPage>
      <PrintPage pageIndex={6}>
        <Writings />
      </PrintPage>
      <PrintPage pageIndex={7}>
        <Awards />
      </PrintPage>
      <PrintPage pageIndex={8}>
        <BadEvent />
      </PrintPage>
      <PrintPage pageIndex={9}>
        <ExaminationResults />
      </PrintPage>
      <PrintPage pageIndex={9}>
        <ThreeBases />
      </PrintPage>
      <PrintPage pageIndex={10}>
        <WorkRegistrationForm />
      </PrintPage>
    </Wrapper>
  )
}
const Wrapper = styled.div``
