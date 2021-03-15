import styled from 'styled-components'
import React from 'react'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { hjExerciseModal } from '../HjExerciseModal'
import DeptExamReport from './components/DeptExamReport'
import TitleExamReport from './components/TitleExamReport'
import HierarchyExamReport from './components/HierarchyExamReport'
import ScoresSectionExamReport from './components/ScoresSectionExamReport'
import { appStore } from 'src/stores'
export interface Props {
}

export default observer(function ExamExcel() {

  // 南医三根据当前页面tab值显示页面
  const getPage = () => {
    if (appStore.HOSPITAL_ID == 'hj') {
      return (
        <React.Fragment>
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
        </React.Fragment>
      )
    } else if (appStore.HOSPITAL_ID == 'nys') {
      switch (hjExerciseModal.exportType) {
        case 'byDept':
          return (
            <Report>
              <DeptExamReport />
            </Report>
          )
        case 'byTitle':
          return (
            <Report>
              <TitleExamReport />
            </Report>
          )
        case 'byHierarchy':
          return (
            <Report>
              <HierarchyExamReport />
            </Report>
          )
        case 'byScoresSection':
          return (
            <Report>
              <ScoresSectionExamReport />
            </Report>
          )
        default:
          return (
            <React.Fragment>
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
            </React.Fragment>
          )
      }
    }
  }


  return (
    <Wrapper>
      <Spin spinning={hjExerciseModal.excelTableLoading} >
        {getPage()}
        {/* <Report>
          <DeptExamReport />
        </Report>
        <Report>
          <TitleExamReport />
        </Report>
        <Report>
          <HierarchyExamReport />
        </Report>
        <ScoresSectionExamReport /> */}
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

