import React from 'react'
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
    {
      name: "审核管理",
      path: "/auditsManagement",
      hidden: !authStore.isRoleManage
    },
    {
      name: "病区日志",
      path: "/wardLog",
      // hidden: !appStore.isDev
    },
    {
      name: "档案管理",
      path: "/nurseFile",
      // hidden: !authStore.isRoleManage
    },
    // 不良事件功能暂时屏蔽
    // {
    //   name: "不良事件",
    //   path: "/badEventsNew",
    //   // hidden: !appStore.isDev,
    // },
    // {
    //   name: '不良事件',
    //   path: '/badEventsNewList',
    //   hidden: !appStore.isDev,
    // },
    // {
    //   name: '不良事件分析报告',
    //   path: '/badEvents/alanysis/1/1'
    // },
    {
      name: "质量管理",
      children: [
        {
          name: "三级质量",
          path: "/qcThree",
          icon: require("../images/menu-icon/三级质控@2x.png"),
        },
        {
          name: "二级质量",
          path: "/qcTwo",
          icon: require("../images/menu-icon/二级质控@2x.png"),
        },
        {
          name: "一级质量",
          path: "/qcOneHj",
          icon: require("../images/menu-icon/一级质控@2x.png"),
        },
        // {
        //   name: '病区登记本',
        //   path: '',
        //   icon: require('../images/menu-icon/病区登记本@2x.png')
        // },
        // {
        //   name: "查询统计",
        //   path: "/queryStatistics",
        //   icon: require("../images/menu-icon/护理查房@2x.png"),
        // },
        // {
        //   name: "护理查房",
        //   path: "/checkWard",
        //   icon: require("../images/menu-icon/护理查房@2x.png"),
        // },
      ],
    },
    {
      name: "护士长满意度调查表",
      path: "/nurseSatisfactionSurvey",
    },
    {
      name: "学习培训",
      path: "/continuingEdu",
      // hidden: !appStore.isDev
    },
    // {
    //   name: "敏感指标",
    //   path: "/indicator",
    // },
    {
      name: "病区登记本",
      path: "/wardRegister",
    },
    // {
    //   name: "敏感指标登记本",
    //   path: "/sensitiveRegister",
    //   // hidden: !appStore.isDev
    // },
    {
      name: "统计查询",
      path: "/statistic",
    },
    {
      name: "通知公告",
      path: "/notice",
    },
    {
      name: "护理制度",
      path: "/nursingRulesNew",
    },
    {
      name: "系统设置",
      path: "/setting",
    },
    {
      name: "护理排班",
      path: "/personnelManagement",
    },
  ];
	
	return  navList
}