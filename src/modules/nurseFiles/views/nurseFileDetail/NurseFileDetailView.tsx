import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import BaseInfo from './views/BaseInfo'
import WorkHistory from './views/WorkHistory'
import SpecialCard from './views/SpecialCard'
import EducationalExperience from './views/EducationalExperience'
import LevelChange from './views/LevelChange'
import ContinuingEducation from './views/ContinuingEducation'
import Writings from './views/Writings'
import Awards from './views/Awards'
import BadAction from './views/BadAction'
import ThreeBases from './views/ThreeBases'
import ExaminationResults from './views/ExaminationResults'
import WorkRegistrationForm from './views/WorkRegistrationForm'
import FileList from './views/FileList'
import { nurseFileDetailViewModal } from './NurseFileDetailViewModal'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'baseInfo',
    component: BaseInfo,
    name: '基本信息'
  },
  {
    type: 'workHistory',
    component: WorkHistory,
    name: '工作经历'
  },
  {
    type: 'specialCard',
    component: SpecialCard,
    name: '特殊资格证'
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '教育经历'
  },
  {
    type: 'levelChange',
    component: LevelChange,
    name: '职称及层级变动'
  },
  {
    type: 'continuingEducation',
    component: ContinuingEducation,
    name: '继续教育'
  },
  {
    type: 'writings',
    component: Writings,
    name: '著作译文论文'
  },
  {
    type: 'awards',
    component: Awards,
    name: '所获奖励'
  },
  // {
  //   type: 'badAction',
  //   component: BadAction,
  //   name: '不良行为'
  // },
  {
    type: 'examinationResults',
    component: ExaminationResults,
    name: '年度考核结果'
  },
  {
    type: 'threeBases',
    component: ThreeBases,
    name: '医院三基考核'
  },
  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    name: '工作情况登记表'
  },
  {
    type: 'fileList',
    component: FileList,
    name: '附件'
  }
]

export default function NurseFileDetail (props: Props) {
  nurseFileDetailViewModal.nurserInfo = appStore.queryObj
  // appStore.match.params.type
  let currentRouteType = props.match.params.type
  let CurrentRoute = ROUTE_LIST.find((item) => item.type === currentRouteType)

  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <LeftMenuCon>
          <LeftMenu routeList={ROUTE_LIST} />
        </LeftMenuCon>
        <DetailCon>{CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}</DetailCon>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const LeftMenuCon = styled.div`
  width: 160px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
`
const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 230px);
  align-items: stretch;
  display: flex;
`

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`
