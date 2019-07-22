import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import { nurseFileDetailViewModal } from './NurseFileDetailViewModal'
import { appStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Article from './views/Article'
import PersonWinning from './views/PersonWinning'
import SpecializNurse from './views/SpecializNurse'
import BaseInfo from './views/BaseInfo'
import OnEducation from './views/OnEducation'
import HostingScientific from './views/HostingScientific'
import JoinScientific from './views/JoinScientific'
import ToNewPost from './views/ToNewPost'
import WorkHistory from './views/WorkHistory'
import EducationalExperience from './views/EducationalExperience'
import WorkRegistrationForm from './views/WorkRegistrationForm'
import Patent from './views/Patent'
import LearnJob from './views/LearnJob'
import ScientificResearch from './views/ScientificResearch'
import Monograph from './views/Monograph'
import ContinuingEducation from './views/ContinuingEducation'
import Leave from './views/Leave'
import PositionChange from './views/PositionChange'
import RankChange from './views/RankChange'
// import PostChange from './views/PostChange'
import OrganizationChange from './views/OrganizationChange'
import { ScrollBox } from 'src/components/common'

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
    type: 'article',
    component: Article,
    name: '文章'
  },
  {
    /** 方明处理 */
    type: 'personWinning',
    component: PersonWinning,
    name: '个人获奖'
  },
  {
    /** 吴敏处理 */
    type: 'specializNurse',
    component: SpecializNurse,
    name: '专科护士'
  },
  {
    /** 方明处理 */
    type: 'onEducation',
    component: OnEducation,
    name: '外出进修'
  },
  {
    /** 方明处理 */
    type: 'hostingScientific',
    component: HostingScientific,
    name: '主持科研课题'
  },
  {
    type: 'joinScientific',
    component: JoinScientific,
    name: '参与科研课题'
  },
  {
    /** 方明处理 */
    type: 'scientificResearch',
    component: ScientificResearch,
    name: '科研课题成果'
  },
  {
    type: 'patent',
    component: Patent,
    name: '专利'
  },
  {
    type: 'learnJob',
    component: LearnJob,
    name: '学会任职'
  },
  {
    type: 'monograph',
    component: Monograph,
    name: '专著'
  },
  {
    type: 'continuingEducation',
    component: ContinuingEducation,
    name: '继续教育'
  },
  {
    type: 'Leave',
    component: Leave,
    name: '离职'
  },
  {
    type: 'toNewPost',
    component: ToNewPost,
    name: '转岗'
  },
  {
    type: 'workHistory',
    component: WorkHistory,
    name: '工作经历'
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '教育经历'
  },
  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    name: '在院工作情况'
  },
  {
    type: 'PositionChange',
    component: PositionChange,
    name: '职称变动'
  },
  {
    type: 'RankChange',
    component: RankChange,
    name: '层级变动'
  },
  // {
  //   type: 'PostChange',
  //   component: PostChange,
  //   name: '岗位变动'
  // },
  {
    type: 'OrganizationChange',
    component: OrganizationChange,
    name: '编制变动'
  },

]

export default observer(function NurseFileDetail(props: Props, context: any) {
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
        <DetailCon>
          <Spin spinning={nurseFileDetailViewModal.pageSpinning}>
            {CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}
          </Spin>
        </DetailCon>
      </MainCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const LeftMenuCon = styled(ScrollBox)`
  width: 160px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  overflow:auto;
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
