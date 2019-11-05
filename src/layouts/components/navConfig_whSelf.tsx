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
    name: '病区日志',
    path: '/wardLog',
    hidden: !appStore.isDev
  },
  {
    name: '我的档案',
    path: '/selfNurseFile'
  },
  {
    name: '一级质控',
    path: '/qcOne/nursingWorkPlainList',
    hidden: !appStore.isDev
  },
  // {
  //   name: '质量管理',
  //   children: [
  //     {
  //       name: '一级质控',
  //       path: '/qcOne/nursingWorkPlainList',
  //       icon: require('../images/menu-icon/一级质控@2x.png'),
  //       hidden: !appStore.isDev
  //     }
  //   ]
  // },
  {
    name: '通知公告',
    path: '/notice'
  },
  {
    name: '护理制度',
    path: '/nursingRulesNew'
  },
  {
    name: '病区管理',
    path: '/wardManagement'
  },
  {
    name: '排班管理',
    path: '/personnelManagement'
    // hidden: !appStore.isDev
  }
]
