import styled from 'styled-components'
import React from 'react'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { hjExerciseModal } from '../HjExerciseModal'
import DeptExamReport from './components/DeptExamReport'
import TitleExamReport from './components/TitleExamReport'
import HierarchyExamReport from './components/HierarchyExamReport'
import ScoresSectionExamReport from './components/ScoresSectionExamReport'
export interface Props {
}

export default observer(function ExamExcel() {

  return (
    <Wrapper>
      <Spin spinning={hjExerciseModal.excelTableLoading} >
        <Report>
          <DeptExamReport />
        </Report>
        <Report>
          <TitleExamReport />
        </Report>
        <Report>
          <HierarchyExamReport />
        </Report>
        <ScoresSectionExamReport />
      </Spin>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: calc(100vh - 310px);
  overflow-y: scroll;
  padding: 30px 20px;
  margin: 40px auto 20px;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
`
const Report = styled.div`
  margin-bottom: 50px;
`

