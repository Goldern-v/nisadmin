import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Modal, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { hjExamModal } from '../HjExamModal'
import DeptExamReport from './components/DeptExamReport'
import TitleExamReport from './components/TitleExamReport'
import HierarchyExamReport from './components/HierarchyExamReport'
import ScoresSectionExamReport from './components/ScoresSectionExamReport'
export interface Props { }

//查看考试结果
export default observer(function ExamExcel() {

  return (
    <Wrapper>
      <Spin spinning={hjExamModal.excelTableLoading}>
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
  box-shadow: 4px 4px 6px 4px rgba(0, 0, 0, 0.15);
  padding: 30px 20px;
  margin: 40px auto 20px;
  background: rgb(255, 255, 255);
  width: 820px;
  box-sizing: border-box;
`
const Report = styled.div`
  margin-bottom: 50px;
`

