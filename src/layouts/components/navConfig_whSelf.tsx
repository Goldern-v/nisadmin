import React from 'react'

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
    name: '我的档案',
    path: '/selfNurseFile'
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
    name: '病区管理',
    path: '/wardManagement'
  },
  {
    name: '排班管理',
    path: '/personnelManagement'
    // hidden: !appStore.isDev
  }
]
