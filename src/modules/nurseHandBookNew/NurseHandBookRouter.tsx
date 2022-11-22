import LeftMenuPage from 'src/components/LeftMenuPage'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { appStore,authStore } from 'src/stores'

import NurseHandBook_jmfy from './page/NurseHandBook_jmfy'
import NurseHandBook_lcey from './page/NurseHandBook_lcey'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import HeadNurse from './bookGdrm/workInfo/HeadNurse'
import InfoManage from './bookGdrm/workInfo/InfoManage'
import PlanMonth from './bookGdrm/workPlan/planing/PlanMonth'
import ManageMonth from './bookGdrm/workPlan/planManage/ManageMonth'

export interface Props {}

export default function NurseHandBookRouter() {
  const leftMenuConfig:any = appStore.hisMatch({
    map: {
      jmfy: [
        {
          title: '护士长工作计划',
          path: '/nurseHandBookNew/jmPlan',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长工作总结',
          path: '/nurseHandBookNew/jmconclusion',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '月度人力、基础质量、专科质量指标分析',
          path: '/nurseHandBookNew/jmAnalyse',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        // {
        //   title: '月度质控分析与改进',
        //   path: '/nurseHandBookNew/jmQc',
        //   icon: <WCJD />,
        //   component: { ...NurseHandBook_jmfy },
        //   disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        // },
        {
          title: '护理人员季度考核成绩表',
          path: '/nurseHandBookNew/jmQuarterlyAudit',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理人员月度培训实施记录表',
          path: '/nurseHandBookNew/jmMonthTrain',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '科室护理人员月度动态出勤表',
          path: '/nurseHandBookNew/jmDeptDuty',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '论文、科研、创新登记表',
          path: '/nurseHandBookNew/jmRegisterForm1',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '教学、培训登记表',
          path: '/nurseHandBookNew/jmRegisterForm2',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
      ],
      'lcey,lyrm': [
        {
          title: '护士基本情况',
          path: '/nurseHandBookNew/lcBaseInfo',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士考勤记录',
          path: '/nurseHandBookNew/lcAttendance',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理工作计划',
          path: '/nurseHandBookNew/lcPlan',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理工作总结',
          path: '/nurseHandBookNew/lcConclusion',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '继续教育及科研',
          path: '/nurseHandBookNew/lcEducation',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '病区工作',
          path: '/nurseHandBookNew/lcWard',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
      ],
      'wjgdszd':[
        {
            title:'工作职责',
            children:[
              {
                title:'护士长工作职责',
                path:'/nurseHandBookNew/headnurse',
                component:HeadNurse,
                hide:!authStore.isRoleManage,
                disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
              },
              {
                title:'科护长工作职责',//护士长不可以看
                path:'/nurseHandBookNew/headnurseke',
                component:HeadNurse,
                hide:!authStore.isSupervisorNurse,
                disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
              },
              {
                title:'护理部工作职责',//只有护理部可以看
                path:'/nurseHandBookNew/headnursedept',
                component:HeadNurse,
                hide:!authStore.isDepartment,
                disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
              },
            ]
        },
        {
          title:'工作职责管理',
          path:'/nurseHandBookNew/workmanage',
          component:InfoManage
        },
        // 重要提示！如果工作计划的path有改动，'./page/bookGdrm/workPlan/planing/planData'里面的typeObject也要改变
        {
          title:'工作计划',
          children:[
            {
              title:'月度计划',
              path:'/nurseHandBookNew/planmonth',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'季度计划',
              path:'/nurseHandBookNew/planquarter',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'年度计划',
              path:'/nurseHandBookNew/planyear',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'月度计划管理',
              path:'/nurseHandBookNew/managemonth',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
            {
              title:'季度计划管理',
              path:'/nurseHandBookNew/managequarter',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
            {
              title:'年度计划管理',
              path:'/nurseHandBookNew/manageyear',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
          ]
        },
        {
          title:'工作总结',
          children:[
            {
              title:'月度总结',
              path:'/nurseHandBookNew/summonth',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'季度总结',
              path:'/nurseHandBookNew/sumquarter',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'年度总结',
              path:'/nurseHandBookNew/sumyear',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'月度工作总结管理',
              path:'/nurseHandBookNew/summanagemonth',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
            {
              title:'季度工作总结管理',
              path:'/nurseHandBookNew/summanagequarter',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
            {
              title:'年度工作总结管理',
              path:'/nurseHandBookNew/summanageyear',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
          ]
        },
        {
          title:'科内大事/好人/好事/建议',
          children:[
            {
              title:'科内大事/好人/好事/建议',
              path:'/nurseHandBookNew/betterquarter',
              component:PlanMonth,
              disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
            },
            {
              title:'科内大事/好人/好事/建议管理',
              path:'/nurseHandBookNew/bettermanagequarter',
              component:ManageMonth,
              hide:!authStore.isSupervisorNurse,
            },
          ]
        },
      ],
      default: []
    },
    vague: true,
  })
  
  
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
