import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import SpaceView from './common/SpaceView'
import { authStore, appStore } from 'src/stores/index'
//组件下
import PersonnelManagement from './components/PersonnelManagement'
// import CampusClass from './components/CampusClass'
import TeachingPlan from './components/TeachingPlan'
import PracticeManagement from './components/PracticeManagement'
import ExamManagement from './components/ExamManagement'
import LearnVideo from './components/LearnVideo'
import ExaminationManagement from './components/ExaminationManagement'
import TrainingManagement from './components/TrainingManagement'
import SetAdvance from './components/SetAdvance'
// 组件上
import LeftList from './components/LeftList'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'personnelManagement',
    component: PersonnelManagement,
    name: '人员管理'
  },
  // {
  //   type: 'campusClass',
  //   component: CampusClass,
  //   name: '院内学习班'
  // },
  {
    type: 'teachingPlan',
    component: TeachingPlan,
    name: '教学计划'
  },
  {
    type: 'practiceManagement',
    component: PracticeManagement,
    name: '练习管理'
  },
  {
    type: 'examManagement',
    component: ExamManagement,
    name: '考试管理'
  },
  {
    type: 'learnVideo',
    component: LearnVideo,
    name: '视频学习'
  },
  {
    type: 'examinationManagement',
    component: ExaminationManagement,
    name: '题库管理'
  },
  {
    type: 'trainingManagement',
    component: TrainingManagement,
    name: '培训管理'
  },
  {
    type: 'setAdvance',
    component: SetAdvance,
    name: '晋级设置'
  }
]
export default function trainingExamination(props: Props) {
  let {
    path,
    params: { type }
  } = appStore.match
  let currentRouteType = props.match.params.type
  let CurrentRoute = ROUTE_LIST.find((item: any) => item.type === currentRouteType)
  return (
    <Con>
      {/* <LeftListCon>
        <LeftList routeList={ROUTE_LIST} />
      </LeftListCon>
      <RightCon>{CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}</RightCon> */}
      <SpaceView />
      {/* <div>fff</div> */}
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`
const LeftListCon = styled.div`
  width: 158px;
  /* background-color: red; */
`
const RightCon = styled.div`
  flex: 1;
  width: 0;
  /* background-color: yellow; */
`
