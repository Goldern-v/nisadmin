import React from 'react'
import { appStore, authStore } from 'src/stores'

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}

export const navConfig = (appStore:any,authStore?:any)=>{

	let navList: navConfigItem[] = [
    {
      name: "首页",
      path: "/home",
    },
    // // {
    // //   name: "社区查房",
    // //   path: "/communityRoundsRouter",
    // // },
    {
      name: "审核管理",
      path: "/auditsManagement",
      hidden: !authStore.isRoleManage
    },
    {
      name: "病区日志",
      path: "/wardLog"
      // hidden: !appStore.isDev
    },
    {
      name: "排班管理",
      path: "/personnelManagement"
    },
    {
      name: "病区登记本",
      path: "/wardRegister"
      // hidden: !appStore.isDev
    },
    {
      name: "护理随访",
      path: "/nursingFollowUp",
      hidden: !['dglb'].includes(appStore.HOSPITAL_ID),
    },
    {
      name: "质量管理",
      children: [
        {
          name: "三级质量",
          path: "/qcThree",
          icon: require("../images/menu-icon/三级质控@2x.png")
        },
        {
          name: "二级质量",
          path: "/qcTwo",
          icon: require("../images/menu-icon/二级质控@2x.png")
        },
        {
          name: "一级质量",
          path: "/qcOneHj",
          icon: require("../images/menu-icon/一级质控@2x.png")
        },
        // {
        //   name: '病区登记本',
        //   path: '',
        //   icon: require('../images/menu-icon/病区登记本@2x.png')
        // },
        // {
        //   name: "查询统计",
        //   path: "/queryStatistics",
        //   icon: require("../images/menu-icon/护理查房@2x.png")
        // },
        // {
        //   name: "护理查房",
        //   path: "/checkWard",
        //   icon: require("../images/menu-icon/护理查房@2x.png")
        // }
      ]
    },
    {
      name: "护士长满意度调查表",
      path: "/nurseSatisfactionSurvey",
    },
    {
      name: "学习培训",
      path: "/continuingEdu"
    },
    // // {
    // //   name: "不良事件",
    // //   path: "/wardRegister",
    // //   hidden: !appStore.isDev
    // // },
    {
      name: "通知公告",
      path: "/notice"
    },
    {
      name: "护理制度",
      path: "/nursingRulesNew"
    },
    {
      name: "档案管理",
      path: "/nurseFile",
      hidden: !authStore.isRoleManage
    },
    {
      name: "我的档案",
      path: "/selfNurseFile"
    },
    // {
    //   name: "病区管理",
    //   path: "/wardManagement"
    // },
    {
      name: "统计查询",
      path: "/statistic",
      // hidden: () => !appStore.isDev
    },
    {
      name: "系统设置",
      path: "/setting",
    },
  ];
	
	return  navList
}