import React from "react";

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
      hidden: !appStore.isDev
    },
    // {
    //   name: "社区查房",
    //   path: "/communityRoundsRouter",
    // },
    {
      name: "审核管理",
      path: "/auditsManagement",
      hidden: !authStore.isRoleManage
    },
    {
      name: "病区日志",
      path: "/wardLog"
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
      name: "一级质控",
      path: "/qcOne/nursingWorkPlainList"
    },
    {
      name: "二级质控",
      path: "/qcTwo",
      hidden: !authStore.isRoleManage || !authStore.isLjyy
    },
    {
      name: "三级质控",
      path: "/qcThree",
      hidden: !authStore.isRoleManage || !authStore.isLjyy
    },
    {
      name: "学习培训",
      path: "/continuingEdu"
    },
    {
        name: "敏感指标",
        path: "/indicator"
    },
    {
        name: "敏感指标登记本",
        path: "/sensitiveRegister",
        // hidden: !appStore.isDev
    },
    // {
    //   name: "不良事件",
    //   path: "/wardRegister",
    //   hidden: !appStore.isDev
    // },
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
    {
      name: "病区管理",
      path: "/wardManagement"
    },
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
