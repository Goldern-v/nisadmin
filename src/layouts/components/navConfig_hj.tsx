import React from 'react'
import { appStore } from 'src/stores'

export interface navConfigItem {
  name: string
  path?: string
  children?: navConfigItem[]
  hidden?: boolean
  icon?: any
  menuStyle?: React.CSSProperties
}

export const navConfig: navConfigItem[] = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: '审核管理',
    path: '/auditsManagement'
  },
  {
    name: '病区日志',
    path: '/wardLog',
    hidden: !appStore.isDev
  },
  {
    name: '档案管理',
    path: '/nurseFile'
  },
  {
    name: '不良事件',
    path: '/badEventsNewList'
  },
  {
    name: '不良事件分析报告',
    path: '/badEvents/alanysis/1/1'
  },
  {
    name: '质量管理',
    children: [
      {
        name: '三级质量',
        path: '/qcThree',
        icon: require('../images/menu-icon/三级质控@2x.png')
      },
      {
        name: '二级质量',
        path: '/qcTwo',
        icon: require('../images/menu-icon/二级质控@2x.png')
      },
      // {
      //   name: '一级质量',
      //   path: '/qcOne',
      //   icon: require('../images/menu-icon/一级质控@2x.png')
      // },
      // {
      //   name: '病区登记本',
      //   path: '',
      //   icon: require('../images/menu-icon/病区登记本@2x.png')
      // },
      {
        name: '查询统计',
        path: '/queryStatistics',
        icon: require('../images/menu-icon/护理查房@2x.png')
      },
      {
        name: '护理查房',
        path: '/checkWard',
        icon: require('../images/menu-icon/护理查房@2x.png')
      }
    ]
  },
  {
    name: '敏感指标',
    path: '/indicator'
  },
  {
    name: '统计查询',
    path: '/statistic'
  },
  {
    name: '通知公告',
    path: '/notice'
  },
  {
    name: '护理制度',
    path: '/nursingRulesNew'
  },
  {
    name: '系统设置',
    path: '/setting'
  },
  {
    name: '护理人员管理',
    path: '/personnelManagement'
  }
]
