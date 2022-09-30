import styled from 'styled-components'
import React,{useState,useEffect} from 'react'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { hjExamModal } from '../HjExamModal'
import DeptExamReport from './components/DeptExamReport'
import TitleExamReport from './components/TitleExamReport'
import HierarchyExamReport from './components/HierarchyExamReport'
import ScoresSectionExamReport from './components/ScoresSectionExamReport'
import QuestionsStatistics from './components/QuestionsStatistics'
import { appStore } from 'src/stores'
import { trainingResultService } from "./../../../api/TrainingResultService";
import {TableTitle} from './components/styleCss'

export interface Props { }
export default observer(function ExamExcel() {
// useEffect(()=>{
//     hjExamModal.analyCorrectRate()
// },[appStore.queryObj.id])
  // 南医三根据当前页面tab值显示页面
  const getPage = () => {
    if (['hj','gxjb','whyx'].includes(appStore.HOSPITAL_ID)) {
      // @ts-ignore
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
        {/*  hj增加考试错题  */}
            <Report>
                <TableTitle >答卷答题情况分析</TableTitle>
                <QuestionsStatistics
                    type='view'
                    data={hjExamModal.analyCorrectRateData?.questionList}
                />
            </Report>
        </React.Fragment>
      )
    } else if (appStore.HOSPITAL_ID == 'nys') {
      switch (hjExamModal.exportType) {
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
      <Spin spinning={hjExamModal.excelTableLoading} >
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

