import React from 'react'

export interface navConfigItem {
  name: string
  path?: string
  children?: navConfigItem[]
  hidden?: boolean
}

export const navConfig: navConfigItem[] = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: '审核管理',
    path: '/home'
  },
  {
    name: '病区事务管理',
    children: [
      {
        name: '床位一览表',
        path: ''
      },
      {
        name: '病区白板',
        path: ''
      },
      {
        name: 'MEWS预警',
        path: ''
      },
      {
        name: '交班志',
        path: ''
      },
      {
        name: '健康教育',
        path: ''
      },
      {
        name: '我的备忘',
        path: ''
      },
      {
        name: '出院病人管理',
        path: ''
      }
    ]
  },
  {
    name: '护理人员管理',
    children: [
      {
        name: '排班管理',
        path: ''
      },
      {
        name: '请假管理',
        path: ''
      },
      {
        name: '执业准入管理',
        path: ''
      },
      {
        name: '技术准入管理',
        path: ''
      },
      {
        name: '护理人员档案',
        path: ''
      }
    ]
  },
  {
    name: '护理质量安全管理',
    children: [
      {
        name: '护理质量持续改进',
        path: ''
      },
      {
        name: '专项护理质量管理',
        path: ''
      },
      {
        name: '不良事件管理',
        path: ''
      },
      {
        name: '护理质量教育训练',
        path: ''
      },
      {
        name: '健康教育分析报告',
        path: ''
      }
    ]
  },
  {
    name: '继续教育管理',
    children: [
      {
        name: '护士学习情况',
        path: ''
      },
      {
        name: '院内学习班',
        path: ''
      },
      {
        name: '教学计划',
        path: ''
      },
      {
        name: '练习管理',
        path: ''
      },
      {
        name: '考试管理',
        path: ''
      },
      {
        name: '视频学习',
        path: ''
      },
      {
        name: '题库管理',
        path: ''
      },
      {
        name: '培训管理',
        path: ''
      }
    ]
  },
  {
    name: '系统管理',
    children: [
      {
        name: '通知公告',
        path: ''
      },
      {
        name: '物流平台',
        path: ''
      },
      {
        name: '科室偏好设置',
        path: ''
      },
      {
        name: '护理诊断字典',
        path: ''
      },
      {
        name: '节假日设置',
        path: ''
      }
    ]
  }
]
