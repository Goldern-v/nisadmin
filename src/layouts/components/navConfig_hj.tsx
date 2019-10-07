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
    name: '审核管理',
    path: '/auditsManagement'
  },
  {
    name: '病区事务管理',
    children: [
      {
        name: '床位一览表',
        path: '',
        icon: require('../images/menu-icon/床位一览表@2x.png')
      },
      {
        name: '病区白板',
        path: '',
        icon: require('../images/menu-icon/病区白板@2x.png')
      },
      {
        name: 'MEWS预警',
        path: '',
        icon: require('../images/menu-icon/MEWS预警@2x.png')
      },
      {
        name: '交班志',
        path: '',
        icon: require('../images/menu-icon/交班志@2x.png')
      },
      {
        name: '健康教育',
        path: '',
        icon: require('../images/menu-icon/健康教育@2x.png')
      },
      {
        name: '我的备忘',
        path: '',
        icon: require('../images/menu-icon/我的备忘@2x.png')
      },
      {
        name: '出院病人管理',
        path: '',
        icon: require('../images/menu-icon/出院病人管理@2x.png')
      }
    ]
  },
  {
    name: '护理人员管理',
    children: [
      {
        name: '排班管理',
        path: '/personnelManagement',
        icon: require('../images/menu-icon/排班管理@2x.png')
      },
      {
        name: '请假管理',
        path: '',
        icon: require('../images/menu-icon/请假管理@2x.png')
      },
      {
        name: '执业准入管理',
        path: '',
        icon: require('../images/menu-icon/执业准入管理@2x.png')
      },
      {
        name: '技术准入管理',
        path: '',
        icon: require('../images/menu-icon/技术转入管理@2x.png')
      },
      {
        name: '护理人员档案',
        path: '/nurseFile/onTheJob',
        icon: require('../images/menu-icon/护理人员档案@2x.png')
      }
    ]
  },
  {
    name: '护理质量安全管理',
    menuStyle: {
      width: 170
    },
    children: [
      {
        name: '护理质量持续改进',
        path: '/quality/qualityControlRecord',
        icon: require('../images/menu-icon/护理质量持续改进@2x.png')
      },
      {
        name: '专项护理质量管理',
        path: '',
        icon: require('../images/menu-icon/专项护理质量管理@2x.png')
      },
      {
        name: '不良事件管理',
        path: '',
        icon: require('../images/menu-icon/不良事件管理@2x.png')
      },
      {
        name: '护理质量教育训练',
        path: '',
        icon: require('../images/menu-icon/护理质量教育训练@2x.png')
      },
      {
        name: '健康教育分析报告',
        path: '',
        icon: require('../images/menu-icon/健康宣教分析报告@2x.png')
      }
    ]
  },
  {
    name: '继续教育管理',
    children: [
      {
        name: '护士学习情况',
        path: '',
        icon: require('../images/menu-icon/护理学习情况@2x.png')
      },
      {
        name: '院内学习班',
        path: '',
        icon: require('../images/menu-icon/院内学习班@2x.png')
      },
      {
        name: '教学计划',
        path: '',
        icon: require('../images/menu-icon/教学计划@2x.png')
      },
      {
        name: '练习管理',
        path: '',
        icon: require('../images/menu-icon/练习管理@2x.png')
      },
      {
        name: '考试管理',
        path: '',
        icon: require('../images/menu-icon/考试管理@2x.png')
      },
      {
        name: '视频学习',
        path: '',
        icon: require('../images/menu-icon/视频学习@2x.png')
      },
      {
        name: '题库管理',
        path: '',
        icon: require('../images/menu-icon/题库管理@2x.png')
      },
      {
        name: '培训管理',
        path: '',
        icon: require('../images/menu-icon/培训管理@2x.png')
      }
    ]
  },
  {
    name: '系统管理',
    children: [
      {
        name: '通知公告',
        path: '/notice',
        icon: require('../images/menu-icon/通知公告@2x.png')
      },
      {
        name: '物流平台',
        path: '',
        icon: require('../images/menu-icon/物流平台@2x.png')
      },
      {
        name: '科室偏好设置',
        path: '/setting/扁平管理设置',
        icon: require('../images/menu-icon/科室偏好设置@2x.png')
      },
      {
        name: '护理诊断字典',
        path: '',
        icon: require('../images/menu-icon/护理诊断字典@2x.png')
      },
      {
        name: '节假日设置',
        path: '/setting/节假日设置',
        icon: require('../images/menu-icon/节假日设置@2x.png')
      }
    ]
  }
]
