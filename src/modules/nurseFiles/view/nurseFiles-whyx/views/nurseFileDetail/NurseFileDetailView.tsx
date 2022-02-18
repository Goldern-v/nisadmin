import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import { nurseFileDetailViewModal } from './NurseFileDetailViewModal'
import { appStore, authStore } from 'src/stores'
import { Spin, Icon } from 'antd'
import { observer } from 'mobx-react-lite'
import Article from './views/Article'
import PersonWinning from './views/PersonWinning'
import SpecializNurse from './views/SpecializNurse'
import BaseInfo from './views/BaseInfo'
import statePersonnel from './views/statePersonnel'
import AcademicActivity from './views/academicActivity'
import InnaiQualification from './views/InnaiQualification'
import outQualification from './views/outQualification'

import OnEducation from './views/OnEducation'
import HostingScientific from './views/HostingScientific'
import JoinScientific from './views/JoinScientific'
import ToNewPost from './views/ToNewPost'
import WorkHistory from './views/WorkHistory'
import InnaiWorkHistory from './views/InnaiWorkHistory'
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
import WardInnovate from './views/WardInnovate'
import OrganizationChange from './views/OrganizationChange'
import { ScrollBox } from 'src/components/common'
import service from 'src/services/api'
import qs from 'qs'
import { nurseFilesService } from '../../services/NurseFilesService'

export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'baseInfo',
    component: BaseInfo,
    name: '基本信息'
  },
  // 新
  // {
  //   type: 'statePersonnel',
  //   component: statePersonnel,
  //   name: '人员状态'
  // },
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
  // 新
  {
    type: 'academicActivity',
    component: AcademicActivity,
    name: '学术活动'
  },
  {
    type: 'qualification',
    component: '',
    name: '资质管理',
    children: [
      {
        type: "innaiQualification",
        // path: "/continuingEdu/人员管理",
        parentType: 'qualification',
        component: InnaiQualification,
        name: '院内工作资质',
        showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
      },
      {
        type: "outQualification",
        // path: "/continuingEdu/其他人员",
        parentType: 'qualification',
        component: outQualification,
        name: '院外工作资质',
        showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
      }
    ]
  },
  {
    type: 'article',
    component: Article,
    name: '文章',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'monograph',
    component: Monograph,
    name: '专著',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    /** 方明处理 */
    type: 'hostingScientific',
    component: HostingScientific,
    name: '主持科研课题',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'joinScientific',
    component: JoinScientific,
    name: '参与科研课题',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    /** 方明处理 */
    type: 'scientificResearch',
    component: ScientificResearch,
    name: '科研课题获奖',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'patent',
    component: Patent,
    name: '专利',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'WardInnovate',
    component: WardInnovate,
    name: '科室创新',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'learnJob',
    component: LearnJob,
    name: '学会任职',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    /** 方明处理 */
    type: 'personWinning',
    component: PersonWinning,
    name: '个人获奖',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'continuingEducation',
    component: ContinuingEducation,
    name: '举办继续教育培训班',
    showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
  },
  {
    type: 'workHistory',
    component: '',
    name: '工作经历',
    children: [
      {
        type: 'outWorkHistory',
        component: WorkHistory,
        name: '院外工作经历',
        parentType: 'workHistory',
        showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
      },
      {
        type: 'innaiWorkHistory',
        component: InnaiWorkHistory,
        name: '院内工作经历',
        parentType: 'workHistory',
        showStar: ["whyx"].includes(appStore.HOSPITAL_ID)
      },
    ]
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '医学学历教育'
  },
  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    // name: '在院工作情况'
    name: '临床护理工作登记'
  },
  {
    type: 'toNewPost',
    component: ToNewPost,
    name: '岗位变动'
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

  // {
  //   type: 'Leave',
  //   component: Leave,
  //   name: '离职'
  // }
]



export default observer(function NurseFileDetail(props: Props, context: any) {
  // appStore.match.params.type
  let currentRouteType = props.match.params.type
  // let CurrentRoute = ROUTE_LIST.find((item) => item.type === currentRouteType)
  let CurrentRoute = getTargetObj(ROUTE_LIST, 'type', currentRouteType)

  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: any) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => targetName?.indexOf(item1[targetKey]) >= 0
        );
      } else {
        return targetName?.indexOf(item[targetKey]) >= 0;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => targetName?.indexOf(item1[targetKey]) >= 0
      );
    }
    return chooseRoute;
  }

  useEffect(() => {
    if (appStore.match.url.indexOf('selfNurseFile') > -1 && !appStore.queryObj.empNo) {
      service.commonApiService.findByEmpNo(authStore!.user!.empNo).then((res) => {
        appStore.history.replace(`${appStore.match.url}?empNo=${res.data.empNo}`)
      })
    }
    if (appStore.match.url.indexOf('selfNurseFile') > -1 && appStore.queryObj.empNo) {
      nurseFileDetailViewModal.nurserInfo = {}
      nurseFilesService.nurseInformationSelf(appStore.queryObj.empNo).then((res) => {
        nurseFileDetailViewModal.nurserInfo = res.data
      })
    } else if (appStore.queryObj.empNo) {
      nurseFileDetailViewModal.nurserInfo = {}
      nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
        nurseFileDetailViewModal.nurserInfo = res.data
      })
    }
  }, [appStore.queryObj.empNo])

  return (
    <Wrapper>
      {appStore.queryObj.empNo && (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

// @ts-ignore
const LeftMenuCon = styled(ScrollBox)`
  width: 160px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  overflow: auto;
`
const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 135px);
  align-items: stretch;
  display: flex;
`

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`
