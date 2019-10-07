import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { appStore } from 'src/stores'
import NurseFilesListView_hj from './view/nurseFiles-hj/views/nurseFilesList/NurseFilesListView'
import NurseFilesListView_wh from './view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
import RetiredRetirees from './view/retiredRetirees/RetiredRetireesView'
import StatisticsView from './view/statistics/StatisticsView'
import StatisticsViews from './view/statistics-hj/StatisticsView'
import { ReactComponent as ZZHSDA } from './images/护士档案.svg'
import { ReactComponent as TXHSCX } from './images/退休护士查询.svg'
import { ReactComponent as CXTJ } from './images/查询统计.svg'

// 引入自动推送设置页面
export interface Props extends RouteComponentProps {}

const OnTheJobComponent = appStore.HOSPITAL_ID == 'wh' ? NurseFilesListView_wh : NurseFilesListView_hj

const LEFT_MENU_CONFIG_HJ = [
  {
    title: '在职护士档案',
    path: '/nurseFile/onTheJob',
    component: OnTheJobComponent,
    icon: <ZZHSDA />
  },
  {
    title: '离职/退休人员查询',
    path: '/nurseFile/retiredRetirees',
    component: RetiredRetirees,
    icon: <TXHSCX />
  },
  // {
  //   title: '查询统计',
  //   icon: <CXTJ />,
  //   children: [
  //     {
  //       title: '工作经历',
  //       path: '/nurseFile/workExperience',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '特殊资格证',
  //       path: '/nurseFile/specialQualification',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '教育经历',
  //       path: '/nurseFile/medicalEducation',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '职称及层级变动',
  //       path: '/nurseFile/professionalAndLevelChange',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '继续教育',
  //       path: '/nurseFile/continuingEducation',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '著作译文论文',
  //       path: '/nurseFile/paperExperience',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '所获奖励',
  //       path: '/nurseFile/awardWinning',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '年度考核结果',
  //       path: '/nurseFile/yearCheck',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '医院三基考核',
  //       path: '/nurseFile/hospitalsThreeBase',
  //       component: StatisticsViews
  //     },
  //     {
  //       title: '工作情况登记',
  //       path: '/nurseFile/registrationWork',
  //       component: StatisticsViews
  //     }
  //   ]
  // }
]

const LEFT_MENU_CONFIG_WH = [
  {
    title: '在职护士档案',
    path: '/nurseFile/onTheJob',
    component: OnTheJobComponent,
    icon: <ZZHSDA />
  },
  {
    title: '离职/退休人员查询',
    path: '/nurseFile/retiredRetirees',
    component: RetiredRetirees,
    icon: <TXHSCX />
  },
  {
    title: '查询统计',
    icon: <CXTJ />,
    children: [
      {
        title: '文章',
        path: '/nurseFile/article',
        component: StatisticsView
      },
      {
        title: '个人获奖',
        path: '/nurseFile/personWinning',
        component: StatisticsView
      },
      {
        title: '专科护士',
        path: '/nurseFile/specializNurse',
        component: StatisticsView
      },
      {
        title: '外出进修',
        path: '/nurseFile/outStudy',
        component: StatisticsView
      },
      {
        title: '主持科研课题',
        path: '/nurseFile/hostScienceCourse',
        component: StatisticsView
      },
      {
        title: '参与科研课题',
        path: '/nurseFile/goScienceCourse',
        component: StatisticsView
      },
      {
        title: '科研课题获奖',
        path: '/nurseFile/scienceResult',
        component: StatisticsView
      },

      {
        title: '专利',
        path: '/nurseFile/patent',
        component: StatisticsView
      },
      {
        title: '学会任职',
        path: '/nurseFile/learnJob',
        component: StatisticsView
      },
      {
        title: '专著',
        path: '/nurseFile/monograph',
        component: StatisticsView
      },
      {
        title: '举办继续教育培训班',
        path: '/nurseFile/continueStudy',
        component: StatisticsView
      },
      {
        title: '工作经历',
        path: '/nurseFile/workExperience',
        component: StatisticsView
      },
      {
        title: '医学学历教育',
        path: '/nurseFile/medicalEducation',
        component: StatisticsView
      },
      {
        title: '岗位变动',
        path: '/nurseFile/transferPost',
        component: StatisticsView
      },
      {
        title: '职称变动',
        path: '/nurseFile/title',
        component: StatisticsView
      },
      {
        title: '层级变动',
        path: '/nurseFile/hierarchy',
        component: StatisticsView
      },
      {
        title: '编制变动',
        path: '/nurseFile/workConversion',
        component: StatisticsView
      }
    ]
  }
]

export default function NurseFilesView(props: Props) {
  let currentRoutePath = props.match.url || ''
  let currentRoute = getTargetObj(
    appStore.HOSPITAL_ID == 'wh' ? LEFT_MENU_CONFIG_WH : LEFT_MENU_CONFIG_HJ,
    'path',
    currentRoutePath
  )
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find((item1: any) => item1[targetKey] === targetName)
      } else {
        return item[targetKey] === targetName
      }
    })
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find((item1: any) => item1[targetKey] === targetName)
    }
    return chooseRoute
  }

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu
          config={appStore.HOSPITAL_ID == 'wh' ? LEFT_MENU_CONFIG_WH : LEFT_MENU_CONFIG_HJ}
          menuTitle='系统设置'
        />
      </LeftMenuCon>
      <MainCon>{currentRoute && currentRoute.component && <currentRoute.component />}</MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
`

const LeftMenuCon = styled.div`
  width: 200px;
`
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`

const TopCon = styled.div`
  height: 45px;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`

const TableCon = styled.div`
  flex: 1;
  margin: 15px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
