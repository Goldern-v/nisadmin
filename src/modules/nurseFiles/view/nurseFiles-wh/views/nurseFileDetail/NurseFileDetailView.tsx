import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import { appStore, authStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { ScrollBox } from 'src/components/common'

import LeftMenu from './components/LeftMenu'
import TopCon from './components/TopCon'
import Article from './views/Article'
import BaseInfo from './views/BaseInfo'
import ContinuingEducation from './views/ContinuingEducation'
import continuingEducation_sdlj from './views/continuingEducation_sdlj'
import EducationalExperience from './views/EducationalExperience'
import HostingScientific from './views/HostingScientific'
import jobChange from './views/jobChange'
import JoinScientific from './views/JoinScientific'
import LearnJob from './views/LearnJob'
import MajorErrors from './views/MajorErrors'
import MakeAwards from './views/MakeAwards'
import Monograph from './views/Monograph'
import OnEducation from './views/OnEducation'
import OrganizationChange from './views/OrganizationChange'
import Patent from './views/Patent'
import PersonWinning from './views/PersonWinning'
import PositionChange from './views/PositionChange'
import RankChange from './views/RankChange'
import ScientificResearch from './views/ScientificResearch'
import SocialNurse from './views/SocialNurse'
import SpecialCard from './views/SpecialCard'
import SpecializNurse from './views/SpecializNurse'
import technologiesAndProjects_sdlj from './views/technologiesAndProjects_sdlj'
import ToNewPost from './views/ToNewPost'
import ToNewPost_sdlj from './views/ToNewPost_sdlj'
import WardInnovate from './views/WardInnovate'
import WorkHistory from './views/WorkHistory'
import WorkRegistrationForm from './views/WorkRegistrationForm'
import { nurseFileDetailViewModal } from './NurseFileDetailViewModal'
import { nurseFilesService } from '../../services/NurseFilesService'

// import Leave from './views/Leave'
// import PostChange from './views/PostChange'
// import qs from 'qs'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)
const ROUTE_LIST_DEFAULT = ['zhzxy'].includes(appStore.HOSPITAL_ID) ? [
  {
    type: 'baseInfo',
    component: BaseInfo,
    name: '基本信息'
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
  {
    type: 'specialCard',
    component: SpecialCard,
    name: '其他资格证书取得情况'
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '护理专业教育及工作经历'
  },
  {
    type: 'toNewPost',
    component: ToNewPost,
    name: '院内转科工作经历'
  },
  {
    /** 方明处理 */
    type: 'personWinning',
    component: PersonWinning,
    name: '个人获奖'
  },
  {
    /** 方明处理 */
    type: 'onEducation',
    component: OnEducation,
    name: '外出进修'
  },
  {
    /** 吴敏处理 */
    type: 'specializNurse',
    component: SpecializNurse,
    name: '专科护士'
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
    name: '科研课题获奖'
  },
  {
    type: 'patent',
    component: Patent,
    name: '专利'
  },
  {
    type: 'article',
    component: Article,
    name: '文章'
  },
  {
    type: 'monograph',
    component: Monograph,
    name: '专著'
  },
  {
    type: 'continuingEducation',
    component: ContinuingEducation,
    name: '举办继续教育培训班'
  },
  {
    type: 'learnJob',
    component: LearnJob,
    name: '学会任职'
  },
  {
    type: 'workHistory',
    component: WorkHistory,
    name: '工作经历'
  },
  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    name: '在院工作情况'
  },
] : [
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
  
  ...(['wh','zzwy'].includes(appStore.HOSPITAL_ID) ? [{
    /** 方明处理 */
    type: 'personWinning',
    component: PersonWinning,
    name: '个人获奖'
  }]: []),
  ...(['wh','zzwy', 'qhwy'].includes(appStore.HOSPITAL_ID) ? [
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
  },] : []),
  ...isSdlj ? [
    {
      type: 'continuingEducation_sdlj',
      component: continuingEducation_sdlj,
      name: '继续教育及三基考试'
    },
    {
      type: 'technologiesAndProjects',
      component: technologiesAndProjects_sdlj,
      name: '新技术、新项目情况'
    },
    {
      type: 'MajorErrors',
      component: MajorErrors,
      name: '重大差错事故及惩罚'
    },
  ] : [],
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
    name: '科研课题获奖'
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
  ...appStore.HOSPITAL_ID === 'dghm' || appStore.HOSPITAL_ID !== 'zzwy' ? [{
    type: 'socialJob',
    component: SocialNurse,
    name: '社会兼职'
  }] : [],
  {
    type: 'monograph',
    component: Monograph,
    name: '专著'
  },
  {
    type: 'continuingEducation',
    component: ContinuingEducation,
    name: '举办继续教育培训班'
  },

  {
    type: 'workHistory',
    component: WorkHistory,
    name: '工作经历'
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '医学学历教育'
  },
  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    name: '在院工作情况'
  },
  ...isSdlj ? [
    {
      type: 'toNewPost',
      component: ToNewPost_sdlj,
      name: '岗位变动'
    }
  ] : [
    {
      type: 'toNewPost',
      component: ToNewPost,
      name: '岗位变动'
    }
  ],
  {
    type: 'PositionChange',
    component: PositionChange,
    name: '职称变动'
  },
  ...isSdlj ? [{
    type: 'jobChange',
    component: jobChange,
    name: '职务变动'
  }] : [],
  {
    type: 'RankChange',
    component: RankChange,
    name: '层级变动'
  },
  ...!isSdlj ? [{
    type: 'OrganizationChange',
    component: OrganizationChange,
    name: '编制变动'
  }] : [],
  // {
  //   type: 'Leave',
  //   component: Leave,
  //   name: '离职'
  // }
  ...appStore.HOSPITAL_ID === 'wh' || appStore.HOSPITAL_ID === 'fsxt' || appStore.HOSPITAL_ID === '925' || appStore.HOSPITAL_ID === 'ytll' ? [{
    type: 'WardInnovate',
    component: WardInnovate,
    name: '科室创新'
  }] : [],
  ...appStore.HOSPITAL_ID === '925' ? [{
    type: 'MakeAwards',
    component: MakeAwards,
    name: '立功嘉奖'
  }] : [],
]

const ROUTE_LIST_925 = [
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
    name: '科研课题获奖'
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
    name: '举办继续教育培训班'
  },


  {
    type: 'workRegistrationForm',
    component: WorkRegistrationForm,
    name: '在院工作情况'
  },
    {
      type: 'toNewPost',
      component: ToNewPost,
      name: '岗位变动'
    },
 
  
  {
    type: 'RankChange',
    component: RankChange,
    name: '层级变动'
  },
 
  {
    type: 'WardInnovate',
    component: WardInnovate,
    name: '科室创新'
  },
  {
    type: 'MakeAwards',
    component: MakeAwards,
    name: '立功嘉奖'
  }
]

export default observer(function NurseFileDetail(props: Props, context: any) {
  let currentRouteType = props.match.params.type
  let ROUTE_LIST = ['925'].includes(appStore.HOSPITAL_ID)?ROUTE_LIST_925:ROUTE_LIST_DEFAULT
  let CurrentRoute = ROUTE_LIST.find((item) => item.type === currentRouteType)
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
